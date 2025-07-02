// TMDB API Configuration - EJEMPLO para comparar con ComicVine

/*
🔑 CÓMO OBTENER API KEY DE TMDB (GRATIS):

1. Ve a: https://www.themoviedb.org/
2. Haz clic en "Join TMDB"
3. Crea tu cuenta
4. Ve a Settings → API
5. Solicita una API key (selecciona "Developer")
6. Llena el formulario básico
7. ¡Listo! Recibes tu key inmediatamente

Es 100% gratuito y sin límites muy restrictivos.
*/

const TMDB_API_KEY = '12be8542502608cdcb8f5b86efa3ee46'; // Tu API key real
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  cast?: TMDBCastMember[];
  directors?: TMDBCrewMember[];
  genres?: { id: number; name: string }[];
  runtime?: number;
}

// Función para obtener películas populares - FUNCIONA SIN CORS
export const getTMDBPopularMovies = async (page: number = 1): Promise<TMDBResponse<TMDBMovie>> => {
  try {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`;
    
    console.log('🎬 Llamando a TMDB API (sin problemas de CORS)...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ TMDB API funcionó perfectamente!', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error con TMDB API:', error);
    throw error;
  }
};

// Función helper para construir URLs de imágenes
export const getTMDBImageUrl = (path: string, size: string = 'w500'): string => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Función para obtener configuración de TMDB (NO requiere API key)
export const getTMDBConfiguration = async (): Promise<any> => {
  try {
    const url = `${TMDB_BASE_URL}/configuration`;
    
    console.log('🔧 Obteniendo configuración de TMDB (sin API key)...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Configuración TMDB obtenida!', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo configuración TMDB:', error);
    throw error;
  }
};

// Función para buscar películas de superhéroes específicamente
export const getSuperheroMovies = async (): Promise<TMDBResponse<TMDBMovie>> => {
  try {
    // Buscar películas con palabras clave de superhéroes
    const superheroKeywords = ['marvel', 'dc', 'superhero', 'batman', 'superman', 'spider-man', 'avengers', 'justice league'];
    const randomKeyword = superheroKeywords[Math.floor(Math.random() * superheroKeywords.length)];
    
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${randomKeyword}&language=en-US`;
    
    console.log('🦸‍♂️ Buscando películas de superhéroes...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Películas de superhéroes obtenidas!', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo películas de superhéroes:', error);
    throw error;
  }
};

// Función para obtener películas populares de superhéroes con géneros específicos
export const getPopularSuperheroMovies = async (page: number = 1): Promise<TMDBResponse<TMDBMovie>> => {
  try {
    console.log(`🎬 Obteniendo películas de superhéroes (página ${page})...`);
    
    // Múltiples estrategias para obtener más variedad
    const strategies = [
      // Estrategia 1: Por géneros específicos con páginas aleatorias
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28,12,878&sort_by=popularity.desc&language=en-US&page=${page}`,
      // Estrategia 2: Búsqueda por Marvel con página dinámica
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=marvel&language=en-US&page=${Math.min(page, 20)}`,
      // Estrategia 3: Búsqueda por DC con página dinámica
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=dc+comics&language=en-US&page=${Math.min(page, 15)}`,
      // Estrategia 4: Búsqueda por superhéroes específicos
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=superhero+batman+superman+spider-man&language=en-US&page=${Math.min(page, 10)}`,
      // Estrategia 5: Por géneros de fantasía y acción con páginas aleatorias
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=14,28&sort_by=vote_average.desc&language=en-US&page=${page}`,
      // Estrategia 6: Películas de acción recientes
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28&primary_release_date.gte=2010-01-01&sort_by=popularity.desc&language=en-US&page=${page}`,
      // Estrategia 7: Películas de ciencia ficción populares
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&sort_by=popularity.desc&language=en-US&page=${page}`
    ];
    
    // Seleccionar múltiples estrategias para obtener más variedad (2-3 estrategias)
    const numStrategies = Math.min(3, strategies.length);
    const selectedStrategies = [];
    
    // Siempre incluir la estrategia principal (géneros específicos)
    selectedStrategies.push(strategies[0]);
    
    // Agregar estrategias adicionales aleatorias
    for (let i = 1; i < numStrategies; i++) {
      const randomIndex = Math.floor(Math.random() * (strategies.length - 1)) + 1;
      if (!selectedStrategies.includes(strategies[randomIndex])) {
        selectedStrategies.push(strategies[randomIndex]);
      }
    }
    
    console.log(`📊 Usando ${selectedStrategies.length} estrategias para obtener más variedad...`);
    
    // Ejecutar todas las estrategias seleccionadas en paralelo
    const promises = selectedStrategies.map(url => 
      fetch(url).then(response => response.ok ? response.json() : null)
    );
    
    const results = await Promise.all(promises);
    
    // Combinar resultados de todas las estrategias
    let allMovies: TMDBMovie[] = [];
    
    results.forEach((data, index) => {
      if (data && data.results) {
        console.log(`✅ Estrategia ${index + 1} obtuvo ${data.results.length} películas`);
        allMovies = allMovies.concat(data.results);
      }
    });
    
    console.log(`📦 Total de películas obtenidas: ${allMovies.length}`);
    
    // Filtrar películas de superhéroes con criterios más estrictos
    const superheroMovies = allMovies.filter((movie: TMDBMovie) => {
      const title = movie.title.toLowerCase();
      const overview = movie.overview.toLowerCase();
      
      // Términos específicos de superhéroes y cómics
      const superheroTerms = [
        // Marcas principales
        'marvel', 'dc comics', 'superhero', 'super hero', 'comic book',
        // Personajes específicos - Marvel
        'spider-man', 'spiderman', 'iron man', 'thor', 'hulk', 'captain america',
        'avengers', 'x-men', 'wolverine', 'deadpool', 'ant-man', 'doctor strange',
        'black widow', 'hawkeye', 'falcon', 'scarlet witch', 'vision', 'loki',
        'thanos', 'guardians of the galaxy', 'fantastic four', 'daredevil',
        'punisher', 'blade', 'ghost rider', 'venom', 'carnage',
        // Personajes específicos - DC
        'batman', 'superman', 'wonder woman', 'aquaman', 'flash', 'green lantern',
        'justice league', 'joker', 'harley quinn', 'catwoman', 'robin',
        'cyborg', 'shazam', 'green arrow', 'supergirl',
        // Otros
        'watchmen', 'hellboy', 'spawn', 'teen titans', 'suicide squad'
      ];
      
      // Términos a excluir (películas que NO son de superhéroes)
      const excludeTerms = [
        'tropa de elite', 'daddy yankee', 'fast', 'furious', 'transformers',
        'terminator', 'alien', 'predator', 'rambo', 'rocky', 'john wick',
        'mission impossible', 'james bond', 'star wars', 'star trek',
        'pirates', 'indiana jones', 'tomb raider', 'resident evil',
        'underworld', 'matrix', 'lord of the rings', 'hobbit', 'harry potter'
      ];
      
      // Verificar que contenga términos de superhéroes
      const hasSuperheroContent = superheroTerms.some(term => 
        title.includes(term) || overview.includes(term)
      );
      
      // Verificar que NO contenga términos excluidos
      const hasExcludedContent = excludeTerms.some(term => 
        title.includes(term) || overview.includes(term)
      );
      
      // Filtrar por calidad: poster, rating decente, año razonable
      const hasQuality = movie.poster_path && 
                        movie.vote_average > 5.0 && 
                        movie.release_date &&
                        new Date(movie.release_date).getFullYear() >= 1990;
      
      return hasSuperheroContent && !hasExcludedContent && hasQuality;
    });
    
    // Remover duplicados basados en ID
    const uniqueMovies = superheroMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.id === movie.id)
    );
    
    console.log(`🎯 Películas únicas de superhéroes: ${uniqueMovies.length}`);
    
    // Si hay pocas películas de superhéroes, hacer consultas adicionales más específicas
    if (uniqueMovies.length < 12) {
      console.log('🔄 Pocas películas encontradas, ampliando búsqueda con términos específicos...');
      
      const fallbackStrategies = [
        // Búsquedas más específicas de superhéroes
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=marvel+superhero&language=en-US&page=${Math.ceil(Math.random() * 3)}`,
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=dc+batman+superman&language=en-US&page=${Math.ceil(Math.random() * 3)}`,
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=comic+book+hero&language=en-US&page=${Math.ceil(Math.random() * 2)}`
      ];
      
      const fallbackPromises = fallbackStrategies.map(url => 
        fetch(url).then(response => response.ok ? response.json() : null)
      );
      
      const fallbackResults = await Promise.all(fallbackPromises);
      
      fallbackResults.forEach(data => {
        if (data && data.results) {
          const moreSuperheroes = data.results.filter((movie: TMDBMovie) => {
            const title = movie.title.toLowerCase();
            const overview = movie.overview.toLowerCase();
            const superheroCheck = ['marvel', 'dc', 'batman', 'superman', 'spider', 'hero', 'comic'].some(term => 
              title.includes(term) || overview.includes(term)
            );
            return movie.poster_path && 
                   movie.vote_average > 5.0 &&
                   superheroCheck &&
                   !uniqueMovies.find(existing => existing.id === movie.id); // Evitar duplicados
          });
          uniqueMovies.push(...moreSuperheroes);
        }
      });
      
      console.log(`🎯 Total después de fallback: ${uniqueMovies.length}`);
    }
    
    // Mezclar array para más variedad y asegurar que cada página sea diferente
    const shuffledMovies = uniqueMovies.sort(() => Math.random() - 0.5);
    
    // Devolver exactamente 12 películas
    const finalMovies = shuffledMovies.slice(0, 12);
    
    console.log(`🎬 Devolviendo exactamente ${finalMovies.length} películas para la página ${page}`);
    
    return {
      page: page,
      results: finalMovies,
      total_pages: Math.ceil(uniqueMovies.length / 12),
      total_results: uniqueMovies.length
    };
  } catch (error) {
    console.error('❌ Error obteniendo películas populares de superhéroes:', error);
    throw error;
  }
};

