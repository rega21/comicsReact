// Utilidades para manejo de imágenes y fallbacks
import { getImageWithFallback, generateIdentifier, LOCAL_IMAGES } from './localImages';

// Mapeo de personajes con películas de TMDB para obtener imágenes reales
export interface CharacterMovieMapping {
  tmdbId: number;
  backdropPath?: string;
  posterPath?: string;
  actor: string;
  movieTitle: string;
  releaseYear: number;
}

export const characterMovieMap: Record<string, CharacterMovieMapping> = {
  'Iron Man': {
    tmdbId: 1726,
    backdropPath: '/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    posterPath: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    actor: 'Robert Downey Jr.',
    movieTitle: 'Iron Man',
    releaseYear: 2008
  },
  'Tony Stark': {
    tmdbId: 1726,
    backdropPath: '/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    posterPath: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    actor: 'Robert Downey Jr.',
    movieTitle: 'Iron Man',
    releaseYear: 2008
  },
  'Spider-Man': {
    tmdbId: 315635,
    backdropPath: '/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
    posterPath: '/rweIrveL43TaxUN0akQEaAXL6x0.jpg',
    actor: 'Tom Holland',
    movieTitle: 'Spider-Man: Homecoming',
    releaseYear: 2017
  },
  'Peter Parker': {
    tmdbId: 315635,
    backdropPath: '/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
    posterPath: '/rweIrveL43TaxUN0akQEaAXL6x0.jpg',
    actor: 'Tom Holland',
    movieTitle: 'Spider-Man: Homecoming',
    releaseYear: 2017
  },
  'Batman': {
    tmdbId: 414906,
    backdropPath: '/yjK4jK7d5iW2FqhA6hE5p8gUNb1.jpg',
    posterPath: '/jrBvx3Ag4GJe96FUhCQvpbOgHxY.jpg',
    actor: 'Robert Pattinson',
    movieTitle: 'The Batman',
    releaseYear: 2022
  },
  'Bruce Wayne': {
    tmdbId: 414906,
    backdropPath: '/yjK4jK7d5iW2FqhA6hE5p8gUNb1.jpg',
    posterPath: '/jrBvx3Ag4GJe96FUhCQvpbOgHxY.jpg',
    actor: 'Robert Pattinson',
    movieTitle: 'The Batman',
    releaseYear: 2022
  },
  'Superman': {
    tmdbId: 141052,
    backdropPath: '/7rIPjn5TUK04O25ZkMyHrGNPgLx.jpg',
    posterPath: '/5UsK3grJvtQrtzEgqNlDljJW96w.jpg',
    actor: 'Henry Cavill',
    movieTitle: 'Man of Steel',
    releaseYear: 2013
  },
  'Clark Kent': {
    tmdbId: 141052,
    backdropPath: '/7rIPjn5TUK04O25ZkMyHrGNPgLx.jpg',
    posterPath: '/5UsK3grJvtQrtzEgqNlDljJW96w.jpg',
    actor: 'Henry Cavill',
    movieTitle: 'Man of Steel',
    releaseYear: 2013
  },
  'Wonder Woman': {
    tmdbId: 297762,
    backdropPath: '/6iUNJZymJBMXXriQyFZfLAKnjO6.jpg',
    posterPath: '/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg',
    actor: 'Gal Gadot',
    movieTitle: 'Wonder Woman',
    releaseYear: 2017
  },
  'Diana Prince': {
    tmdbId: 297762,
    backdropPath: '/6iUNJZymJBMXXriQyFZfLAKnjO6.jpg',
    posterPath: '/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg',
    actor: 'Gal Gadot',
    movieTitle: 'Wonder Woman',
    releaseYear: 2017
  },
  'Captain America': {
    tmdbId: 1771,
    backdropPath: '/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg',
    posterPath: '/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',
    actor: 'Chris Evans',
    movieTitle: 'Captain America: The First Avenger',
    releaseYear: 2011
  },
  'Steve Rogers': {
    tmdbId: 1771,
    backdropPath: '/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg',
    posterPath: '/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',
    actor: 'Chris Evans',
    movieTitle: 'Captain America: The First Avenger',
    releaseYear: 2011
  },
  'Thor': {
    tmdbId: 10195,
    backdropPath: '/bIuOWTtyFPjsFDevqvF3QrD1aun.jpg',
    posterPath: '/bHuWkqffrljBsJT5SPMkm3KvgQx.jpg',
    actor: 'Chris Hemsworth',
    movieTitle: 'Thor',
    releaseYear: 2011
  },
  'Hulk': {
    tmdbId: 24428,
    backdropPath: '/lFSSLTlFozwpaGlO31OoUeirBgQ.jpg',
    posterPath: '/qnngKqAcqfH2pBxDoKu5lxzSbTo.jpg',
    actor: 'Mark Ruffalo',
    movieTitle: 'The Avengers',
    releaseYear: 2012
  },
  'Bruce Banner': {
    tmdbId: 24428,
    backdropPath: '/lFSSLTlFozwpaGlO31OoUeirBgQ.jpg',
    posterPath: '/qnngKqAcqfH2pBxDoKu5lxzSbTo.jpg',
    actor: 'Mark Ruffalo',
    movieTitle: 'The Avengers',
    releaseYear: 2012
  },
  'Black Widow': {
    tmdbId: 497698,
    backdropPath: '/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg',
    posterPath: '/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    actor: 'Scarlett Johansson',
    movieTitle: 'Black Widow',
    releaseYear: 2021
  },
  'Natasha Romanoff': {
    tmdbId: 497698,
    backdropPath: '/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg',
    posterPath: '/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    actor: 'Scarlett Johansson',
    movieTitle: 'Black Widow',
    releaseYear: 2021
  },
  'Aquaman': {
    tmdbId: 297802,
    backdropPath: '/7icgF1dgUJaCpnWV235eafXFznJ.jpg',
    posterPath: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg',
    actor: 'Jason Momoa',
    movieTitle: 'Aquaman',
    releaseYear: 2018
  },
  'Arthur Curry': {
    tmdbId: 297802,
    backdropPath: '/7icgF1dgUJaCpnWV235eafXFznJ.jpg',
    posterPath: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg',
    actor: 'Jason Momoa',
    movieTitle: 'Aquaman',
    releaseYear: 2018
  },
  'Green Lantern': {
    tmdbId: 44912,
    backdropPath: '/a6KEHSCBMtu9sTCdaJbLlPHYwq7.jpg',
    posterPath: '/fj21HwUprqjjwTdkqgRHhuwFnfb.jpg',
    actor: 'Ryan Reynolds',
    movieTitle: 'Green Lantern',
    releaseYear: 2011
  },
  'Hal Jordan': {
    tmdbId: 44912,
    backdropPath: '/a6KEHSCBMtu9sTCdaJbLlPHYwq7.jpg',
    posterPath: '/fj21HwUprqjjwTdkqgRHhuwFnfb.jpg',
    actor: 'Ryan Reynolds',
    movieTitle: 'Green Lantern',
    releaseYear: 2011
  },
  'Deadpool': {
    tmdbId: 293660,
    backdropPath: '/n1y094tVDFATSzkTnFxoGZ1qNsG.jpg',
    posterPath: '/yGSxMiF0cYuAiyuve5DA6bnWBIf.jpg',
    actor: 'Ryan Reynolds',
    movieTitle: 'Deadpool',
    releaseYear: 2016
  },
  'Wade Wilson': {
    tmdbId: 293660,
    backdropPath: '/n1y094tVDFATSzkTnFxoGZ1qNsG.jpg',
    posterPath: '/yGSxMiF0cYuAiyuve5DA6bnWBIf.jpg',
    actor: 'Ryan Reynolds',
    movieTitle: 'Deadpool',
    releaseYear: 2016
  },
  'Doctor Strange': {
    tmdbId: 284052,
    backdropPath: '/tFI8VLMgSTTU38i8TIsklfqS9Nl.jpg',
    posterPath: '/gwi5kL7HEWAOTffiA14e4SbOGra.jpg',
    actor: 'Benedict Cumberbatch',
    movieTitle: 'Doctor Strange',
    releaseYear: 2016
  },
  'Stephen Strange': {
    tmdbId: 284052,
    backdropPath: '/tFI8VLMgSTTU38i8TIsklfqS9Nl.jpg',
    posterPath: '/gwi5kL7HEWAOTffiA14e4SbOGra.jpg',
    actor: 'Benedict Cumberbatch',
    movieTitle: 'Doctor Strange',
    releaseYear: 2016
  },
  'Black Panther': {
    tmdbId: 284054,
    backdropPath: '/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg',
    posterPath: '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    actor: 'Chadwick Boseman',
    movieTitle: 'Black Panther',
    releaseYear: 2018
  },
  'T\'Challa': {
    tmdbId: 284054,
    backdropPath: '/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg',
    posterPath: '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    actor: 'Chadwick Boseman',
    movieTitle: 'Black Panther',
    releaseYear: 2018
  },
  'Captain Marvel': {
    tmdbId: 299537,
    backdropPath: '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg',
    posterPath: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
    actor: 'Brie Larson',
    movieTitle: 'Captain Marvel',
    releaseYear: 2019
  },
  'Carol Danvers': {
    tmdbId: 299537,
    backdropPath: '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg',
    posterPath: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
    actor: 'Brie Larson',
    movieTitle: 'Captain Marvel',
    releaseYear: 2019
  },
  'Ant-Man': {
    tmdbId: 102899,
    backdropPath: '/kvXLZqY0Ngl1XSw7EaMQO0C1CCj.jpg',
    posterPath: '/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg',
    actor: 'Paul Rudd',
    movieTitle: 'Ant-Man',
    releaseYear: 2015
  },
  'Scott Lang': {
    tmdbId: 102899,
    backdropPath: '/kvXLZqY0Ngl1XSw7EaMQO0C1CCj.jpg',
    posterPath: '/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg',
    actor: 'Paul Rudd',
    movieTitle: 'Ant-Man',
    releaseYear: 2015
  },
  // Variaciones adicionales de Green Lantern
  'Green Lantern (Hal Jordan)': {
    tmdbId: 44912,
    backdropPath: '/a6KEHSCBMtu9sTCdaJbLlPHYwq7.jpg',
    posterPath: '/fj21HwUprqjjwTdkqgRHhuwFnfb.jpg',
    actor: 'Ryan Reynolds',
    movieTitle: 'Green Lantern',
    releaseYear: 2011
  },
  'Linterna Verde': {
    tmdbId: 44912,
    backdropPath: '/a6KEHSCBMtu9sTCdaJbLlPHYwq7.jpg',
    posterPath: '/fj21HwUprqjjwTdkqgRHhuwFnfb.jpg',
    actor: 'Ryan Reynolds',
    movieTitle: 'Green Lantern',
    releaseYear: 2011
  }
};

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

