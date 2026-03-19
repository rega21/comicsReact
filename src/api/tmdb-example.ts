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

    // Si la API no devolvió resultados, usar datos de ejemplo
    if (finalMovies.length === 0) {
      console.warn('⚠️ API no devolvió películas, usando datos de ejemplo...');
      return getSampleMoviesPage(page);
    }

    return {
      page: page,
      results: finalMovies,
      total_pages: Math.ceil(uniqueMovies.length / 12),
      total_results: uniqueMovies.length
    };
  } catch (error) {
    console.error('❌ Error obteniendo películas populares de superhéroes:', error);
    return getSampleMoviesPage(page);
  }
};

const SAMPLE_MOVIES: TMDBMovie[] = [
  { id: 299536, title: 'Avengers: Infinity War', overview: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos.', poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', backdrop_path: '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg', release_date: '2018-04-27', vote_average: 8.3, vote_count: 22000 },
  { id: 299534, title: 'Avengers: Endgame', overview: 'After the devastating events of Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos\' actions.', poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg', backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', release_date: '2019-04-26', vote_average: 8.4, vote_count: 23000 },
  { id: 284053, title: 'Thor: Ragnarok', overview: 'Thor is imprisoned on the other side of the universe without his hammer and finds himself in a race against time to get back to Asgard.', poster_path: '/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg', backdrop_path: '/kaIfm5ryEOwGnR1nt5a5e5VGAbL.jpg', release_date: '2017-11-03', vote_average: 7.9, vote_count: 18000 },
  { id: 315635, title: 'Spider-Man: Homecoming', overview: 'A young Peter Parker/Spider-Man begins to navigate his newfound identity as the web-slinging super hero.', poster_path: '/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', backdrop_path: '/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg', release_date: '2017-07-07', vote_average: 7.4, vote_count: 17000 },
  { id: 414906, title: 'The Batman', overview: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate.', poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg', backdrop_path: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg', release_date: '2022-03-04', vote_average: 7.9, vote_count: 14000 },
  { id: 297762, title: 'Wonder Woman', overview: 'An Amazonian princess ventures into the world of men and becomes one of the world\'s greatest heroes.', poster_path: '/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg', backdrop_path: '/6iUNJZymJBMXXriQyFZfLAKnjO6.jpg', release_date: '2017-06-02', vote_average: 7.3, vote_count: 16000 },
  { id: 141052, title: 'Man of Steel', overview: 'Clark Kent, one of the last of an extraterrestrial race, is raised by a human family on Earth and becomes Superman.', poster_path: '/5UsK3grJvtQrtzEgqNlDljJW96w.jpg', backdrop_path: '/7rIPjn5TUK04O25ZkMyHrGNPgLx.jpg', release_date: '2013-06-14', vote_average: 7.0, vote_count: 15000 },
  { id: 293660, title: 'Deadpool', overview: 'A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.', poster_path: '/yGSxMiF0cYuAiyuve5DA6bnWBIf.jpg', backdrop_path: '/n1y094tVDFATSzkTnFxoGZ1qNsG.jpg', release_date: '2016-02-12', vote_average: 7.9, vote_count: 19000 },
  { id: 284054, title: 'Black Panther', overview: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.', poster_path: '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', backdrop_path: '/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg', release_date: '2018-02-16', vote_average: 7.4, vote_count: 17000 },
  { id: 284052, title: 'Doctor Strange', overview: 'A former neurosurgeon embarks on a journey of healing only to be drawn into the world of the mystic arts.', poster_path: '/gwi5kL7HEWAOTffiA14e4SbOGra.jpg', backdrop_path: '/tFI8VLMgSTTU38i8TIsklfqS9Nl.jpg', release_date: '2016-11-04', vote_average: 7.5, vote_count: 16000 },
  { id: 297802, title: 'Aquaman', overview: 'Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.', poster_path: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg', backdrop_path: '/7icgF1dgUJaCpnWV235eafXFznJ.jpg', release_date: '2018-12-21', vote_average: 6.9, vote_count: 14000 },
  { id: 338952, title: 'Ant-Man and the Wasp', overview: 'As Scott Lang balances being both a Super Hero and a father, Hope van Dyne and Dr. Hank Pym present an urgent new mission.', poster_path: '/rv1AWImgx386ULjcf62VYaW8zSt.jpg', backdrop_path: '/6P3c80EOm7BodndGBUAJHHsHKnp.jpg', release_date: '2018-07-06', vote_average: 7.1, vote_count: 13000 },
  { id: 299537, title: 'Captain Marvel', overview: 'Carol Danvers becomes one of the universe\'s most powerful heroes when Earth is caught in the middle of a galactic war.', poster_path: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', backdrop_path: '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg', release_date: '2019-03-08', vote_average: 7.0, vote_count: 14500 },
  { id: 429617, title: 'Spider-Man: Far From Home', overview: 'Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.', poster_path: '/lcq8dVxeeOqnvbMIRd0aYbgOCNd.jpg', backdrop_path: '/upUy2QhiGmHAvS3yGWgWeKdkGAP.jpg', release_date: '2019-07-02', vote_average: 7.5, vote_count: 15000 },
  { id: 566525, title: 'Shang-Chi and the Legend of the Ten Rings', overview: 'Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.', poster_path: '/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg', backdrop_path: '/cinER0ESG0eJ49kXlExM0MEWGxW.jpg', release_date: '2021-09-03', vote_average: 7.4, vote_count: 11000 },
  { id: 524434, title: 'Eternals', overview: 'The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years, reunite to battle the evil Deviants.', poster_path: '/bcCBq9N1EMo3daNbbe2cyfkbO3t.jpg', backdrop_path: '/7PSn0tBxKWrKCDIZ5pQTDHxGvZ0.jpg', release_date: '2021-11-05', vote_average: 6.9, vote_count: 10000 },
  { id: 634649, title: 'Spider-Man: No Way Home', overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.', poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg', release_date: '2021-12-17', vote_average: 8.0, vote_count: 18000 },
  { id: 505642, title: 'Black Panther: Wakanda Forever', overview: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T\'Challa.', poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg', release_date: '2022-11-11', vote_average: 7.2, vote_count: 9500 },
  { id: 616037, title: 'Thor: Love and Thunder', overview: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher.', poster_path: '/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg', backdrop_path: '/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg', release_date: '2022-07-08', vote_average: 6.8, vote_count: 9000 },
  { id: 848326, title: 'Rebel Moon', overview: 'A peaceful colony on the edge of the galaxy finds itself threatened by the armies of the Motherworld.', poster_path: '/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg', backdrop_path: '/pAXnk0EFYGE3VFMSJaSGsAvyiQG.jpg', release_date: '2023-12-22', vote_average: 6.0, vote_count: 5000 },
  { id: 447365, title: 'Guardians of the Galaxy Vol. 3', overview: 'The Guardians set out on a mission to protect one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians.', poster_path: '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', backdrop_path: '/5YZbUmjbMa3ClvSW1Wj3D6XGkVA.jpg', release_date: '2023-05-05', vote_average: 8.0, vote_count: 8500 },
  { id: 640146, title: 'Ant-Man and the Wasp: Quantumania', overview: 'Scott Lang and Hope Van Dyne, along with Hank Pym and Janet Van Dyne, explore the Quantum Realm.', poster_path: '/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg', backdrop_path: '/oSJl4Pb4i9scaUi9IeGpq5fGQqf.jpg', release_date: '2023-02-17', vote_average: 6.3, vote_count: 7000 },
  { id: 533535, title: 'Deadpool & Wolverine', overview: 'Deadpool is offered a chance to join the Time Variance Authority and he recruits a variant Wolverine.', poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', backdrop_path: '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg', release_date: '2024-07-26', vote_average: 7.8, vote_count: 6000 },
  { id: 822119, title: 'Captain America: Brave New World', overview: 'Sam Wilson steps up as Captain America and finds himself in the middle of an international incident.', poster_path: '/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', backdrop_path: '/fPJWlhXA2VLl50hCuLgIGdRi7mY.jpg', release_date: '2025-02-14', vote_average: 6.5, vote_count: 2000 },
];

const getSampleMoviesPage = (page: number): TMDBResponse<TMDBMovie> => {
  const pageSize = 12;
  const start = ((page - 1) % Math.ceil(SAMPLE_MOVIES.length / pageSize)) * pageSize;
  const results = SAMPLE_MOVIES.slice(start, start + pageSize);
  return {
    page,
    results: results.length > 0 ? results : SAMPLE_MOVIES.slice(0, pageSize),
    total_pages: Math.ceil(SAMPLE_MOVIES.length / pageSize),
    total_results: SAMPLE_MOVIES.length,
  };
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
