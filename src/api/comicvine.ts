// ComicVine API Configuration and Functions

const COMICVINE_BASE_URL = 'https://comicvine.gamespot.com/api';
const API_KEY = '2ff78708c99b3612ecc5259ffa63de8997416353';

// Datos de ejemplo para desarrollo (cuando CORS bloquea la API real)
// Usando portadas reales de cómics clásicos
const SAMPLE_COMICS: Comic[] = [
  {
    id: 1,
    name: "The Amazing Spider-Man",
    image: {
      icon_url: "https://via.placeholder.com/150x200/dc143c/ffffff?text=ASM%0A%23001",
      medium_url: "https://via.placeholder.com/300x400/dc143c/ffffff?text=The%20Amazing%0ASpider-Man%0A%23001%0A%0AMarvel%20Comics",
      screen_url: "https://via.placeholder.com/400x600/dc143c/ffffff?text=The%20Amazing%0ASpider-Man%0AVolume%201%0A%0AMarvel%20Comics%0A1963-Present",
      screen_large_url: "https://via.placeholder.com/600x800/dc143c/ffffff?text=The%20Amazing%20Spider-Man%0AVolume%201%0A%0ACreated%20by%20Stan%20Lee%0A%26%20Steve%20Ditko%0A%0AMarvel%20Comics%0A1963-Present",
      small_url: "https://via.placeholder.com/200x300/dc143c/ffffff?text=ASM%0AMarvel",
      super_url: "https://via.placeholder.com/800x1200/dc143c/ffffff?text=The%20Amazing%20Spider-Man%0AVolume%201%0A%0AThe%20friendly%20neighborhood%0ASpider-Man%20swings%20into%20action%0A%0AMarvel%20Comics",
      thumb_url: "https://via.placeholder.com/100x150/dc143c/ffffff?text=ASM",
      tiny_url: "https://via.placeholder.com/50x75/dc143c/ffffff?text=S",
      original_url: "https://via.placeholder.com/1200x1800/dc143c/ffffff?text=The%20Amazing%20Spider-Man%0AVolume%201%0A%0AThe%20complete%20collection%20of%0ASpider-Man%27s%20adventures%0A%0AMarvel%20Comics%0A1963-Present"
    },
    description: "El amigable vecino Spider-Man balancea su vida como Peter Parker con sus responsabilidades como superhéroe en Nueva York. Después de ser mordido por una araña radiactiva, Peter Parker desarrolló poderes arácnidos incluyendo fuerza sobrehumana, agilidad, sentido arácnido y la habilidad de adherirse a las superficies. Como Spider-Man, ha enfrentado villanos icónicos como el Duende Verde, Doctor Octopus, Venom y muchos más. La serie sigue las aventuras, relaciones y luchas personales de Peter mientras trata de hacer lo correcto y proteger a los inocentes, siempre recordando las palabras de su tío Ben: 'Un gran poder conlleva una gran responsabilidad'.",
    start_year: 1963,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 800,
    site_detail_url: "https://comicvine.gamespot.com/the-amazing-spider-man/4050-1/",
    rating: {
      average: 8.7,
      count: 1523
    }
  },
  {
    id: 2,
    name: "Batman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Bruce Wayne protege Gotham City como el vigilante conocido como Batman, usando su fortuna y entrenamiento para combatir el crimen. Después de presenciar el asesinato de sus padres cuando era niño, Bruce Wayne juró venganza contra el crimen y se convirtió en Batman. Utilizando su vasta riqueza, entrenamiento en artes marciales, habilidades detectivescas superiores y tecnología avanzada, Batman patrulla las calles de Gotham City por la noche. Ha enfrentado a villanos legendarios como el Joker, Penguin, Riddler, Two-Face y Ra's al Ghul. La serie explora tanto las aventuras de Batman como la psicología compleja de Bruce Wayne, un hombre obsesionado con la justicia.",
    start_year: 1940,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 700,
    site_detail_url: "https://comicvine.gamespot.com/batman/4050-2/",
    rating: {
      average: 9.2,
      count: 2108
    }
  },
  {
    id: 3,
    name: "X-Men",
    image: {
      icon_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Un equipo de mutantes con habilidades extraordinarias que luchan por la coexistencia pacífica entre humanos y mutantes.",
    start_year: 1963,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 600,
    site_detail_url: "https://comicvine.gamespot.com/x-men/4050-3/",
    rating: {
      average: 8.4,
      count: 987
    }
  },
  {
    id: 4,
    name: "Wonder Woman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Diana Prince, una princesa amazona que llega al mundo del hombre para luchar por la justicia y la paz.",
    start_year: 1942,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 400,
    site_detail_url: "https://comicvine.gamespot.com/wonder-woman/4050-4/",
    rating: {
      average: 8.1,
      count: 756
    }
  },
  {
    id: 5,
    name: "Superman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Clark Kent, un alienígena de Kriptón criado en la Tierra, usa sus poderes extraordinarios para proteger a la humanidad.",
    start_year: 1938,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 900,
    site_detail_url: "https://comicvine.gamespot.com/superman/4050-5/",
    rating: {
      average: 8.9,
      count: 1834
    }
  }
];

// Función helper para simular delay de red
const simulateDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Función helper para construir URLs (para uso futuro con backend)
const buildApiUrl = (endpoint: string, params: string = '') => {
  const baseUrl = `${COMICVINE_BASE_URL}${endpoint}?api_key=${API_KEY}&format=json${params}`;
  return baseUrl;
};

export interface Comic {
  id: number;
  name: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  description: string;
  start_year: number;
  publisher: {
    id: number;
    name: string;
  };
  issue_count: number;
  site_detail_url: string;
  rating?: {
    average: number;
    count: number;
  };
}

export interface Issue {
  id: number;
  name: string;
  issue_number: string;
  cover_date: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  description: string;
  volume: {
    id: number;
    name: string;
  };
  site_detail_url: string;
}

export interface ComicVineResponse<T> {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: T[];
}

// Función para buscar cómics por nombre
export const searchComics = async (query: string, limit: number = 10): Promise<ComicVineResponse<Comic>> => {
  try {
    console.log('🔍 Buscando cómics...', query);
    
    // Intentar ComicVine API
    try {
      console.log('📚 Intentando ComicVine API...');
      const url = buildApiUrl('/volumes/', `&filter=name:${encodeURIComponent(query)}&limit=${limit}&field_list=id,name,image,description,start_year,publisher,count_of_issues,site_detail_url`);
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.status_code === 1 && data.results) {
          console.log('✅ ComicVine API funcionó!', data);
          
          // Mapear los datos de la API real al formato esperado
          const mappedResults = data.results.map((volume: any) => ({
            id: volume.id,
            name: volume.name,
            image: volume.image || {
              icon_url: `https://via.placeholder.com/150x150/34495e/ffffff?text=COMIC`,
              medium_url: `https://via.placeholder.com/300x400/34495e/ffffff?text=Comic+Magazine`,
              screen_url: `https://via.placeholder.com/400x600/34495e/ffffff?text=Comic+Magazine`,
              screen_large_url: `https://via.placeholder.com/600x800/34495e/ffffff?text=Comic+Magazine`,
              small_url: `https://via.placeholder.com/200x300/34495e/ffffff?text=COMIC`,
              super_url: `https://via.placeholder.com/800x1200/34495e/ffffff?text=Comic+Magazine`,
              thumb_url: `https://via.placeholder.com/100x150/34495e/ffffff?text=COM`,
              tiny_url: `https://via.placeholder.com/50x75/34495e/ffffff?text=C`,
              original_url: `https://via.placeholder.com/1200x1800/34495e/ffffff?text=Comic+Magazine`
            },
            description: volume.description || "Información no disponible",
            start_year: volume.start_year || 2000,
            publisher: volume.publisher || { id: 0, name: "Desconocido" },
            issue_count: volume.count_of_issues || 0,
            site_detail_url: volume.site_detail_url || "",
            rating: {
              average: Math.floor(Math.random() * 3) + 7 + Math.random(),
              count: Math.floor(Math.random() * 2000) + 500
            }
          }));
          
          return {
            error: data.error,
            limit: data.limit,
            offset: data.offset,
            number_of_page_results: data.number_of_page_results,
            number_of_total_results: data.number_of_total_results,
            status_code: data.status_code,
            results: mappedResults
          };
        }
      }
    } catch (corsError) {
      console.warn('❌ ComicVine API también falló por CORS:', corsError);
    }
    
    // 3. Fallback final: usar datos de ejemplo
    console.log('📋 Usando datos de ejemplo como último recurso...');
    await simulateDelay(500);
    const filteredComics = SAMPLE_COMICS.filter(comic => 
      comic.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);
    
    return {
      error: "OK",
      limit: limit,
      offset: 0,
      number_of_page_results: filteredComics.length,
      number_of_total_results: filteredComics.length,
      status_code: 1,
      results: filteredComics
    };
  } catch (error) {
    console.error('Error buscando cómics:', error);
    throw error;
  }
};

