import React, { useState, useEffect } from 'react';
import ComicModal from '../components/ComicModal';
import CharacterModal from '../components/CharacterModal';
import MovieModal from '../components/MovieModal';
import LocationModal from '../components/LocationModal';
import SeriesModal from '../components/SeriesModal';
import { getMovieFallback } from '../utils/imageUtils';

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

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comics' | 'characters' | 'movies'>('comics');
  const [selectedComic, setSelectedComic] = useState<ComicVineComic | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<ComicVineCharacter | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  
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
    setActiveTab('comics');
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
    
    // Cambiar a la pestaña correspondiente
    if (section === 'characters') {
      setActiveTab('characters');
    } else if (section === 'movies') {
      setActiveTab('movies');
    } else {
      setActiveTab('comics'); // Para locations, teams, series por ahora van a comics
    }
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
      const response = await getPopularComics(20);
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
              {carouselMovies.map((movie) => (
                <div key={movie.id} className="carousel-slide" onClick={() => setSelectedMovie(movie)}>
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
                      <div className="slide-actions">
                        <button 
                          className="view-details-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMovie(movie);
                          }}
                        >
                          Ver Detalles
                        </button>
                      </div>
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
        <div className="comics-grid">
          {comics.map((comic) => (
            <div key={comic.id} className="comic-card" onClick={() => setSelectedComic(comic)}>
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
      )}
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
                    src={character.image?.medium_url || 'https://via.placeholder.com/400x600/663399/ffffff?text=Character'} 
                    alt={character.name}
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
                    src={movie.backdrop_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                      : (movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : getMovieFallback('medium')
                        )
                    } 
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
                    src={location.image?.medium_url || 'https://via.placeholder.com/400x300/333333/ffffff?text=Location'} 
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
                    src={serie.image?.medium_url || 'https://via.placeholder.com/400x300/333333/ffffff?text=Series'} 
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
            className="nav-item"
            onClick={() => setActiveTab('comics')}
          >
            New Comics
          </button>
          <button 
            className="nav-item"
            onClick={() => window.open('#', '_self')}
          >
            Forums
          </button>
          <button 
            className="nav-item"
            onClick={() => window.open('#', '_self')}
          >
            Community
          </button>
        </div>
      </nav>

      {/* Contenido condicional: Wiki vs Home */}
      {isWikiMode ? (
        // Modo Wiki - Solo mostrar contenido específico
        <main className="wiki-content">
          {wikiSection === 'movies' && renderMovies()}
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
      ) : (
        // Modo Home - Mostrar carousel + secciones + contenido por tabs
        <>
          {renderCarousel()}

          {/* Featured sections after carousel */}
          <div className="featured-sections">
            {/* New Comic Releases */}
            <section className="horizontal-section">
              <h2>New Comic Releases</h2>
              <div className="horizontal-cards">
                {comics.slice(0, 6).map((comic) => (
                  <div key={comic.id} className="horizontal-card" onClick={() => setSelectedComic(comic)}>
                    <div className="horizontal-card-content">
                      <h4>{comic.name}</h4>
                      <p>{comic.publisher?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Characters */}
            <section className="horizontal-section">
              <h2>Popular Characters</h2>
              <div className="horizontal-cards">
                {characters.slice(0, 6).map((character) => (
                  <div key={character.id} className="horizontal-card" onClick={() => setSelectedCharacter(character)}>
                    <div className="horizontal-card-image">
                      <img 
                        src={character.image?.small_url || 'https://via.placeholder.com/200x300/663399/ffffff?text=Character'} 
                        alt={character.name}
                      />
                    </div>
                    <div className="horizontal-card-content">
                      <h4>{character.name}</h4>
                      <p>{character.real_name || 'Secret Identity'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Rated Comics */}
            <section className="horizontal-section">
              <h2>Top Rated Comics</h2>
              <div className="horizontal-cards">
                {comics.slice(6, 12).map((comic) => (
                  <div key={comic.id} className="horizontal-card" onClick={() => setSelectedComic(comic)}>
                    <div className="horizontal-card-content">
                      <h4>{comic.name}</h4>
                      <p>{comic.start_year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Marvel vs DC */}
            <section className="horizontal-section">
              <h2>Marvel vs DC</h2>
              <div className="horizontal-cards">
                {characters.filter(char => 
                  char.publisher?.name?.toLowerCase().includes('marvel') || 
                  char.publisher?.name?.toLowerCase().includes('dc')
                ).slice(0, 6).map((character) => (
                  <div key={character.id} className="horizontal-card" onClick={() => setSelectedCharacter(character)}>
                    <div className="horizontal-card-image">
                      <img 
                        src={character.image?.small_url || 'https://via.placeholder.com/200x300/663399/ffffff?text=Character'} 
                        alt={character.name}
                      />
                    </div>
                    <div className="horizontal-card-content">
                      <h4>{character.name}</h4>
                      <p>{character.publisher?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Tabs Navigation */}
          <div className="tabs-navigation">
            <button 
              className={`tab ${activeTab === 'comics' ? 'active' : ''}`}
              onClick={() => setActiveTab('comics')}
            >
              Comics
            </button>
            <button 
              className={`tab ${activeTab === 'characters' ? 'active' : ''}`}
              onClick={() => setActiveTab('characters')}
            >
              Characters
            </button>
            <button 
              className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveTab('movies')}
            >
              Movies
            </button>
          </div>

          <main className="main-content">
            {activeTab === 'comics' && renderComics()}
            {activeTab === 'characters' && renderCharacters()}
            {activeTab === 'movies' && renderMovies()}
          </main>
        </>
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