// Función para generar URL de placeholder usando SVG con símbolos temáticos y estilo más realista
export const generateImageFallback = (config: ImageFallbackConfig): string => {
  const cleanText = config.text.replace(/[^a-zA-Z0-9\s🔱🦇🚀⚔️🕷️🤖🛡️⚡💚🕸️🏹💀🗡️🃏🔨🧠🦸]/g, '').replace(/\s+/g, ' ').trim();
  
  // Detectar si hay emoji en el texto para ajustar el tamaño
  const hasEmoji = /[\u{1F000}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/u.test(cleanText);
  const fontSize = hasEmoji ? "32" : "18";
  const textY = hasEmoji ? "65%" : "60%";
  
  // Crear SVG inline con gradiente de fondo más realista y efectos
  const svg = `
    <svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${config.bgColor};stop-opacity:1" />
          <stop offset="50%" style="stop-color:#${adjustBrightness(config.bgColor, 10)};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${adjustBrightness(config.bgColor, -30)};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
        <pattern id="texture" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#${config.bgColor}"/>
          <circle cx="2" cy="2" r="0.5" fill="#${config.textColor}" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#texture)" opacity="0.1"/>
      
      <!-- Círculo de fondo con efecto de sombra -->
      <circle cx="50%" cy="40%" r="60" fill="#${config.textColor}" opacity="0.08" filter="url(#shadow)"/>
      <circle cx="50%" cy="40%" r="40" fill="#${config.textColor}" opacity="0.12"/>
      
      <!-- Texto principal con sombra -->
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle" fill="#${config.textColor}" filter="url(#shadow)">
        ${cleanText.split(' ')[0]}
      </text>
      
      <!-- Texto secundario -->
      <text x="50%" y="${textY}" font-family="Arial, sans-serif" font-size="12" font-weight="normal" 
            text-anchor="middle" dominant-baseline="middle" fill="#${config.textColor}" opacity="0.9">
        ${cleanText.split(' ').slice(1).join(' ')}
      </text>
      
      <!-- Líneas decorativas -->
      <line x1="20%" y1="75%" x2="80%" y2="75%" stroke="#${config.textColor}" stroke-width="1" opacity="0.3"/>
      <line x1="25%" y1="80%" x2="75%" y2="80%" stroke="#${config.textColor}" stroke-width="1" opacity="0.2"/>
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

// Función para obtener imagen de TMDB para un personaje
export const getTMDBCharacterImage = (characterName: string, size: 'small' | 'medium' | 'large' = 'medium'): string | null => {
  // Búsqueda exacta primero
  let mapping = characterMovieMap[characterName];
  
  // Si no encuentra, buscar de forma más flexible
  if (!mapping) {
    const normalizedName = characterName.toLowerCase().trim();
    const mappingKey = Object.keys(characterMovieMap).find(key => 
      key.toLowerCase().trim() === normalizedName
    );
    if (mappingKey) {
      mapping = characterMovieMap[mappingKey];
    }
  }
  
  if (!mapping) return null;

  const sizeMap = {
    small: 'w300',
    medium: 'w500', 
    large: 'w780'
  };

  // Preferir backdrop para personajes, se ve más cinematográfico
  if (mapping.backdropPath) {
    return `https://image.tmdb.org/t/p/${sizeMap[size]}${mapping.backdropPath}`;
  }
  
  // Fallback al poster
  if (mapping.posterPath) {
    return `https://image.tmdb.org/t/p/${sizeMap[size]}${mapping.posterPath}`;
  }

  return null;
};