// Función para obtener detalles completos de una película incluyendo cast y crew
export const getTMDBMovieDetails = async (movieId: number): Promise<TMDBMovieDetails> => {
  try {
    const movieUrl = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;
    const creditsUrl = `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
    
    console.log('🎬 Obteniendo detalles completos de película...');
    
    const [movieResponse, creditsResponse] = await Promise.all([
      fetch(movieUrl),
      fetch(creditsUrl)
    ]);
    
    if (!movieResponse.ok || !creditsResponse.ok) {
      throw new Error('Error al obtener detalles de la película');
    }
    
    const movieData = await movieResponse.json();
    const creditsData = await creditsResponse.json();
    
    // Obtener directores
    const directors = creditsData.crew.filter((member: TMDBCrewMember) => member.job === 'Director');
    
    // Obtener los primeros 5 actores principales
    const cast = creditsData.cast.slice(0, 5);
    
    return {
      ...movieData,
      cast,
      directors
    };
  } catch (error) {
    console.error('❌ Error obteniendo detalles de película:', error);
    throw error;
  }
};

// Tamaños disponibles en TMDB:
// Posters: w92, w154, w185, w342, w500, w780, original
// Backdrops: w300, w780, w1280, original

/* 
COMPARACIÓN CORS:

TMDB ✅:
- Headers CORS: Access-Control-Allow-Origin: *
- Permite peticiones desde cualquier dominio
- CDN de imágenes público: image.tmdb.org
- Modelo de negocio: fomentar uso público

ComicVine ❌:
- Sin headers CORS configurados
- Bloquea peticiones desde navegadores
- Imágenes en el mismo dominio de la API
- Modelo de negocio: dirigir tráfico a su sitio web

TMDB respuesta típica:
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "overview": "A ticking-time-bomb insomniac...",
      "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",  // ✅ Imagen real
      "backdrop_path": "/52AfXWuXCHn3UjD17rBruA9f5qb.jpg", // ✅ Imagen real
      "release_date": "1999-10-15",
      "vote_average": 8.433,
      "vote_count": 26280
    }
  ]
}

URL de imagen final:
https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg
*/