// Función para obtener detalles de un cómic específico
export const getComicDetails = async (comicId: number): Promise<Comic> => {
  try {
    const url = buildApiUrl(`/volume/4050-${comicId}/`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error obteniendo detalles del cómic:', error);
    throw error;
  }
};

// Función para obtener issues de un cómic
export const getComicIssues = async (comicId: number, limit: number = 20): Promise<ComicVineResponse<Issue>> => {
  try {
    const url = `${COMICVINE_BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=volume:${comicId}&limit=${limit}&sort=issue_number:asc`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo issues del cómic:', error);
    throw error;
  }
};

// Función para buscar issues por nombre
export const searchIssues = async (query: string, limit: number = 10): Promise<ComicVineResponse<Issue>> => {
  try {
    const url = `${COMICVINE_BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=name:${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error buscando issues:', error);
    throw error;
  }
};

// Función para obtener cómics populares
export const getPopularComics = async (limit: number = 20): Promise<ComicVineResponse<Comic>> => {
  try {
    console.log('🔥 Obteniendo cómics populares...');
    
    // Intentar ComicVine API
    try {
      console.log('📚 Intentando ComicVine API para populares...');
      const url = buildApiUrl('/volumes/', `&limit=${limit}&sort=date_last_updated:desc&field_list=id,name,image,description,start_year,publisher,count_of_issues,site_detail_url`);
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.status_code === 1 && data.results) {
          console.log('✅ ComicVine API populares funcionó!', data);
          
          // Mapear los datos de la API real al formato esperado
          const mappedResults = data.results.map((volume: any) => ({
            id: volume.id,
            name: volume.name,
            image: volume.image || {
              icon_url: `https://via.placeholder.com/150x150/34495e/ffffff?text=COMIC`,
              medium_url: `https://via.placeholder.com/300x400/34495e/ffffff?text=Comic+Magazine`,
              screen_url: `https://via.placeholder.com/400x600/34495e/ffffff?text=Comic+Magazine`,
              screen_large_url: `https://via.placeholder.com/600x800/34495e/ffffff?text=Comic+Magazine`,
              small_url: `https://via.placeholder.com/200x300/34495e/ffffff?text=COMIC`,
              super_url: `https://via.placeholder.com/800x1200/34495e/ffffff?text=Comic+Magazine`,
              thumb_url: `https://via.placeholder.com/100x150/34495e/ffffff?text=COM`,
              tiny_url: `https://via.placeholder.com/50x75/34495e/ffffff?text=C`,
              original_url: `https://via.placeholder.com/1200x1800/34495e/ffffff?text=Comic+Magazine`
            },
            description: volume.description || "Información no disponible",
            start_year: volume.start_year || 2000,
            publisher: volume.publisher || { id: 0, name: "Desconocido" },
            issue_count: volume.count_of_issues || 0,
            site_detail_url: volume.site_detail_url || "",
            rating: {
              average: Math.floor(Math.random() * 3) + 7 + Math.random(),
              count: Math.floor(Math.random() * 2000) + 500
            }
          }));
          
          return {
            error: data.error,
            limit: data.limit,
            offset: data.offset,
            number_of_page_results: data.number_of_page_results,
            number_of_total_results: data.number_of_total_results,
            status_code: data.status_code,
            results: mappedResults
          };
        }
      }
    } catch (corsError) {
      console.warn('❌ ComicVine API populares también falló por CORS:', corsError);
    }
    
    // 3. Fallback final: usar datos de ejemplo
    console.log('📋 Usando datos de ejemplo para populares como último recurso...');
    await simulateDelay(600);
    
    const popularComics = SAMPLE_COMICS.slice(0, limit);
    
    return {
      error: "OK",
      limit: limit,
      offset: 0,
      number_of_page_results: popularComics.length,
      number_of_total_results: popularComics.length,
      status_code: 1,
      results: popularComics
    };
  } catch (error) {
    console.error('Error obteniendo cómics populares:', error);
    throw error;
  }
};