// Cache para almacenar URLs de imágenes que sabemos que están rotas
const brokenImageCache = new Set<string>();

// Función para verificar si una URL de imagen de TMDB está rota
export const verifyTMDBImage = async (url: string): Promise<boolean> => {
  // Si ya sabemos que está rota, no reintentar
  if (brokenImageCache.has(url)) {
    return false;
  }

  try {
    const response = await fetch(url, { 
      method: 'HEAD', // Solo obtener headers, no el contenido completo
      mode: 'cors'
    });
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      brokenImageCache.add(url);
      return false;
    }
    
    // Verificar el tipo de contenido
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      brokenImageCache.add(url);
      return false;
    }
    
    return true;
  } catch (error) {
    // Error de red o CORS
    brokenImageCache.add(url);
    return false;
  }
};

// Función para detectar respuestas "File Not Found" y otros errores comunes
export const detectImageError = (response: Response): boolean => {
  // Verificar códigos de estado de error
  if (!response.ok) {
    return true;
  }
  
  // Verificar si es un archivo de texto en lugar de imagen
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/')) {
    return true;
  }
  
  return false;
};

// Función para detectar "File Not Found" en el contenido de la respuesta
export const detectFileNotFound = async (response: Response): Promise<boolean> => {
  try {
    // Clonar la respuesta para poder leerla sin consumirla
    const clonedResponse = response.clone();
    const text = await clonedResponse.text();
    
    // Patrones comunes de "File Not Found"
    const fileNotFoundPatterns = [
      /file not found/i,
      /404 not found/i,
      /the requested resource was not found/i,
      /resource not found/i,
      /image not found/i,
      /not found/i
    ];
    
    // Verificar si algún patrón coincide
    return fileNotFoundPatterns.some(pattern => pattern.test(text));
  } catch (error) {
    // Si hay error al leer el texto, asumir que no es "File Not Found"
    return false;
  }
};

