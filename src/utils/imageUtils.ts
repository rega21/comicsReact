// Utilidades para manejo de imágenes y fallbacks

export interface ImageFallbackConfig {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  text: string;
}

// Configuraciones de fallback para diferentes tipos de contenido
export const imageFallbacks = {
  comic: {
    small: { width: 300, height: 400, bgColor: '1c1c1c', textColor: 'ffd700', text: 'Comic' },
    medium: { width: 400, height: 600, bgColor: '1c1c1c', textColor: 'ffd700', text: 'Comic+Cover' },
    large: { width: 600, height: 800, bgColor: '1c1c1c', textColor: 'ffd700', text: 'Comic+Cover' },
    carousel: { width: 500, height: 750, bgColor: '1c1c1c', textColor: 'ffd700', text: 'Comic+Cover' }
  },
  character: {
    small: { width: 300, height: 400, bgColor: '663399', textColor: 'ffffff', text: 'Character' },
    medium: { width: 400, height: 600, bgColor: '663399', textColor: 'ffffff', text: 'Character' },
    large: { width: 600, height: 800, bgColor: '663399', textColor: 'ffffff', text: 'Character' }
  },
  movie: {
    small: { width: 300, height: 400, bgColor: '8b0000', textColor: 'ffffff', text: 'Movie' },
    medium: { width: 200, height: 300, bgColor: '8b0000', textColor: 'ffffff', text: 'Movie' },
    large: { width: 400, height: 600, bgColor: '8b0000', textColor: 'ffffff', text: 'Movie+Poster' }
  }
};