export interface Character {
  id: number;
  name: string;
  real_name?: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  description: string;
  publisher: {
    id: number;
    name: string;
  };
  powers?: string[];
  first_appeared_in_issue?: {
    id: number;
    name: string;
    issue_number: string;
  };
  origin?: string;
  site_detail_url: string;
  rating?: {
    average: number;
    count: number;
  };
}

// Datos de ejemplo para personajes
const SAMPLE_CHARACTERS: Character[] = [
  {
    id: 1,
    name: "Spider-Man",
    real_name: "Peter Parker",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/620-spider-man.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/620-spider-man.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/620-spider-man.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg"
    },
    description: "Después de ser mordido por una araña radiactiva, Peter Parker desarrolló poderes arácnidos y se convirtió en el amigable vecino Spider-Man.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Fuerza sobrehumana", "Agilidad", "Sentido arácnido", "Adherencia a superficies", "Lanzatelarañas"],
    origin: "Mordido por araña radiactiva",
    site_detail_url: "https://comicvine.gamespot.com/spider-man/4005-1443/",
    rating: { average: 9.1, count: 2456 }
  },
  {
    id: 2,
    name: "Batman",
    real_name: "Bruce Wayne",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg"
    },
    description: "Bruce Wayne se convirtió en Batman después de presenciar el asesinato de sus padres, dedicando su vida a combatir el crimen en Gotham City.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Intelecto genial", "Artes marciales", "Tecnología avanzada", "Habilidades detectivescas", "Recursos ilimitados"],
    origin: "Testigo del asesinato de sus padres",
    site_detail_url: "https://comicvine.gamespot.com/batman/4005-1699/",
    rating: { average: 9.3, count: 3021 }
  },
  {
    id: 3,
    name: "Wonder Woman",
    real_name: "Diana Prince",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/720-wonder-woman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/720-wonder-woman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/720-wonder-woman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/720-wonder-woman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/720-wonder-woman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg"
    },
    description: "Princesa amazona de Themyscira que llegó al mundo del hombre para luchar por la justicia, la paz y el amor.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Fuerza divina", "Vuelo", "Lazo de la verdad", "Brazaletes deflectores", "Velocidad sobrehumana"],
    origin: "Princesa amazona creada por los dioses",
    site_detail_url: "https://comicvine.gamespot.com/wonder-woman/4005-2048/",
    rating: { average: 8.8, count: 1789 }
  },
  {
    id: 4,
    name: "Iron Man",
    real_name: "Tony Stark",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/346-iron-man.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/346-iron-man.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/346-iron-man.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/346-iron-man.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/346-iron-man.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg"
    },
    description: "Genio millonario que creó una armadura tecnológicamente avanzada para convertirse en Iron Man después de ser capturado por terroristas.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Armadura de alta tecnología", "Vuelo", "Rayos repulsores", "Genio en ingeniería", "Recursos ilimitados"],
    origin: "Creó armadura para escapar del cautiverio",
    site_detail_url: "https://comicvine.gamespot.com/iron-man/4005-1455/",
    rating: { average: 8.6, count: 1534 }
  },
  {
    id: 5,
    name: "Captain America",
    real_name: "Steve Rogers",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/149-captain-america.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/149-captain-america.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/149-captain-america.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/149-captain-america.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/149-captain-america.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg"
    },
    description: "Un soldado de la Segunda Guerra Mundial transformado por el suero del supersoldado en el Primer Vengador de América.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Fuerza sobrehumana", "Agilidad aumentada", "Escudo de vibranium", "Liderazgo", "Resistencia mejorada"],
    origin: "Suero del supersoldado",
    site_detail_url: "https://comicvine.gamespot.com/captain-america/4005-1442/",
    rating: { average: 8.7, count: 1923 }
  },
  {
    id: 6,
    name: "The Flash",
    real_name: "Barry Allen",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/263-flash.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/263-flash.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/263-flash.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/263-flash.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/263-flash.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg"
    },
    description: "Científico forense que obtuvo súper velocidad tras ser alcanzado por un rayo en su laboratorio lleno de químicos.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Súper velocidad", "Viaje en el tiempo", "Fuerza de velocidad", "Reflejos aumentados", "Curación acelerada"],
    origin: "Rayo y químicos en el laboratorio",
    site_detail_url: "https://comicvine.gamespot.com/flash/4005-1916/",
    rating: { average: 8.4, count: 1456 }
  },
  {
    id: 7,
    name: "Wolverine",
    real_name: "James Howlett (Logan)",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/717-wolverine.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/717-wolverine.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/717-wolverine.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/717-wolverine.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/717-wolverine.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg"
    },
    description: "Mutante con factor curativo, garras de adamantium retráctiles y sentidos animalescos mejorados.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Factor curativo", "Garras de adamantium", "Sentidos mejorados", "Esqueleto de adamantium", "Longevidad"],
    origin: "Mutante con experimentos del programa Arma X",
    site_detail_url: "https://comicvine.gamespot.com/wolverine/4005-1440/",
    rating: { average: 9.0, count: 2789 }
  },
  {
    id: 8,
    name: "Superman",
    real_name: "Clark Kent (Kal-El)",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/644-superman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg"
    },
    description: "El último hijo de Krypton que se convirtió en el protector más poderoso de la Tierra.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Vuelo", "Fuerza sobrehumana", "Visión de calor", "Visión de rayos X", "Súper velocidad", "Invulnerabilidad"],
    origin: "Último superviviente de Krypton",
    site_detail_url: "https://comicvine.gamespot.com/superman/4005-1807/",
    rating: { average: 9.2, count: 3456 }
  },
  {
    id: 9,
    name: "Green Lantern",
    real_name: "Hal Jordan",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/313-green-lantern.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/313-green-lantern.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/313-green-lantern.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/313-green-lantern.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/313-green-lantern.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg"
    },
    description: "Piloto de pruebas que se convirtió en miembro del Cuerpo de Linternas Verdes del sector espacial 2814.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Anillo de poder", "Vuelo", "Construcciones de energía", "Traducción universal", "Protección espacial"],
    origin: "Elegido por anillo de Linterna Verde",
    site_detail_url: "https://comicvine.gamespot.com/green-lantern/4005-1565/",
    rating: { average: 8.3, count: 1234 }
  },
  {
    id: 10,
    name: "Thor",
    real_name: "Thor Odinson",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/659-thor.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/659-thor.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/659-thor.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/659-thor.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/659-thor.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg"
    },
    description: "Dios asgardiano del trueno que empuña el martillo místico Mjolnir y protege tanto Asgard como Midgard.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Mjolnir", "Control del trueno", "Fuerza divina", "Vuelo", "Longevidad", "Resistencia mágica"],
    origin: "Dios asgardiano",
    site_detail_url: "https://comicvine.gamespot.com/thor/4005-1737/",
    rating: { average: 8.9, count: 2103 }
  },
  {
    id: 11,
    name: "Hulk",
    real_name: "Bruce Banner",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/332-hulk.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/332-hulk.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg"
    },
    description: "Científico que se transforma en un gigante verde de fuerza ilimitada cuando se enfurece.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Fuerza ilimitada", "Factor curativo", "Resistencia", "Saltos enormes", "Inmunidad a enfermedades"],
    origin: "Radiación gamma",
    site_detail_url: "https://comicvine.gamespot.com/hulk/4005-2267/",
    rating: { average: 8.8, count: 2567 }
  },
  {
    id: 12,
    name: "Deadpool",
    real_name: "Wade Wilson",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/213-deadpool.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/213-deadpool.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/213-deadpool.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/213-deadpool.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/213-deadpool.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg"
    },
    description: "Mercenario con factor curativo acelerado, habilidades de combate excepcionales y tendencia a romper la cuarta pared.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Factor curativo", "Habilidades de combate", "Inmortalidad", "Teleportación", "Romper cuarta pared"],
    origin: "Experimento del programa Arma X",
    site_detail_url: "https://comicvine.gamespot.com/deadpool/4005-7606/",
    rating: { average: 8.7, count: 1876 }
  },
  {
    id: 13,
    name: "Black Widow",
    real_name: "Natasha Romanoff",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/107-black-widow.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/107-black-widow.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg"
    },
    description: "Ex-espía rusa entrenada en la Habitación Roja que se convirtió en una de los Vengadores más letales.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Artes marciales", "Espionaje", "Acrobacia", "Viudas mordidas", "Entrenamiento militar"],
    origin: "Programa de espías de la Habitación Roja",
    site_detail_url: "https://comicvine.gamespot.com/black-widow/4005-3103/",
    rating: { average: 8.2, count: 1345 }
  },
  {
    id: 14,
    name: "Aquaman",
    real_name: "Arthur Curry",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/52-aquaman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/52-aquaman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/52-aquaman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/52-aquaman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/52-aquaman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg"
    },
    description: "Rey de Atlantis con la habilidad de comunicarse con la vida marina y controlar los océanos.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Comunicación marina", "Fuerza sobrehumana", "Nado súper rápido", "Resistencia presión", "Tridente de Poseidón"],
    origin: "Hijo del faro keeper y reina atlante",
    site_detail_url: "https://comicvine.gamespot.com/aquaman/4005-1386/",
    rating: { average: 7.8, count: 987 }
  }
];

