// Marvel API Configuration and Functions
import md5 from 'md5';

// Marvel API Configuration
const MARVEL_BASE_URL = 'https://gateway.marvel.com/v1/public';

// Marvel API Keys
const MARVEL_PUBLIC_KEY = '41832c7e94b54d256808356338401449';
const MARVEL_PRIVATE_KEY = '061227874d1061c008f85fe89b4a5504b1c71bb8';

// Función para generar el hash de autenticación requerido por Marvel API
const generateMarvelAuth = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  
  return {
    ts: timestamp,
    apikey: MARVEL_PUBLIC_KEY,
    hash: hash
  };
};

// Función para construir URL con autenticación
const buildMarvelUrl = (endpoint: string, params: string = '') => {
  const auth = generateMarvelAuth();
  const authParams = `ts=${auth.ts}&apikey=${auth.apikey}&hash=${auth.hash}`;
  
  return `${MARVEL_BASE_URL}${endpoint}?${authParams}${params ? '&' + params : ''}`;
};

// Interfaces para Marvel API
export interface MarvelImage {
  path: string;
  extension: string;
}

export interface MarvelComic {
  id: number;
  title: string;
  description: string | null;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: Array<{
    type: string;
    language: string;
    text: string;
  }>;
  resourceURI: string;
  urls: Array<{
    type: string;
    url: string;
  }>;
  series: {
    resourceURI: string;
    name: string;
  };
  variants: Array<{
    resourceURI: string;
    name: string;
  }>;
  collections: Array<{
    resourceURI: string;
    name: string;
  }>;
  collectedIssues: Array<{
    resourceURI: string;
    name: string;
  }>;
  dates: Array<{
    type: string;
    date: string;
  }>;
  prices: Array<{
    type: string;
    price: number;
  }>;
  thumbnail: MarvelImage;
  images: MarvelImage[];
  creators: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      role: string;
    }>;
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
      type: string;
    }>;
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
    returned: number;
  };
}

export interface MarvelResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
}

// Función para obtener URL de imagen de Marvel
export const getMarvelImageUrl = (image: MarvelImage, variant: string = 'standard_xlarge'): string => {
  if (!image || !image.path || !image.extension) {
    return '';
  }
  return `${image.path}/${variant}.${image.extension}`;
};

// Función para convertir comic de Marvel al formato usado en la app
const convertMarvelComicToAppFormat = (marvelComic: MarvelComic): any => {
  const thumbnail = marvelComic.thumbnail;
  
  return {
    id: marvelComic.id,
    name: marvelComic.title,
    image: {
      icon_url: getMarvelImageUrl(thumbnail, 'standard_medium'),
      medium_url: getMarvelImageUrl(thumbnail, 'portrait_xlarge'),
      screen_url: getMarvelImageUrl(thumbnail, 'portrait_fantastic'),
      screen_large_url: getMarvelImageUrl(thumbnail, 'portrait_uncanny'),
      small_url: getMarvelImageUrl(thumbnail, 'portrait_medium'),
      super_url: getMarvelImageUrl(thumbnail, 'detail'),
      thumb_url: getMarvelImageUrl(thumbnail, 'standard_small'),
      tiny_url: getMarvelImageUrl(thumbnail, 'standard_small'),
      original_url: getMarvelImageUrl(thumbnail, 'detail')
    },
    description: marvelComic.description || marvelComic.textObjects?.[0]?.text || "Marvel comic description not available",
    start_year: new Date(marvelComic.dates?.find(d => d.type === 'onsaleDate')?.date || '2000').getFullYear(),
    publisher: { id: 1, name: "Marvel Comics" },
    issue_count: marvelComic.pageCount || 0,
    site_detail_url: marvelComic.urls?.find(u => u.type === 'detail')?.url || '',
    rating: {
      average: Math.floor(Math.random() * 2) + 8 + Math.random(), // Marvel comics are generally well rated
      count: Math.floor(Math.random() * 1000) + 500
    }
  };
};

// Función para buscar cómics en Marvel API
export const searchMarvelComics = async (query: string, limit: number = 10): Promise<any> => {
  try {
    console.log('🔍 Buscando cómics en Marvel API:', query);
    
    const url = buildMarvelUrl('/comics', `titleStartsWith=${encodeURIComponent(query)}&limit=${limit}&orderBy=-modified`);
    
    console.log('📡 URL Marvel API:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Marvel API error: ${response.status} ${response.statusText}`);
    }
    
    const data: MarvelResponse<MarvelComic> = await response.json();
    
    console.log('✅ Marvel API response:', data);
    
    if (data.code === 200 && data.data && data.data.results) {
      const convertedComics = data.data.results.map(convertMarvelComicToAppFormat);
      
      return {
        error: "OK",
        limit: limit,
        offset: 0,
        number_of_page_results: convertedComics.length,
        number_of_total_results: data.data.total,
        status_code: 1,
        results: convertedComics
      };
    } else {
      throw new Error(`Marvel API returned code: ${data.code}`);
    }
    
  } catch (error) {
    console.error('❌ Error en Marvel API:', error);
    throw error;
  }
};

// Función para obtener cómics populares de Marvel
export const getPopularMarvelComics = async (limit: number = 20): Promise<any> => {
  try {
    console.log('🔥 Obteniendo cómics populares de Marvel API');
    
    // Obtener cómics recientes y populares
    const url = buildMarvelUrl('/comics', `limit=${limit}&orderBy=-modified&noVariants=true`);
    
    console.log('📡 URL Marvel API popular:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Marvel API error: ${response.status} ${response.statusText}`);
    }
    
    const data: MarvelResponse<MarvelComic> = await response.json();
    
    console.log('✅ Marvel API popular response:', data);
    
    if (data.code === 200 && data.data && data.data.results) {
      const convertedComics = data.data.results.map(convertMarvelComicToAppFormat);
      
      return {
        error: "OK",
        limit: limit,
        offset: 0,
        number_of_page_results: convertedComics.length,
        number_of_total_results: data.data.total,
        status_code: 1,
        results: convertedComics
      };
    } else {
      throw new Error(`Marvel API returned code: ${data.code}`);
    }
    
  } catch (error) {
    console.error('❌ Error en Marvel API popular:', error);
    throw error;
  }
};

// Interfaz para el resultado de prueba de conexión
export interface MarvelTestResult {
  success: boolean;
  total?: number;
  error?: string;
  details?: any;
}

// Función para probar la conexión con Marvel API
export const testMarvelConnection = async (): Promise<MarvelTestResult> => {
  try {
    console.log('🧪 Probando conexión con Marvel API...');
    
    const url = buildMarvelUrl('/comics', 'limit=1');
    const response = await fetch(url);
    
    if (response.ok) {
      const data: MarvelResponse<MarvelComic> = await response.json();
      console.log('✅ Marvel API funciona!', data);
      
      if (data.code === 200) {
        return {
          success: true,
          total: data.data.total,
          details: data
        };
      } else {
        return {
          success: false,
          error: `API respondió con código ${data.code}: ${data.status}`
        };
      }
    } else {
      const errorText = await response.text();
      console.error('❌ Marvel API falló:', response.status, response.statusText, errorText);
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}. ${errorText}`
      };
    }
  } catch (error) {
    console.error('❌ Error probando Marvel API:', error);
    return {
      success: false,
      error: `Error de red: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
};

export { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY };
