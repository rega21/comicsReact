import React, { useState, useEffect } from 'react';
import ComicModal from '../components/ComicModal';
import CharacterModal from '../components/CharacterModal';
import MovieModal from '../components/MovieModal';
import LocationModal from '../components/LocationModal';
import SeriesModal from '../components/SeriesModal';
import { 
  getMovieFallback,
  getCharacterImageLocal,
  getCharacterSpecificFallback,
  getMovieImageLocal,
  getLocationImageLocal,
  getSeriesImageLocal,
  getComicImageLocal
} from '../utils/imageUtils';

// Importar TMDB para películas
import { getPopularSuperheroMovies, type TMDBMovie } from '../api/tmdb-example';

// Importar ComicVine para cómics, personajes, locations y series
import { 
  getPopularComics, 
  getPopularCharacters,
  getPopularLocations,
  getPopularSeries,
  type Comic as ComicVineComic, 
  type Character as ComicVineCharacter,
  type Location as ComicVineLocation,
  type Series as ComicVineSeries
} from '../api/comicvine';

// Villanos destacados manuales (por nombre)
const VILLAIN_NAMES = [
  'Joker',
  'Lex Luthor',
  'Green Goblin',
  'Magneto',
  'Thanos',
  'Venom',
  'Doctor Octopus',
  'Loki',
  'Darkseid',
  'Harley Quinn'
];

const Home: React.FC = () => {
  // Estado para magazine
  const [showMagazine, setShowMagazine] = useState(false);
  const [magazineSearch, setMagazineSearch] = useState('');

  // --- Tendencias Home ---
  const getTopComics = () => [...comics].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)).slice(0, 5);
  const getTopMovies = () => [...movies].sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)).slice(0, 5);
  const getTopHeroes = () => [...characters].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)).slice(0, 5);
  const getTopVillains = () =>
    characters
      .filter(c => VILLAIN_NAMES.some(v => c.name.toLowerCase().includes(v.toLowerCase())))
      .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
      .slice(0, 5);
  const [selectedComic, setSelectedComic] = useState<ComicVineComic | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<ComicVineCharacter | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);

  // Estado para paginación de cómics
  const [currentComicsPage, setCurrentComicsPage] = useState<number>(1);
  // Estados para cómics (ComicVine)
  const [comics, setComics] = useState<ComicVineComic[]>([]);
  const [comicsLoading, setComicsLoading] = useState(false);
  const [comicsError, setComicsError] = useState<string | null>(null);
  
  // Estados para personajes (ComicVine)
  const [characters, setCharacters] = useState<ComicVineCharacter[]>([]);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [charactersError, setCharactersError] = useState<string | null>(null);
  const [currentCharacterPage, setCurrentCharacterPage] = useState(1);
  
  // Estados para locations (ComicVine)
  const [locations, setLocations] = useState<ComicVineLocation[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState<string | null>(null);
  const [currentLocationPage, setCurrentLocationPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<ComicVineLocation | null>(null);
  
  // Estados para series (ComicVine)
  const [series, setSeries] = useState<ComicVineSeries[]>([]);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [seriesError, setSeriesError] = useState<string | null>(null);
  const [currentSeriesPage, setCurrentSeriesPage] = useState(1);
  const [selectedSeries, setSelectedSeries] = useState<ComicVineSeries | null>(null);
  
  // Estados para películas (TMDB)
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  
  // Estados para navbar
  const [showWikiDropdown, setShowWikiDropdown] = useState(false);
  const [isWikiMode, setIsWikiMode] = useState(false);
  const [wikiSection, setWikiSection] = useState<string>('');
  
  // Estados para carousel
  const [carouselMovies, setCarouselMovies] = useState<TMDBMovie[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselLoading, setCarouselLoading] = useState(false);

  // Función para resetear al inicio
  const resetToHome = () => {
    setShowWikiDropdown(false);
    setIsWikiMode(false);
    setWikiSection('');
    setSelectedComic(null);
    setSelectedCharacter(null);
    setSelectedMovie(null);
  };

  // Función para manejar Wiki dropdown
  const handleWikiSelect = (section: 'characters' | 'movies' | 'locations' | 'teams' | 'series') => {
    setShowWikiDropdown(false);
    setIsWikiMode(true);
    setWikiSection(section);
  };

  // Cargar datos al iniciar
  useEffect(() => {
    loadCarouselMovies();
    loadPopularComics();
    loadPopularCharacters(); 
    loadPopularMovies();
    loadPopularLocations();
    loadPopularSeries();
  }, []);

  const loadCarouselMovies = async () => {
    setCarouselLoading(true);
    try {
      const response = await getPopularSuperheroMovies(1);
      // Tomar solo las primeras 5 películas para el carousel
      setCarouselMovies(response.results.slice(0, 5));
    } catch (error) {
      console.error('Error loading carousel movies:', error);
    } finally {
      setCarouselLoading(false);
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (carouselMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselMovies.length);
      }, 5000); // Cambiar cada 5 segundos
      
      return () => clearInterval(interval);
    }
  }, [carouselMovies.length]);

  const loadPopularComics = async () => {
    setComicsLoading(true);
    setComicsError(null);
    try {
      const response = await getPopularComics(50);
      setComics(response.results);
    } catch (error) {
      console.error('Error loading popular comics:', error);
      setComicsError('Error al cargar los cómics populares');
    } finally {
      setComicsLoading(false);
    }
  };

  const loadPopularCharacters = async (page: number = 1) => {
    setCharactersLoading(true);
    setCharactersError(null);
    try {
      const response = await getPopularCharacters(page, true);
      setCharacters(response.results);
      setCurrentCharacterPage(page);
    } catch (error) {
      console.error('Error loading popular characters:', error);
      setCharactersError('Error al cargar los personajes populares');
    } finally {
      setCharactersLoading(false);
    }
  };

  // Cargar películas populares al iniciar
  const loadPopularMovies = async (page: number = 1) => {
    setMoviesLoading(true);
    setMoviesError(null);
    try {
      const response = await getPopularSuperheroMovies(page);
      setMovies(response.results);
      setCurrentMoviePage(page);
    } catch (error) {
      console.error('Error loading popular movies:', error);
      setMoviesError('Error al cargar las películas populares');
    } finally {
      setMoviesLoading(false);
    }
  };

  // Cargar locations populares al iniciar
  const loadPopularLocations = async (page: number = 1) => {
    setLocationsLoading(true);
    setLocationsError(null);
    try {
      const response = await getPopularLocations(page, true);
      setLocations(response.results);
      setCurrentLocationPage(page);
    } catch (error) {
      console.error('Error loading popular locations:', error);
      setLocationsError('Error al cargar las ubicaciones populares');
    } finally {
      setLocationsLoading(false);
    }
  };

  // Cargar series populares al iniciar
  const loadPopularSeries = async (page: number = 1) => {
    setSeriesLoading(true);
    setSeriesError(null);
    try {
      const response = await getPopularSeries(page, true);
      setSeries(response.results);
      setCurrentSeriesPage(page);
    } catch (error) {
      console.error('Error loading popular series:', error);
      setSeriesError('Error al cargar las series populares');
    } finally {
      setSeriesLoading(false);
    }
  };

  // Funciones para navegación de películas
  const handleNextMoviePage = () => {
    loadPopularMovies(currentMoviePage + 1);
  };

  const handlePrevMoviePage = () => {
    if (currentMoviePage > 1) {
      loadPopularMovies(currentMoviePage - 1);
    }
  };

  // Funciones para navegación de personajes
  const handleNextCharacterPage = () => {
    loadPopularCharacters(currentCharacterPage + 1);
  };

  const handlePrevCharacterPage = () => {
    if (currentCharacterPage > 1) {
      loadPopularCharacters(currentCharacterPage - 1);
    }
  };

  // Funciones para navegación de locations
  const handleNextLocationPage = () => {
    loadPopularLocations(currentLocationPage + 1);
  };

  const handlePrevLocationPage = () => {
    if (currentLocationPage > 1) {
      loadPopularLocations(currentLocationPage - 1);
    }
  };

  // Funciones para navegación de series
  const handleNextSeriesPage = () => {
    loadPopularSeries(currentSeriesPage + 1);
  };

  const handlePrevSeriesPage = () => {
    if (currentSeriesPage > 1) {
      loadPopularSeries(currentSeriesPage - 1);
    }
  };

  const renderCarousel = () => (
    <div className="trending-carousel">
      <div className="carousel-container">
        {carouselLoading ? (
          <div className="carousel-loading">
            <p>Cargando películas...</p>
          </div>
        ) : (
          <div className="carousel-wrapper">
            {/* Flecha anterior */}
            <button 
              className="carousel-arrow carousel-arrow-prev"
              onClick={() => setCurrentSlide((prev) => prev === 0 ? carouselMovies.length - 1 : prev - 1)}
            >
              ‹
            </button>
            {/* Flecha siguiente */}
            <button 
              className="carousel-arrow carousel-arrow-next"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselMovies.length)}
            >
              ›
            </button>
            <div 
              className="carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {carouselMovies.map((movie, idx) => (
                <div
                  key={movie.id}
                  className="carousel-slide"
                  style={{ cursor: idx === currentSlide ? 'pointer' : 'default', pointerEvents: idx === currentSlide ? 'auto' : 'none' }}
                  onClick={idx === currentSlide ? () => { console.log('Clic en slide activo:', movie.title); setSelectedMovie(movie); } : undefined}
                >
                  <div className="slide-image">
                    <img 
                      src={movie.backdrop_path 
                        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
                        : `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                      } 
                      alt={movie.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getMovieFallback('large');
                      }}
                    />
                    <div className="slide-overlay">
                      <h3>{movie.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderComics = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Cómics Populares</h2>
        <p>Explora los cómics más populares de ComicVine</p>
      </div>
      
      {comicsLoading && (
        <div className="loading">
          <p>Cargando cómics...</p>
        </div>
      )}
      
      {comicsError && (
        <div className="error">
          <p>{comicsError}</p>
          <button onClick={loadPopularComics}>Reintentar</button>
        </div>
      )}
      
      {!comicsLoading && !comicsError && (
        <>
          <div className="comics-grid">
            {comics.slice((currentComicsPage-1)*12, (currentComicsPage-1)*12 + 12).map((comic) => (
              <div key={comic.id} className="comic-card" onClick={() => setSelectedComic(comic)}>
                <div className="comic-image">
                  <img 
                    src={getComicImageLocal(comic)} 
                    alt={comic.name}
                    style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 12px rgba(102,126,234,0.10)' }}
                    loading="lazy"
                  />
                </div>
                <div className="comic-info">
                  <h3 className="comic-title">{comic.name}</h3>
                  <p className="publisher">{comic.publisher?.name} • {comic.start_year}</p>
                  <p className="description">
                    {comic.description?.replace(/<[^>]*>/g, '').slice(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <button
              onClick={() => setCurrentComicsPage((prev: number) => prev + 1)}
              disabled={currentComicsPage * 12 >= comics.length}
              style={{
                padding: '12px 32px',
                background: currentComicsPage * 12 >= comics.length ? '#444' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: '#fff',
                border: 'none',
                borderRadius: 20,
                fontWeight: 600,
                fontSize: '1.1rem',
                cursor: currentComicsPage * 12 >= comics.length ? 'not-allowed' : 'pointer',
                opacity: currentComicsPage * 12 >= comics.length ? 0.5 : 1,
                transition: 'all 0.2s',
                boxShadow: '0 2px 12px rgba(102,126,234,0.10)'
              }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
  // Estado para paginación de cómics
  const [currentComicsPage, setCurrentComicsPage] = useState(1);
    </div>
  );

  const renderCharacters = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Personajes Populares</h2>
        <p>Conoce a los personajes más populares de ComicVine</p>
      </div>
      
      {charactersLoading && (
        <div className="loading">
          <p>Cargando personajes...</p>
        </div>
      )}
      
      {charactersError && (
        <div className="error">
          <p>{charactersError}</p>
          <button onClick={() => loadPopularCharacters(1)}>Reintentar</button>
        </div>
      )}
      
      {!charactersLoading && !charactersError && (
        <>
          <div className="characters-grid">
            {characters.slice(0, 12).map((character) => (
              <div key={character.id} className="character-card" onClick={() => setSelectedCharacter(character)}>
                <div className="character-image">
                  <img
                    src={getCharacterImageLocal(character)}
                    alt={character.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = getCharacterSpecificFallback(character.name); }}
                  />
                </div>
                <div className="character-info">
                  <h3 className="character-name">{character.name}</h3>
                  <p className="real-name">{character.real_name || 'Identidad secreta'}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Botones de paginación para personajes */}
          <div className="pagination-controls">
            <button 
              className="pagination-btn prev-btn"
              onClick={handlePrevCharacterPage}
              disabled={currentCharacterPage === 1}
            >
              ← Anterior
            </button>
            
            <span className="page-info">
              Página {currentCharacterPage}
            </span>
            
            <button 
              className="pagination-btn next-btn"
              onClick={handleNextCharacterPage}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderMovies = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Películas de Superhéroes</h2>
        <p>{isWikiMode && wikiSection === 'movies' ? 'Comprehensive database of comic book adaptations' : 'Descubre las mejores adaptaciones cinematográficas'}</p>
      </div>

      {moviesLoading && <div className="loading">Cargando películas...</div>}
      {moviesError && <div className="error">{moviesError}</div>}

      {!moviesLoading && !moviesError && (
        <>
          <div className={isWikiMode && wikiSection === 'movies' ? "movies-grid-wiki" : "movies-grid"}>
            {movies.slice(0, isWikiMode && wikiSection === 'movies' ? 12 : movies.length).map((movie) => (
              <div key={movie.id} className={isWikiMode && wikiSection === 'movies' ? "movie-card-wiki" : "movie-card"} onClick={() => setSelectedMovie(movie)}>
                <div className="movie-image">
                  <img 
                    src={getMovieImageLocal(movie)} 
                    alt={movie.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getMovieFallback('medium');
                    }}
                  />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="release-date">{new Date(movie.release_date).getFullYear()}</p>
                  {!(isWikiMode && wikiSection === 'movies') && (
                    <p className="description">{movie.overview?.slice(0, 100)}...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Botones de paginación para películas */}
          <div className="pagination-controls">
            <button 
              className="pagination-btn prev-btn"
              onClick={handlePrevMoviePage}
              disabled={currentMoviePage === 1}
            >
              ← Anterior
            </button>
            
            <span className="page-info">
              Página {currentMoviePage}
            </span>
            
            <button 
              className="pagination-btn next-btn"
              onClick={handleNextMoviePage}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderLocations = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Ubicaciones Icónicas</h2>
        <p>Explora los lugares más emblemáticos del universo de los cómics</p>
      </div>
      
      {locationsLoading && (
        <div className="loading">
          <p>Cargando ubicaciones...</p>
        </div>
      )}
      
      {locationsError && (
        <div className="error">
          <p>{locationsError}</p>
          <button onClick={() => loadPopularLocations(1)}>Reintentar</button>
        </div>
      )}
      
      {!locationsLoading && !locationsError && (
        <>
          <div className="locations-grid">
            {locations.slice(0, 12).map((location) => (
              <div key={location.id} className="location-card" onClick={() => setSelectedLocation(location)}>
                <div className="location-image">
                  <img 
                    src={getLocationImageLocal(location)} 
                    alt={location.name}
                  />
                </div>
                <div className="location-info">
                  <h3 className="location-name">{location.name}</h3>
                  <p className="location-publisher">{location.publisher?.name || 'Editorial desconocida'}</p>
                  <p className="location-description">
                    {location.description ? 
                      location.description.replace(/<[^>]*>/g, '').slice(0, 120) + '...' : 
                      'Descripción no disponible'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Botones de paginación para locations */}
          <div className="pagination-controls">
            <button 
              className="pagination-btn prev-btn"
              onClick={handlePrevLocationPage}
              disabled={currentLocationPage === 1}
            >
              ← Anterior
            </button>
            
            <span className="page-info">
              Página {currentLocationPage}
            </span>
            
            <button 
              className="pagination-btn next-btn"
              onClick={handleNextLocationPage}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderSeries = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Series Icónicas</h2>
        <p>Explora las series de cómics más emblemáticas e influyentes</p>
      </div>
      
      {seriesLoading && (
        <div className="loading">
          <p>Cargando series...</p>
        </div>
      )}
      
      {seriesError && (
        <div className="error">
          <p>{seriesError}</p>
          <button onClick={() => loadPopularSeries(1)}>Reintentar</button>
        </div>
      )}
      
      {!seriesLoading && !seriesError && (
        <>
          <div className="series-grid">
            {series.slice(0, 12).map((serie) => (
              <div key={serie.id} className="series-card" onClick={() => setSelectedSeries(serie)}>
                <div className="series-image">
                  <img 
                    src={getSeriesImageLocal(serie)} 
                    alt={serie.name}
                  />
                </div>
                <div className="series-info">
                  <h3 className="series-name">{serie.name}</h3>
                  <p className="series-publisher">{serie.publisher?.name || 'Editorial desconocida'}</p>
                  <p className="series-volumes">
                    {serie.count_of_volumes ? `${serie.count_of_volumes} volúmenes` : 'Volúmenes desconocidos'}
                    {serie.start_year && ` • Desde ${serie.start_year}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Botones de paginación para series */}
          <div className="pagination-controls">
            <button 
              className="pagination-btn prev-btn"
              onClick={handlePrevSeriesPage}
              disabled={currentSeriesPage === 1}
            >
              ← Anterior
            </button>
            
            <span className="page-info">
              Página {currentSeriesPage}
            </span>
            
            <button 
              className="pagination-btn next-btn"
              onClick={handleNextSeriesPage}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
  
  return (
    <div className="home-container">
      {/* Navbar estilo ComicVine */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 onClick={resetToHome} style={{ cursor: 'pointer' }}>
            Comic Vine
          </h1>
        </div>
        
        <div className="navbar-menu">
          {/* Dropdown Wiki */}
          <div className="nav-dropdown">
            <button 
              className="nav-item dropdown-trigger"
              onClick={() => setShowWikiDropdown(!showWikiDropdown)}
              onBlur={() => setTimeout(() => setShowWikiDropdown(false), 150)}
            >
              Wiki ▼
            </button>
            {showWikiDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleWikiSelect('characters')}>Characters</button>
                <button onClick={() => handleWikiSelect('movies')}>Movies</button>
                <button onClick={() => handleWikiSelect('locations')}>Locations</button>
                <button onClick={() => handleWikiSelect('teams')}>Teams</button>
                <button onClick={() => handleWikiSelect('series')}>Series</button>
              </div>
            )}
          </div>
          
          <button 
            className={`nav-item${showMagazine ? ' active' : ''}`}
            style={{ fontWeight: showMagazine ? 700 : undefined }}
            onClick={() => setShowMagazine((prev) => !prev)}
            title="Ver magazines destacados"
          >
            Magazines
          </button>
          <button 
            className="nav-item"
            style={{ opacity: 0.6, cursor: 'not-allowed' }}
            title="Esta sección está siendo configurada"
            disabled
          >
            Forums (fuera de servicio)
          </button>
          <button 
            className="nav-item"
            style={{ opacity: 0.6, cursor: 'not-allowed' }}
            title="Esta sección está siendo configurada"
            disabled
          >
            Community (fuera de servicio)
          </button>
        </div>
      </nav>

      {/* SECCIÓN DESTACADA DE TENDENCIAS SOLO EN INICIO/F5 */}
      {!isWikiMode && !showMagazine && (
        <div className="trending-section" style={{ margin: '32px 0 24px 0' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.6rem', marginBottom: 16, letterSpacing: 1 }}>Tendencias</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Magazines */}
            <div>
              <h3 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}>Magazines destacados</h3>
              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
                {getTopComics().map(comic => (
                  <div key={comic.id} className="trending-card" style={{ minWidth: 180, background: '#232946', borderRadius: 16, boxShadow: '0 2px 12px #764ba230', padding: 12, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setSelectedComic(comic)}>
                    <img src={getComicImageLocal(comic)} alt={comic.name} style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, textAlign: 'center' }}>{comic.name}</div>
                    <div style={{ color: '#aaa', fontSize: 13 }}>{comic.publisher?.name}</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 13 }}>★ {comic.rating?.average?.toFixed(1) ?? '-'}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Películas */}
            <div>
              <h3 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}>Películas populares</h3>
              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
                {getTopMovies().map(movie => (
                  <div key={movie.id} className="trending-card" style={{ minWidth: 180, background: '#232946', borderRadius: 16, boxShadow: '0 2px 12px #764ba230', padding: 12, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setSelectedMovie(movie)}>
                    <img src={getMovieImageLocal(movie)} alt={movie.title} style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, textAlign: 'center' }}>{movie.title}</div>
                    <div style={{ color: '#aaa', fontSize: 13 }}>{movie.release_date?.slice(0, 4)}</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 13 }}>★ {movie.vote_average?.toFixed(1) ?? '-'}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Héroes */}
            <div>
              <h3 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}>Héroes destacados</h3>
              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
                {getTopHeroes().map(hero => (
                  <div key={hero.id} className="trending-card" style={{ minWidth: 180, background: '#232946', borderRadius: 16, boxShadow: '0 2px 12px #764ba230', padding: 12, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setSelectedCharacter(hero)}>
                    <img src={getCharacterImageLocal(hero)} alt={hero.name} style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, textAlign: 'center' }}>{hero.name}</div>
                    <div style={{ color: '#aaa', fontSize: 13 }}>{hero.publisher?.name}</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 13 }}>★ {hero.rating?.average?.toFixed(1) ?? '-'}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Villanos */}
            <div>
              <h3 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}>Villanos icónicos</h3>
              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
                {getTopVillains().length === 0 ? (
                  <div style={{ color: '#fff', opacity: 0.7 }}>No hay villanos destacados en la base de datos.</div>
                ) : getTopVillains().map(villain => (
                  <div key={villain.id} className="trending-card" style={{ minWidth: 180, background: '#232946', borderRadius: 16, boxShadow: '0 2px 12px #764ba230', padding: 12, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => setSelectedCharacter(villain)}>
                    <img src={getCharacterImageLocal(villain)} alt={villain.name} style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, textAlign: 'center' }}>{villain.name}</div>
                    <div style={{ color: '#aaa', fontSize: 13 }}>{villain.publisher?.name}</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 13 }}>★ {villain.rating?.average?.toFixed(1) ?? '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido condicional: Wiki vs Home */}
      {isWikiMode ? (
        // Modo Wiki - Solo mostrar contenido específico
        <main className="wiki-content">
          {wikiSection === 'movies' && (
            <>
              {renderCarousel()}
              {renderMovies()}
            </>
          )}
          {wikiSection === 'characters' && renderCharacters()}
          {wikiSection === 'comics' && renderComics()}
          {wikiSection === 'locations' && renderLocations()}
          {wikiSection === 'series' && renderSeries()}
          {wikiSection === 'teams' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Wiki: Teams</h2>
                <p>Coming soon - Teams database</p>
              </div>
              <div className="coming-soon">
                <p>This section is under development</p>
              </div>
            </div>
          )}
        </main>
      ) : showMagazine ? (
        // Magazine Mode: magazines con paginación y buscador
        <div className="magazine-section">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 24px 0' }}>
            <input
              type="text"
              placeholder="Buscar magazine..."
              value={magazineSearch}
              onChange={e => setMagazineSearch(e.target.value)}
              style={{
                padding: '12px 24px',
                borderRadius: 20,
                border: 'none',
                fontSize: '1.1rem',
                width: 320,
                boxShadow: '0 2px 12px rgba(102,126,234,0.10)',
                outline: 'none',
                background: '#232946',
                color: '#fff',
                marginBottom: 0
              }}
            />
          </div>
          <div className="comics-grid magazine-grid">
            {(() => {
              const filtered = comics
                .filter(comic =>
                  magazineSearch.trim() === '' ||
                  comic.name.toLowerCase().includes(magazineSearch.trim().toLowerCase()) ||
                  (comic.publisher?.name && comic.publisher.name.toLowerCase().includes(magazineSearch.trim().toLowerCase()))
                );
              const magazinesPerPage = 12;
              const totalPages = Math.ceil(filtered.length / magazinesPerPage) || 1;
              const currentPage = Math.min(currentComicsPage, totalPages);
              const start = (currentPage - 1) * magazinesPerPage;
              const end = start + magazinesPerPage;
              return filtered.slice(start, end).map((comic) => (
                <div key={comic.id} className="comic-card" onClick={() => setSelectedComic(comic)}>
                  <div className="comic-image">
                    <img 
                      src={getComicImageLocal(comic)}
                      alt={comic.name}
                    />
                  </div>
                  <div className="comic-info">
                    <h3 className="comic-title">{comic.name}</h3>
                    <p className="comic-publisher">{comic.publisher?.name}</p>
                    <p className="comic-year">{comic.start_year}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
          {/* Paginación magazines */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            {(() => {
              const filtered = comics
                .filter(comic =>
                  magazineSearch.trim() === '' ||
                  comic.name.toLowerCase().includes(magazineSearch.trim().toLowerCase()) ||
                  (comic.publisher?.name && comic.publisher.name.toLowerCase().includes(magazineSearch.trim().toLowerCase()))
                );
              const magazinesPerPage = 12;
              const totalPages = Math.ceil(filtered.length / magazinesPerPage) || 1;
              const currentPage = Math.min(currentComicsPage, totalPages);
              return (
                <>
                  <button
                    onClick={() => setCurrentComicsPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '12px 32px',
                      background: currentPage === 1 ? '#444' : 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      opacity: currentPage === 1 ? 0.5 : 1,
                      marginRight: 16,
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 12px rgba(102,126,234,0.10)'
                    }}
                  >
                    Anterior
                  </button>
                  <span style={{ alignSelf: 'center', color: '#fff', fontWeight: 600, fontSize: '1.1rem', margin: '0 16px' }}>
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentComicsPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '12px 32px',
                      background: currentPage === totalPages ? '#444' : 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      opacity: currentPage === totalPages ? 0.5 : 1,
                      marginLeft: 16,
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 12px rgba(102,126,234,0.10)'
                    }}
                  >
                    Siguiente
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      ) : (
        // Modo Home - Sección de tendencias únicamente (featured-sections y grilla de cómics ocultos)
        <></>
      )}

      {selectedComic && (
        <ComicModal 
          comic={selectedComic}
          isOpen={!!selectedComic}
          onClose={() => setSelectedComic(null)} 
        />
      )}

      {selectedCharacter && (
        <CharacterModal 
          character={selectedCharacter}
          isOpen={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)} 
        />
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {selectedLocation && (
        <LocationModal 
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)} 
        />
      )}

      {selectedSeries && (
        <SeriesModal 
          series={selectedSeries}
          onClose={() => setSelectedSeries(null)} 
        />
      )}
    </div>
  );
};

export default Home;