// Función para obtener personajes populares
export const getPopularCharacters = async (page: number = 1, randomize: boolean = true): Promise<ComicVineResponse<Character>> => {
  try {
    // Estrategias para obtener variedad de personajes
    const strategies = [
      // Estrategia 1: Orden alfabético
      `${COMICVINE_BASE_URL}/characters/?api_key=${API_KEY}&format=json&limit=20&sort=name:asc&offset=${(page - 1) * 20}&field_list=id,name,real_name,image,description,publisher,powers,origin,site_detail_url`,
      // Estrategia 2: Por fecha de adición
      `${COMICVINE_BASE_URL}/characters/?api_key=${API_KEY}&format=json&limit=20&sort=date_added:desc&offset=${(page - 1) * 20}&field_list=id,name,real_name,image,description,publisher,powers,origin,site_detail_url`,
      // Estrategia 3: Por popularidad (fecha de última actualización)
      `${COMICVINE_BASE_URL}/characters/?api_key=${API_KEY}&format=json&limit=20&sort=date_last_updated:desc&offset=${(page - 1) * 20}&field_list=id,name,real_name,image,description,publisher,powers,origin,site_detail_url`
    ];
    
    // Seleccionar estrategia aleatoria si randomize es true
    const url = randomize 
      ? strategies[Math.floor(Math.random() * strategies.length)]
      : strategies[0]; // Por defecto alfabético
    
    try {
      console.log(`👤 Intentando llamada real a ComicVine API para personajes (página ${page})...`);
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.status_code === 1 && data.results) {
          console.log('✅ API real de personajes funcionó!', data);
          
          // Mapear los datos de la API real al formato esperado
          const mappedResults = data.results.map((character: any) => ({
            id: character.id,
            name: character.name,
            real_name: character.real_name || character.name,
            image: character.image || {
              icon_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-batman.jpg`,
              medium_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-batman.jpg`,
              screen_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-batman.jpg`,
              screen_large_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-batman.jpg`,
              small_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-batman.jpg`,
              super_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-batman.jpg`,
              thumb_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-batman.jpg`,
              tiny_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-batman.jpg`,
              original_url: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-batman.jpg`
            },
            description: character.description || "Información no disponible",
            publisher: character.publisher || { id: 0, name: "Desconocido" },
            powers: character.powers || ["Información no disponible"],
            origin: character.origin || "Origen desconocido",
            site_detail_url: character.site_detail_url || "",
            rating: {
              average: Math.floor(Math.random() * 3) + 7 + Math.random(),
              count: Math.floor(Math.random() * 2000) + 500
            }
          }));
          
          return {
            error: data.error,
            limit: data.limit,
            offset: data.offset,
            number_of_page_results: data.number_of_page_results,
            number_of_total_results: data.number_of_total_results,
            status_code: data.status_code,
            results: mappedResults
          };
        }
      }
    } catch (corsError) {
      console.warn('❌ CORS bloqueó la API real de personajes:', corsError);
    }
    
    // Fallback a datos de ejemplo si CORS bloquea
    console.log(`📋 Usando datos de ejemplo de personajes debido a CORS (página ${page})...`);
    await simulateDelay(600);
    
    // Mezclar personajes de ejemplo para simular páginas diferentes
    let availableCharacters = [...SAMPLE_CHARACTERS];
    
    // FORZAR que Aquaman y Green Lantern aparezcan primero en página 1
    if (page === 1) {
      const aquamanIndex = availableCharacters.findIndex(char => char.name.toLowerCase().includes('aquaman'));
      const greenLanternIndex = availableCharacters.findIndex(char => char.name.toLowerCase().includes('green lantern'));
      
      if (aquamanIndex > -1) {
        const aquaman = availableCharacters.splice(aquamanIndex, 1)[0];
        availableCharacters.unshift(aquaman);
        console.log('🔱 Aquaman movido al primer lugar');
      }
      
      if (greenLanternIndex > -1) {
        const adjustedIndex = greenLanternIndex > aquamanIndex ? greenLanternIndex - 1 : greenLanternIndex;
        const greenLantern = availableCharacters.splice(adjustedIndex, 1)[0];
        availableCharacters.splice(1, 0, greenLantern);
        console.log('💚 Green Lantern movido al segundo lugar');
      }
    }
    
    if (randomize && page > 1) {
      // Solo mezclar para páginas después de la primera
      availableCharacters = availableCharacters.sort(() => Math.random() - 0.5);
    }
    
    // Simular paginación con los datos de ejemplo
    const startIndex = ((page - 1) * 14) % availableCharacters.length;
    let pageCharacters: Character[] = [];
    
    // Obtener 14 personajes (puede ciclar si es necesario)
    for (let i = 0; i < 14; i++) {
      const index = (startIndex + i) % availableCharacters.length;
      pageCharacters.push(availableCharacters[index]);
    }
    
    // Si necesitamos más personajes para llegar a 14, duplicar algunos con IDs diferentes
    if (pageCharacters.length < 14) {
      const needed = 14 - pageCharacters.length;
      for (let i = 0; i < needed; i++) {
        const charIndex = i % availableCharacters.length;
        const duplicateChar = {
          ...availableCharacters[charIndex],
          id: availableCharacters[charIndex].id + 10000 + (page * 100) + i
        };
        pageCharacters.push(duplicateChar);
      }
    }
    
    // Si es página > 1, modificar ligeramente los IDs para evitar duplicados
    if (page > 1) {
      pageCharacters = pageCharacters.map((char, index) => ({
        ...char,
        id: char.id + (page * 1000) + index // Modificar ID para evitar duplicados
      }));
    }
    
    console.log(`📦 Devolviendo ${pageCharacters.length} personajes para la página ${page}`);
    
    return {
      error: "OK",
      limit: 14,
      offset: (page - 1) * 14,
      number_of_page_results: pageCharacters.length,
      number_of_total_results: 10000, // Simular que hay muchos más
      status_code: 1,
      results: pageCharacters
    };
  } catch (error) {
    console.error('Error obteniendo personajes populares:', error);
    throw error;
  }
};

/*
 * EXPLICACIÓN DE LA API REAL DE COMICVINE:
 * 
 * La API de ComicVine SÍ proporciona imágenes reales de alta calidad:
 * 
 * Ejemplo de respuesta real de un volumen (cómic):
 * {
 *   "id": 796,
 *   "name": "Batman",
 *   "start_year": 1940,
 *   "image": {
 *     "icon_url": "https://comicvine.gamespot.com/a/uploads/square_avatar/6/67663/5206439-796.jpg",
 *     "medium_url": "https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/5206439-796.jpg",
 *     "screen_url": "https://comicvine.gamespot.com/a/uploads/screen_medium/6/67663/5206439-796.jpg",
 *     "screen_large_url": "https://comicvine.gamespot.com/a/uploads/screen_kubrick/6/67663/5206439-796.jpg",
 *     "small_url": "https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5206439-796.jpg",
 *     "super_url": "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/5206439-796.jpg",
 *     "thumb_url": "https://comicvine.gamespot.com/a/uploads/square_mini/6/67663/5206439-796.jpg",
 *     "tiny_url": "https://comicvine.gamespot.com/a/uploads/square_mini/6/67663/5206439-796.jpg",
 *     "original_url": "https://comicvine.gamespot.com/a/uploads/original/6/67663/5206439-796.jpg"
 *   },
 *   "description": "<p>Batman is a superhero...</p>",
 *   "publisher": {
 *     "id": 10,
 *     "name": "DC Comics"
 *   },
 *   "count_of_issues": 881
 * }
 * 
 * El problema en nuestro frontend es CORS (Cross-Origin Resource Sharing).
 * ComicVine no permite peticiones directas desde navegadores debido a su política CORS.
 * 
 * SOLUCIONES PARA USAR LA API REAL:
 * 1. Crear un backend proxy que haga las peticiones a ComicVine
 * 2. Usar un proxy CORS público (no recomendado para producción)
 * 3. Usar extensiones del navegador que desactiven CORS (solo para desarrollo)
 * 
 * En este código, intentamos la llamada real primero, y si falla por CORS,
 * usamos datos de ejemplo con imágenes alternativas.
 */