// Función para manejar errores de imágenes TMDB específicamente
export const handleTMDBImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  characterName: string,
  size: 'small' | 'medium' | 'large' = 'medium'
) => {
  const target = e.target as HTMLImageElement;
  const currentSrc = target.src;
  
  // Agregar la URL rota al cache
  if (currentSrc) {
    brokenImageCache.add(currentSrc);
  }
  
  // Cambiar a fallback SVG específico del personaje
  target.src = getCharacterSpecificFallback(characterName, size);
  
  // Evitar bucle infinito de errores
  target.onerror = null;
};

// Función segura para obtener imagen de TMDB con verificación
export const getTMDBCharacterImageSafe = async (
  characterName: string, 
  size: 'small' | 'medium' | 'large' = 'medium'
): Promise<string> => {
  const tmdbUrl = getTMDBCharacterImage(characterName, size);
  
  if (!tmdbUrl) {
    return getCharacterSpecificFallback(characterName, size);
  }
  
  // Verificar si la imagen está disponible
  const isValid = await verifyTMDBImage(tmdbUrl);
  
  if (isValid) {
    return tmdbUrl;
  } else {
    return getCharacterSpecificFallback(characterName, size);
  }
};

// Función para limpiar el cache de imágenes rotas (útil para testing)
export const clearBrokenImageCache = (): void => {
  brokenImageCache.clear();
};