// Función para generar URL de placeholder usando SVG con símbolos temáticos
export const generateImageFallback = (config: ImageFallbackConfig): string => {
  const cleanText = config.text.replace(/[^a-zA-Z0-9\s🔱🦇🚀⚔️🕷️🤖🛡️⚡💚🕸️🏹💀🗡️🃏🔨🧠🦸]/g, '').replace(/\s+/g, ' ').trim();
  
  // Detectar si hay emoji en el texto para ajustar el tamaño
  const hasEmoji = /[\u{1F000}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/u.test(cleanText);
  const fontSize = hasEmoji ? "36" : "20";
  const textY = hasEmoji ? "60%" : "55%";
  
  // Crear SVG inline con gradiente de fondo para más atractivo
  const svg = `
    <svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${config.bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${adjustBrightness(config.bgColor, -20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="50%" cy="30%" r="40" fill="#${config.textColor}" opacity="0.1"/>
      <text x="50%" y="35%" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle" fill="#${config.textColor}">
        ${cleanText.split(' ')[0]}
      </text>
      <text x="50%" y="${textY}" font-family="Arial, sans-serif" font-size="14" font-weight="normal" 
            text-anchor="middle" dominant-baseline="middle" fill="#${config.textColor}" opacity="0.8">
        ${cleanText.split(' ').slice(1).join(' ')}
      </text>
    </svg>
  `;
  
  // Convertir SVG a Data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Función helper para ajustar brillo de colores hex
const adjustBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

// Funciones de conveniencia para diferentes tipos de contenido
export const getComicFallback = (size: 'small' | 'medium' | 'large' | 'carousel' = 'medium'): string => {
  return generateImageFallback(imageFallbacks.comic[size]);
};

export const getCharacterFallback = (size: 'small' | 'medium' | 'large' = 'medium'): string => {
  return generateImageFallback(imageFallbacks.character[size]);
};

export const getMovieFallback = (size: 'small' | 'medium' | 'large' = 'medium'): string => {
  return generateImageFallback(imageFallbacks.movie[size]);
};

// Funciones para manejar errores de imágenes
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
) => {
  const target = e.target as HTMLImageElement;
  target.src = fallbackUrl;
};

// Fallbacks específicos por tipo de serie de comic
export const getComicSeriesFallback = (seriesName: string, size: 'small' | 'medium' | 'large' = 'medium'): string => {
  const config = imageFallbacks.comic[size];
  
  // Colores específicos por serie con más variedad y mejor contraste
  const seriesColors: Record<string, { bg: string; text: string; shortName: string }> = {
    'spider-man': { bg: 'dc143c', text: '000000', shortName: 'ASM' },
    'amazing spider-man': { bg: 'dc143c', text: '000000', shortName: 'ASM' },
    'spectacular spider-man': { bg: 'ff4500', text: 'ffffff', shortName: 'SSM' },
    'batman': { bg: '1c1c1c', text: 'ffd700', shortName: 'BAT' },
    'detective comics': { bg: '2f2f2f', text: '00bfff', shortName: 'DC' },
    'x-men': { bg: '4169e1', text: 'ffffff', shortName: 'X-MEN' },
    'uncanny x-men': { bg: '1e90ff', text: 'ffffff', shortName: 'UXM' },
    'wonder woman': { bg: 'b22222', text: 'ffd700', shortName: 'WW' },
    'superman': { bg: '0047ab', text: 'dc143c', shortName: 'SUP' },
    'action comics': { bg: '4169e1', text: 'ff0000', shortName: 'AC' },
    'avengers': { bg: '228b22', text: 'ffffff', shortName: 'AVG' },
    'justice league': { bg: '663399', text: 'ffffff', shortName: 'JL' },
    'fantastic four': { bg: '1e90ff', text: 'ffffff', shortName: 'F4' },
    'iron man': { bg: 'ff8c00', text: '8b0000', shortName: 'IM' },
    'captain america': { bg: '4682b4', text: 'ffffff', shortName: 'CAP' },
    'thor': { bg: '8b4513', text: 'ffd700', shortName: 'THOR' },
    'hulk': { bg: '32cd32', text: '000000', shortName: 'HULK' },
    'daredevil': { bg: '8b0000', text: '000000', shortName: 'DD' },
    'punisher': { bg: '000000', text: 'ffffff', shortName: 'PUN' },
    'deadpool': { bg: '8b0000', text: '000000', shortName: 'DP' },
    'wolverine': { bg: 'ffd700', text: '000080', shortName: 'WLV' },
    'green lantern': { bg: '00ff00', text: '000000', shortName: 'GL' },
    'flash': { bg: 'ff0000', text: 'ffd700', shortName: 'FLASH' },
    'aquaman': { bg: '00ced1', text: 'ff8c00', shortName: 'AQM' },
    'teen titans': { bg: '8a2be2', text: 'ffffff', shortName: 'TT' },
    'guardians of the galaxy': { bg: '9932cc', text: 'ffffff', shortName: 'GG' }
  };

  const seriesKey = seriesName.toLowerCase();
  // Buscar coincidencias parciales si no hay coincidencia exacta
  let colors = seriesColors[seriesKey];
  
  if (!colors) {
    // Buscar coincidencias parciales
    for (const [key, value] of Object.entries(seriesColors)) {
      if (seriesKey.includes(key) || key.includes(seriesKey)) {
        colors = value;
        break;
      }
    }
  }
  
  // Fallback genérico si no se encuentra coincidencia
  if (!colors) {
    colors = { bg: config.bgColor, text: config.textColor, shortName: 'COMIC' };
  }
  
  const text = size === 'small' ? colors.shortName : seriesName;
  
  return generateImageFallback({
    width: config.width,
    height: config.height,
    bgColor: colors.bg,
    textColor: colors.text,
    text: text
  });
};

// Fallbacks específicos para personajes icónicos
export const getCharacterSpecificFallback = (characterName: string, size: 'small' | 'medium' | 'large' = 'medium'): string => {
  const config = imageFallbacks.character[size];
  
  // Colores específicos por personaje con paletas temáticas y símbolos
  const characterColors: Record<string, { bg: string; text: string; shortName: string }> = {
    'aquaman': { bg: '00ced1', text: 'ff8c00', shortName: '🔱 AQUAMAN' },
    'arthur curry': { bg: '00ced1', text: 'ff8c00', shortName: '🔱 AQUAMAN' },
    'batman': { bg: '1c1c1c', text: 'ffd700', shortName: '🦇 BATMAN' },
    'bruce wayne': { bg: '1c1c1c', text: 'ffd700', shortName: '🦇 BATMAN' },
    'superman': { bg: '0047ab', text: 'dc143c', shortName: '🚀 SUPERMAN' },
    'clark kent': { bg: '0047ab', text: 'dc143c', shortName: '🚀 SUPERMAN' },
    'wonder woman': { bg: 'b22222', text: 'ffd700', shortName: '⚔️ WONDER WOMAN' },
    'diana prince': { bg: 'b22222', text: 'ffd700', shortName: '⚔️ WONDER WOMAN' },
    'spider-man': { bg: 'dc143c', text: '000000', shortName: '🕷️ SPIDER-MAN' },
    'peter parker': { bg: 'dc143c', text: '000000', shortName: '🕷️ SPIDER-MAN' },
    'iron man': { bg: 'ff8c00', text: '8b0000', shortName: '🤖 IRON MAN' },
    'tony stark': { bg: 'ff8c00', text: '8b0000', shortName: '🤖 IRON MAN' },
    'captain america': { bg: '4682b4', text: 'ffffff', shortName: '🛡️ CAPTAIN AMERICA' },
    'steve rogers': { bg: '4682b4', text: 'ffffff', shortName: '🛡️ CAP AMERICA' },
    'thor': { bg: '8b4513', text: 'ffd700', shortName: '⚡ THOR' },
    'hulk': { bg: '32cd32', text: '000000', shortName: '💚 HULK' },
    'bruce banner': { bg: '32cd32', text: '000000', shortName: '💚 HULK' },
    'black widow': { bg: '000000', text: 'ff0000', shortName: '🕸️ BLACK WIDOW' },
    'natasha romanoff': { bg: '000000', text: 'ff0000', shortName: '🕸️ WIDOW' },
    'hawkeye': { bg: '4b0082', text: 'ffd700', shortName: '🏹 HAWKEYE' },
    'clint barton': { bg: '4b0082', text: 'ffd700', shortName: '🏹 HAWKEYE' },
    'flash': { bg: 'ff0000', text: 'ffd700', shortName: '⚡ FLASH' },
    'barry allen': { bg: 'ff0000', text: 'ffd700', shortName: '⚡ FLASH' },
    'green lantern': { bg: '00ff00', text: '000000', shortName: '💚 GREEN LANTERN' },
    'hal jordan': { bg: '00ff00', text: '000000', shortName: '💚 LANTERN' },
    'cyborg': { bg: '708090', text: '00bfff', shortName: '🤖 CYBORG' },
    'victor stone': { bg: '708090', text: '00bfff', shortName: '🤖 CYBORG' },
    'deadpool': { bg: '8b0000', text: 'ffffff', shortName: '💀 DEADPOOL' },
    'wade wilson': { bg: '8b0000', text: 'ffffff', shortName: '💀 DEADPOOL' },
    'wolverine': { bg: 'ffd700', text: '000080', shortName: '🗡️ WOLVERINE' },
    'logan': { bg: 'ffd700', text: '000080', shortName: '🗡️ WOLVERINE' },
    'joker': { bg: '32cd32', text: '8b008b', shortName: '🃏 JOKER' },
    'harley quinn': { bg: 'ff1493', text: '00bfff', shortName: '🔨 HARLEY QUINN' },
    'lex luthor': { bg: '4b0082', text: '32cd32', shortName: '🧠 LEX LUTHOR' }
  };

  const characterKey = characterName.toLowerCase();
  // Buscar coincidencias parciales si no hay coincidencia exacta
  let colors = characterColors[characterKey];
  
  if (!colors) {
    // Buscar coincidencias parciales
    for (const [key, value] of Object.entries(characterColors)) {
      if (characterKey.includes(key) || key.includes(characterKey)) {
        colors = value;
        break;
      }
    }
  }
  
  // Fallback genérico si no se encuentra coincidencia
  if (!colors) {
    colors = { bg: config.bgColor, text: config.textColor, shortName: '🦸HERO' };
  }
  
  const text = size === 'small' ? colors.shortName : characterName;
  
  return generateImageFallback({
    width: config.width,
    height: config.height,
    bgColor: colors.bg,
    textColor: colors.text,
    text: text
  });
};

// Función mejorada para fallback de personajes que detecta automáticamente
export const getSmartCharacterFallback = (character: { name: string; real_name?: string }, size: 'small' | 'medium' | 'large' = 'medium'): string => {
  // Intentar con el nombre del personaje primero
  let fallback = getCharacterSpecificFallback(character.name, size);
  
  // Si no hay coincidencia específica y hay nombre real, intentar con ese
  if (character.real_name && fallback.includes('HERO')) {
    const realNameFallback = getCharacterSpecificFallback(character.real_name, size);
    if (!realNameFallback.includes('HERO')) {
      fallback = realNameFallback;
    }
  }
  
  return fallback;
};
