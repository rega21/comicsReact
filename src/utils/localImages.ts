// Sistema de mapeo para imágenes locales
// Las imágenes deben estar en public/images/[categoria]/[archivo]

export interface LocalImageConfig {
  characters: Record<string, string>;
  movies: Record<string, string>;
  locations: Record<string, string>;
  series: Record<string, string>;
  comics: Record<string, string>;
}

// Mapeo de nombres/IDs a archivos de imagen locales
export const LOCAL_IMAGES: LocalImageConfig = {
  characters: {
    // Solo los archivos que realmente existen en public/images/characters/
    'batman': 'batman.jpg',
    'superman': 'superman.jpg',
    'wonder-woman': 'wonder-woman.jpg',
    'thor': 'thor.jpg',
    'flash': 'flash.jpg',
  },
  
  movies: {
    'the-dark-knight': 'dark-knight.jpg',
    'avengers-endgame': 'avengers-endgame.jpg',
    'spider-man-no-way-home': 'spider-man-no-way-home.jpg',
    'batman-begins': 'batman-begins.jpg',
    'iron-man': 'iron-man.jpg',
    'wonder-woman': 'wonder-woman.jpg',
    'aquaman': 'aquaman.jpg',
    'captain-america': 'captain-america.jpg',
    'thor': 'thor.jpg',
    'guardians-galaxy': 'guardians-galaxy.jpg',
    'black-panther': 'black-panther.jpg',
    'doctor-strange': 'doctor-strange.jpg',
  },
  
  locations: {
    'gotham-city': 'gotham-city.jpg',
    'metropolis': 'metropolis.jpg',
    'asgard': 'asgard.jpg',
    'wakanda': 'wakanda.jpg',
    'atlantis': 'atlantis.jpg',
    'xaviers-school': 'xaviers-school.jpg',
    'daily-planet': 'daily-planet.jpg',
    'wayne-manor': 'wayne-manor.jpg',
    'stark-tower': 'stark-tower.jpg',
    'central-city': 'central-city.jpg',
    'themyscira': 'themyscira.jpg',
    'baxter-building': 'baxter-building.jpg',
  },
  
  series: {
    'batman-series': 'batman-series.jpg',
    'superman-series': 'superman-series.jpg',
    'x-men-series': 'x-men-series.jpg',
    'avengers-series': 'avengers-series.jpg',
    'justice-league': 'justice-league.jpg',
    'fantastic-four': 'fantastic-four.jpg',
    'spider-man-series': 'spider-man-series.jpg',
    'wonder-woman-series': 'wonder-woman-series.jpg',
    'iron-man-series': 'iron-man-series.jpg',
    'thor-series': 'thor-series.jpg',
    'captain-america-series': 'captain-america-series.jpg',
    'guardians-galaxy-series': 'guardians-galaxy-series.jpg',
  },
  
  comics: {
    // Mapeo actualizado para todos los archivos presentes en public/images/comics
    'aquaman': 'aquaman1962.jpg',
    'batman': 'batman1940.jpg',
    'captain-america': 'captainAmerica1941.jpg',
    'daredevil': 'dareDevil1964.jpg',
    'deadpool': 'deadpool1997.jpg',
    'fantastic-four': 'fantasticFour1961.jpg',
    'green-lantern': 'greenLantern1959.jpg',
    'iron-man': 'ironMan1968.jpg',
    'justice-league': 'justiceLeague1960.jpg',
    'superman': 'superman1938.jpg',
    'teen-titans': 'teenTitans1964.jpg',
    'the-amazing-spider-man': 'theAmazingSpiderman1963.jpg',
    'the-avengers': 'theAvengers1963.jpg',
    'the-flash': 'theFlash1959.jpg',
    'the-hulk': 'theHulk1962.jpg',
    'thor': 'thor1966.jpg',
    'wolverine': 'wolverine1982.jpg',
    'wonder-woman': 'wonderWoman1940.jpg',
    'x-men': 'xMen1963.jpg',
    // Nuevos cómics agregados por el usuario
    'spawn': 'spawn1992.jpg',
    'hellboy': 'hellBoy1994.jpg',
    'watchmen': 'watchmen1986.jpg',
    'sandman': 'sandman1989.jpg',
    'scarlet-witch': 'scarletWitch2015.jpg',
  }
};

// Función para obtener imagen local
export const getLocalImage = (
  category: keyof LocalImageConfig, 
  identifier: string
): string | null => {
  const filename = LOCAL_IMAGES[category][identifier.toLowerCase()];
  return filename ? `/images/${category}/${filename}` : null;
};

// Función para obtener imagen con fallback
export const getImageWithFallback = (
  category: keyof LocalImageConfig,
  identifier: string,
  apiImageUrl?: string,
  placeholder?: string
): string => {
  // 1. Intentar imagen local primero
  const localImage = getLocalImage(category, identifier);
  if (localImage) {
    return localImage;
  }
  
  // 2. Usar imagen de API si está disponible
  if (apiImageUrl && apiImageUrl !== '') {
    return apiImageUrl;
  }
  
  // 3. Usar placeholder específico o genérico
  const defaultPlaceholders = {
    characters: 'https://via.placeholder.com/200x300/663399/ffffff?text=Character',
    movies: 'https://via.placeholder.com/300x450/663399/ffffff?text=Movie',
    locations: 'https://via.placeholder.com/400x300/663399/ffffff?text=Location',
    series: 'https://via.placeholder.com/300x450/663399/ffffff?text=Series',
    comics: 'https://via.placeholder.com/200x300/663399/ffffff?text=Comic'
  };
  
  return placeholder || defaultPlaceholders[category];
};

// Función helper para generar identificador desde nombre
export const generateIdentifier = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .trim();
};

// Función para verificar si existe una imagen local
export const hasLocalImage = (
  category: keyof LocalImageConfig, 
  identifier: string
): boolean => {
  return !!LOCAL_IMAGES[category][identifier.toLowerCase()];
};

// Función para listar todas las imágenes necesarias (para referencia)
export const getRequiredImages = (): {
  category: string;
  identifier: string;
  filename: string;
  path: string;
}[] => {
  const images: {
    category: string;
    identifier: string;
    filename: string;
    path: string;
  }[] = [];
  
  Object.entries(LOCAL_IMAGES).forEach(([category, mappings]) => {
    Object.entries(mappings).forEach(([identifier, filename]) => {
      images.push({
        category,
        identifier,
        filename: filename as string,
        path: `public/images/${category}/${filename}`
      });
    });
  });
  
  return images;
};