// Función para obtener estadísticas del cache de imágenes rotas
export const getBrokenImageCacheStats = () => {
  return {
    size: brokenImageCache.size,
    urls: Array.from(brokenImageCache)
  };
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
  // PRIORIDAD 1: Intentar obtener imagen de TMDB con el nombre del personaje (versión síncrona)
  let tmdbImage = getTMDBCharacterImage(character.name, size);
  if (tmdbImage) return tmdbImage;
  
  // PRIORIDAD 2: Si hay nombre real, intentar con ese en TMDB (versión síncrona)
  if (character.real_name) {
    tmdbImage = getTMDBCharacterImage(character.real_name, size);
    if (tmdbImage) return tmdbImage;
  }
  
  // PRIORIDAD 3: Fallback SVG específico del personaje
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

// Función asíncrona mejorada para fallback de personajes con verificación de imágenes
export const getSmartCharacterFallbackAsync = async (character: { name: string; real_name?: string }, size: 'small' | 'medium' | 'large' = 'medium'): Promise<string> => {
  // PRIORIDAD 1: Intentar obtener imagen de TMDB con el nombre del personaje (versión segura)
  let tmdbImage = await getTMDBCharacterImageSafe(character.name, size);
  if (tmdbImage && !tmdbImage.includes('data:image/svg+xml')) {
    return tmdbImage;
  }
  
  // PRIORIDAD 2: Si hay nombre real, intentar con ese en TMDB (versión segura)
  if (character.real_name) {
    tmdbImage = await getTMDBCharacterImageSafe(character.real_name, size);
    if (tmdbImage && !tmdbImage.includes('data:image/svg+xml')) {
      return tmdbImage;
    }
  }
  
  // PRIORIDAD 3: Fallback SVG específico del personaje
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

// Función para verificar si una URL de imagen es válida y no está vacía
export const isValidImageUrl = (url: string | undefined | null): boolean => {
  if (!url) return false;
  
  const trimmedUrl = url.trim();
  if (trimmedUrl === '') return false;
  
  // Verificar si es una URL válida
  try {
    new URL(trimmedUrl);
  } catch {
    return false;
  }
  
  // Verificar que no sea un placeholder vacío común
  const invalidPatterns = [
    /^https?:\/\/via\.placeholder\.com\/\d+x\d+$/,
    /^https?:\/\/placehold\.it\/\d+x\d+$/,
    /^data:image\/svg\+xml;base64,$/,
    /placeholder/i,
    /no-image/i,
    /not-found/i
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(trimmedUrl));
};

// Función mejorada para obtener la mejor imagen disponible con verificación
export const getBestCharacterImage = (
  character: { name: string; real_name?: string; image?: { small_url?: string; medium_url?: string; large_url?: string } },
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  const imageUrlKey = `${size}_url` as keyof typeof character.image;
  const characterImageUrl = character.image?.[imageUrlKey];
  
  // Si tiene una imagen válida de la fuente original, usarla
  if (isValidImageUrl(characterImageUrl)) {
    return characterImageUrl!;
  }
  
  // Si no, usar el sistema inteligente de fallbacks
  return getSmartCharacterFallback(character, size);
};

// Función para obtener imágenes temáticas de Unsplash (gratuitas y legales)
export const getUnsplashThemeImage = (
  theme: string, 
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  const sizeMap = {
    small: { w: 300, h: 400 },
    medium: { w: 500, h: 700 },
    large: { w: 800, h: 1200 }
  };
  
  const { w, h } = sizeMap[size];
  
  // Mapeo de temas a búsquedas específicas de Unsplash
  const themeMap: Record<string, string> = {
    'superhero': 'superhero,comic,action',
    'comic': 'comic,book,illustration',
    'batman': 'dark,hero,night,city',
    'superman': 'hero,sky,blue,red',
    'spider-man': 'spider,red,hero,web',
    'iron-man': 'metal,technology,red,gold',
    'wonder-woman': 'warrior,strength,gold,red',
    'aquaman': 'ocean,water,blue,green',
    'flash': 'lightning,speed,yellow,red',
    'green-lantern': 'space,green,light,energy',
    'default': 'superhero,comic,hero'
  };
  
  const searchTerm = themeMap[theme.toLowerCase()] || themeMap['default'];
  
  // Usar Unsplash Source API (gratuita)
  return `https://source.unsplash.com/${w}x${h}/?${searchTerm}`;
};

// Función mejorada para obtener la mejor imagen disponible con Unsplash como respaldo
export const getEnhancedCharacterImage = (
  character: { name: string; real_name?: string }, 
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  // PRIORIDAD 1: Intentar obtener imagen de TMDB
  const tmdbImage = getTMDBCharacterImage(character.name, size);
  if (tmdbImage) return tmdbImage;
  
  // PRIORIDAD 2: Si hay nombre real, intentar con ese en TMDB
  if (character.real_name) {
    const tmdbImageReal = getTMDBCharacterImage(character.real_name, size);
    if (tmdbImageReal) return tmdbImageReal;
  }
  
  // PRIORIDAD 3: Imagen temática de Unsplash
  try {
    const unsplashImage = getUnsplashThemeImage(character.name, size);
    return unsplashImage;
  } catch (error) {
    // Si falla Unsplash, usar fallback SVG
    return getCharacterSpecificFallback(character.name, size);
  }
};

// Función para detectar imágenes sin respuesta o vacías
export const detectEmptyOrNoResponseImage = async (url: string): Promise<boolean> => {
  if (!url || url.trim() === '') {
    return true; // URL vacía
  }

  try {
    // Crear AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout

    const response = await fetch(url, { 
      method: 'HEAD', 
      mode: 'cors',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Verificar códigos de estado que indican imagen no disponible
    if (!response.ok) {
      return true; // Error HTTP (404, 500, etc.)
    }

    // Verificar el tipo de contenido
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return true; // No es una imagen
    }

    // Verificar el tamaño del contenido
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) === 0) {
      return true; // Imagen vacía (0 bytes)
    }

    // Verificar si es una imagen muy pequeña (probablemente un placeholder de 1px)
    if (contentLength && parseInt(contentLength) < 100) {
      return true; // Imagen muy pequeña, probablemente placeholder
    }

    return false; // Imagen válida
  } catch (error) {
    // Error de red, CORS, timeout, etc.
    return true;
  }
};

// Función para detectar imágenes vacías usando el elemento Image
export const detectEmptyImageFromElement = (imgElement: HTMLImageElement): boolean => {
  // Si no hay src, es vacía
  if (!imgElement.src || imgElement.src.trim() === '') {
    return true;
  }

  // Si las dimensiones naturales son 0, es vacía o no válida
  if (imgElement.naturalWidth === 0 || imgElement.naturalHeight === 0) {
    return true;
  }

  // Si es una imagen muy pequeña (1x1 pixel), probablemente es un placeholder
  if (imgElement.naturalWidth === 1 && imgElement.naturalHeight === 1) {
    return true;
  }

  // Verificar si es una imagen de error común
  const errorPatterns = [
    /data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP/, // 1x1 transparent GIF
    /data:image\/svg\+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8\+/, // 1x1 SVG
    /placeholder/i,
    /no-image/i,
    /not-found/i,
    /error/i
  ];

  return errorPatterns.some(pattern => pattern.test(imgElement.src));
};

// Función para verificar múltiples URLs de imagen y encontrar la primera válida
export const findFirstValidImageUrl = async (urls: string[]): Promise<string | null> => {
  for (const url of urls) {
    if (!url || url.trim() === '') continue;
    
    const isEmpty = await detectEmptyOrNoResponseImage(url);
    if (!isEmpty) {
      return url; // Primera imagen válida encontrada
    }
  }
  return null; // Ninguna imagen válida encontrada
};

// Función mejorada para manejar errores de imagen con detección avanzada
export const handleAdvancedImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  characterName: string,
  size: 'small' | 'medium' | 'large' = 'medium'
) => {
  const target = e.target as HTMLImageElement;
  const currentSrc = target.src;
  
  // Verificar si es una imagen vacía usando el elemento
  const isEmpty = detectEmptyImageFromElement(target);
  
  if (isEmpty || currentSrc) {
    // Agregar la URL al cache de imágenes rotas
    if (currentSrc) {
      brokenImageCache.add(currentSrc);
    }
    
    // Cambiar a fallback SVG específico del personaje
    target.src = getCharacterSpecificFallback(characterName, size);
    
    // Evitar bucle infinito de errores
    target.onerror = null;
    
    // Log para debugging (opcional)
    console.warn(`Imagen detectada como vacía o sin respuesta: ${currentSrc}`);
  }
};

// Función para verificar si una imagen es válida antes de usarla
export const isImageValid = async (url: string): Promise<boolean> => {
  if (!url || url.trim() === '') return false;
  
  // Verificar si ya sabemos que está rota
  if (brokenImageCache.has(url)) return false;
  
  try {
    const isEmpty = await detectEmptyOrNoResponseImage(url);
    
    if (isEmpty) {
      brokenImageCache.add(url);
      return false;
    }
    
    return true;
  } catch (error) {
    brokenImageCache.add(url);
    return false;
  }
};

// Función para limpiar y validar una URL de imagen
export const cleanAndValidateImageUrl = (url: string | undefined | null): string | null => {
  if (!url) return null;
  
  const cleanUrl = url.trim();
  if (cleanUrl === '') return null;
  
  // Verificar patrones de URLs inválidas conocidas
  const invalidPatterns = [
    /^https?:\/\/via\.placeholder\.com\/\d+x\d+$/,
    /^https?:\/\/placehold\.it\/\d+x\d+$/,
    /^data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP/, // 1x1 transparent GIF
    /placeholder/i,
    /no-image/i,
    /not-found/i,
    /error\.png$/i,
    /404\.jpg$/i
  ];
  
  if (invalidPatterns.some(pattern => pattern.test(cleanUrl))) {
    return null;
  }
  
  try {
    new URL(cleanUrl);
    return cleanUrl;
  } catch {
    return null;
  }
};

// Función para obtener imagen con validación completa
export const getValidatedCharacterImage = async (
  character: { name: string; real_name?: string; image?: { small_url?: string; medium_url?: string; large_url?: string } },
  size: 'small' | 'medium' | 'large' = 'medium'
): Promise<string> => {
  const imageUrlKey = `${size}_url` as keyof typeof character.image;
  const characterImageUrl = character.image?.[imageUrlKey];
  
  // Limpiar y validar la URL original
  const cleanedUrl = cleanAndValidateImageUrl(characterImageUrl);
  
  if (cleanedUrl) {
    // Verificar si la imagen es válida
    const isValid = await isImageValid(cleanedUrl);
    if (isValid) {
      return cleanedUrl;
    }
  }
  
  // Si no hay imagen válida, usar el sistema inteligente
  return getSmartCharacterFallback(character, size);
};

// Función para verificar imagen de forma síncrona usando el elemento Image
export const preloadAndVerifyImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url || url.trim() === '') {
      resolve(false);
      return;
    }
    
    const img = new Image();
    
    img.onload = () => {
      // Verificar si es una imagen válida
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        resolve(false);
        return;
      }
      
      // Verificar si es una imagen muy pequeña (placeholder)
      if (img.naturalWidth === 1 && img.naturalHeight === 1) {
        resolve(false);
        return;
      }
      
      resolve(true);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    // Timeout para evitar esperas indefinidas
    setTimeout(() => resolve(false), 3000);
    
    img.src = url;
  });
};

// Función para obtener la primera imagen válida de una lista
export const getFirstValidImage = async (urls: string[], fallback: string): Promise<string> => {
  for (const url of urls) {
    if (!url || url.trim() === '') continue;
    
    try {
      const isValid = await preloadAndVerifyImage(url);
      if (isValid) {
        return url;
      }
    } catch (error) {
      continue;
    }
  }
  
  return fallback;
};

// Función mejorada para obtener imagen de personaje con verificación proactiva
export const getVerifiedCharacterImage = async (
  character: { 
    name: string; 
    real_name?: string; 
    image?: { 
      small_url?: string; 
      medium_url?: string; 
      large_url?: string; 
      icon_url?: string;
      thumb_url?: string;
    } 
  },
  size: 'small' | 'medium' | 'large' = 'medium'
): Promise<string> => {
  const sizeMap = {
    small: ['small_url', 'thumb_url', 'icon_url'],
    medium: ['medium_url', 'small_url', 'large_url'],
    large: ['large_url', 'medium_url', 'small_url']
  };
  
  // Obtener URLs potenciales en orden de preferencia
  const potentialUrls: string[] = [];
  
  // Agregar URLs de la imagen del personaje
  if (character.image) {
    for (const urlKey of sizeMap[size]) {
      const url = character.image[urlKey as keyof typeof character.image];
      if (url) potentialUrls.push(url);
    }
  }
  
  // Agregar imagen de TMDB
  const tmdbUrl = getTMDBCharacterImage(character.name, size);
  if (tmdbUrl) potentialUrls.push(tmdbUrl);
  
  // Si hay nombre real, agregar imagen de TMDB para ese nombre
  if (character.real_name) {
    const tmdbRealUrl = getTMDBCharacterImage(character.real_name, size);
    if (tmdbRealUrl) potentialUrls.push(tmdbRealUrl);
  }
  
  // Obtener fallback
  const fallback = getSmartCharacterFallback(character, size);
  
  // Verificar y devolver la primera imagen válida
  return await getFirstValidImage(potentialUrls, fallback);
};

// Mapeo simple y directo de personajes a imágenes reales que sabemos que funcionan
export const simpleCharacterImages: Record<string, string> = {
  // Marvel Heroes
  'Thor': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Iron Man': 'https://images.unsplash.com/photo-1635819267219-a1abebd4e8fa?w=400&h=600&fit=crop',
  'Tony Stark': 'https://images.unsplash.com/photo-1635819267219-a1abebd4e8fa?w=400&h=600&fit=crop',
  'Spider-Man': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
  'Peter Parker': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
  'Captain America': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Steve Rogers': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Hulk': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Bruce Banner': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Black Widow': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop',
  'Natasha Romanoff': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop',
  'Hawkeye': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=600&fit=crop',
  'Clint Barton': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=600&fit=crop',
  'Doctor Strange': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Stephen Strange': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Black Panther': 'https://images.unsplash.com/photo-1605664515962-cc4d37605d25?w=400&h=600&fit=crop',
  'T\'Challa': 'https://images.unsplash.com/photo-1605664515962-cc4d37605d25?w=400&h=600&fit=crop',
  'Captain Marvel': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=600&fit=crop',
  'Carol Danvers': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=600&fit=crop',
  'Ant-Man': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Scott Lang': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Deadpool': 'https://images.unsplash.com/photo-1635819267219-a1abebd4e8fa?w=400&h=600&fit=crop',
  'Wade Wilson': 'https://images.unsplash.com/photo-1635819267219-a1abebd4e8fa?w=400&h=600&fit=crop',
  'Wolverine': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Logan': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',

  // DC Heroes
  'Batman': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Bruce Wayne': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Superman': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Clark Kent': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Wonder Woman': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop',
  'Diana Prince': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop',
  'Aquaman': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Arthur Curry': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Flash': 'https://images.unsplash.com/photo-1635819267219-a1abebd4e8fa?w=400&h=600&fit=crop',
  'Barry Allen': 'https://images.unsplash.com/photo-1635819267219-a1abebd4e8fa?w=400&h=600&fit=crop',
  'Green Lantern': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Hal Jordan': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Cyborg': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Victor Stone': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',

  // Villanos
  'Joker': 'https://images.unsplash.com/photo-1605664515962-cc4d37605d25?w=400&h=600&fit=crop',
  'Harley Quinn': 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop',
  'Lex Luthor': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
  'Thanos': 'https://images.unsplash.com/photo-1605664515962-cc4d37605d25?w=400&h=600&fit=crop',
  'Loki': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Green Goblin': 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=600&fit=crop',
  'Doctor Doom': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
  'Magneto': 'https://images.unsplash.com/photo-1605664515962-cc4d37605d25?w=400&h=600&fit=crop'
};

// Función simple para obtener imagen de personaje
export const getSimpleCharacterImage = (characterName: string): string => {
  // Buscar coincidencia exacta primero
  let image = simpleCharacterImages[characterName];
  if (image) return image;
  
  // Buscar coincidencia case-insensitive
  const normalizedName = characterName.toLowerCase().trim();
  const matchingKey = Object.keys(simpleCharacterImages).find(key => 
    key.toLowerCase().trim() === normalizedName
  );
  
  if (matchingKey) {
    return simpleCharacterImages[matchingKey];
  }
  
  // Buscar coincidencia parcial
  const partialMatch = Object.keys(simpleCharacterImages).find(key => 
    key.toLowerCase().includes(normalizedName) || 
    normalizedName.includes(key.toLowerCase())
  );
  
  if (partialMatch) {
    return simpleCharacterImages[partialMatch];
  }
  
  // Fallback por defecto - imagen genérica de superhéroe
  return 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop';
};

// Función súper simple para reemplazar el sistema complejo
export const getSuperSimpleCharacterImage = (character: { name: string; real_name?: string }): string => {
  // Intentar con el nombre del personaje
  let image = getSimpleCharacterImage(character.name);
  if (image !== 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop') {
    return image;
  }
  
  // Si no funciona y hay nombre real, intentar con ese
  if (character.real_name) {
    image = getSimpleCharacterImage(character.real_name);
    if (image !== 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop') {
      return image;
    }
  }
  
  // Fallback final
  return 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop';
};

// ===== SISTEMA DE IMÁGENES LOCALES =====

// Función principal para obtener imágenes de personajes con sistema local
export const getCharacterImageLocal = (character: { 
  name: string; 
  real_name?: string; 
  image?: { small_url?: string } 
}): string => {
  const identifier = generateIdentifier(character.name);
  return getImageWithFallback(
    'characters',
    identifier,
    character.image?.small_url,
    'https://via.placeholder.com/200x300/663399/ffffff?text=Character'
  );
};

// Función para obtener imágenes de películas con sistema local
export const getMovieImageLocal = (movie: { 
  title: string; 
  poster_path?: string 
}): string => {
  const identifier = generateIdentifier(movie.title);
  // Buscar imagen local primero
  const localImage = LOCAL_IMAGES.movies[identifier];
  if (localImage) {
    return `/images/movies/${localImage}`;
  }
  // Si no hay imagen local, usar TMDB
  const tmdbImage = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;
  // Fallback definitivo: SVG de servicio/no disponible
  return tmdbImage || '/images/no-image-service.svg';
};

// Función para obtener imágenes de locations con sistema local
export const getLocationImageLocal = (location: { 
  name: string; 
  image?: { small_url?: string } 
}): string => {
  const identifier = generateIdentifier(location.name);
  return getImageWithFallback(
    'locations',
    identifier,
    location.image?.small_url,
    'https://via.placeholder.com/400x300/663399/ffffff?text=Location'
  );
};

// Función para obtener imágenes de series con sistema local
export const getSeriesImageLocal = (series: {
  name: string;
  image?: { small_url?: string }
}): string => {
  const identifier = generateIdentifier(series.name);

  // 1. Imagen local de series
  const seriesImg = getLocalImage('series', identifier);
  if (seriesImg) return seriesImg;

  // 2. Imagen local de cómics (las series comparten nombre con sus cómics)
  const comicImg = getLocalImage('comics', identifier);
  if (comicImg) return comicImg;

  // 3. URL de la API
  if (series.image?.small_url) return series.image.small_url;

  return 'https://via.placeholder.com/300x450/663399/ffffff?text=Series';
};

// Función para obtener imágenes de cómics con sistema local
export const getComicImageLocal = (comic: { 
  name: string; 
  image?: { small_url?: string } 
}): string => {
  const identifier = generateIdentifier(comic.name);
  return getImageWithFallback(
    'comics',
    identifier,
    comic.image?.small_url,
    'https://via.placeholder.com/200x300/663399/ffffff?text=Comic'
  );
};
