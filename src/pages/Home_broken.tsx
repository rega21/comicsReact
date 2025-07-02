import React, { useState, useEffect } from 'react';
import ComicModal from '../components/ComicModal';
import CharacterModal from '../components/CharacterModal';
import MovieModal from '../components/MovieModal';
import { getMovieFallback, getSmartCharacterFallback } from '../utils/imageUtils';

// Importar TMDB para películas
import { getPopularSuperheroMovies, type TMDBMovie } from '../api/tmdb-example';

// Importar ComicVine para cómics y personajes  
import { 
  getPopularComics, 
  getPopularCharacters, 
  type Comic as ComicVineComic, 
  type Character as ComicVineCharacter 
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
  
  // Estados para películas (TMDB)
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);
  
  // Estados para navbar
  const [searchQuery, setSearchQuery] = useState('');
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
    setSearchQuery('');
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

  const loadPopularCharacters = async () => {
    setCharactersLoading(true);
    setCharactersError(null);
    try {
      const response = await getPopularCharacters(1, true);
      setCharacters(response.results);
    } catch (error) {
      console.error('Error loading popular characters:', error);
      setCharactersError('Error al cargar los personajes populares');
    } finally {
      setCharactersLoading(false);
    }
  };

  // Cargar películas populares al iniciar
  const loadPopularMovies = async () => {
    setMoviesLoading(true);
    setMoviesError(null);
    try {
      const response = await getPopularSuperheroMovies(1);
      setMovies(response.results);
    } catch (error) {
      console.error('Error loading popular movies:', error);
      setMoviesError('Error al cargar las películas populares');
    } finally {
      setMoviesLoading(false);
    }
  };

  // Función para manejar búsqueda global
  const handleGlobalSearch = async () => {
    if (!searchQuery.trim()) return;
    
    console.log('🔍 Búsqueda global:', searchQuery);
    // Aquí se implementará la búsqueda global cuando esté lista
    // Por ahora mantener la pestaña actual
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
          <button onClick={loadPopularCharacters}>Reintentar</button>
        </div>
      )}
      
      {!charactersLoading && !charactersError && (
        <div className="characters-grid">
          {characters.map((character) => (
            <div key={character.id} className="character-card" onClick={() => setSelectedCharacter(character)}>
              <div className="character-image">
                <img 
                  src={character.image?.medium_url || getSmartCharacterFallback(character, 'medium')} 
                  alt={character.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getSmartCharacterFallback(character, 'medium');
                  }}
                />
              </div>
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <p className="real-name">{character.real_name || 'Identidad secreta'}</p>
                <p className="description">
                  {character.description?.replace(/<[^>]*>/g, '').slice(0, 150)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMovies = () => {
    console.log('🎬 Renderizando Movies - isWikiMode:', isWikiMode, 'wikiSection:', wikiSection);
    
    return (
      <div className="content-section">
        <div className="section-header">
          <h2>{isWikiMode && wikiSection === 'movies' ? 'Wiki: Comic Movies' : 'Películas de Superhéroes'}</h2>
          <p>{isWikiMode && wikiSection === 'movies' ? 'Comprehensive database of comic book adaptations' : 'Descubre las mejores adaptaciones cinematográficas'}</p>
        </div>

        {moviesLoading && <div className="loading">Cargando películas...</div>}
        {moviesError && <div className="error">{moviesError}</div>}

        {!moviesLoading && !moviesError && (
          <>
            {isWikiMode && wikiSection === 'movies' ? (
              // Modo Wiki - Grid tradicional
              <div className="movies-grid">
                <h3 style={{color: 'red'}}>MODO WIKI - GRID TRADICIONAL</h3>
                {movies.slice(0, 12).map((movie) => (
                  <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}>
                    <div className="movie-image">
                      <img 
                        src={movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
                          : getMovieFallback('medium')
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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Modo Home - Estilo Netflix
              <div className="netflix-movies-container">
                <h3 style={{color: 'lime'}}>MODO HOME - ESTILO NETFLIX</h3>
                {/* Trending Movies */}
                <div className="netflix-section">
                  <h3 className="netflix-section-title">Trending Now</h3>
                  <div className="netflix-carousel">
                    {movies.slice(0, 6).map((movie) => (
                    <div key={movie.id} className="netflix-card" onClick={() => setSelectedMovie(movie)}>
                      <div className="netflix-card-image">
                        <img 
                          src={movie.backdrop_path 
                            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                            : (movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : getMovieFallback('large')
                              )
                          } 
                          alt={movie.title}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getMovieFallback('large');
                          }}
                        />
                        <div className="netflix-overlay">
                          <div className="netflix-overlay-info">
                            <h4>{movie.title}</h4>
                            <div className="netflix-meta">
                              <span className="year">{new Date(movie.release_date).getFullYear()}</span>
                              <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="netflix-actions">
                              <button className="netflix-play-btn">▶ Play</button>
                              <button className="netflix-info-btn">ⓘ More Info</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Movies */}
              <div className="netflix-section">
                <h3 className="netflix-section-title">Popular Superhero Movies</h3>
                <div className="netflix-carousel">
                  {movies.slice(6, 12).map((movie) => (
                    <div key={movie.id} className="netflix-card" onClick={() => setSelectedMovie(movie)}>
                      <div className="netflix-card-image">
                        <img 
                          src={movie.backdrop_path 
                            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                            : (movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : getMovieFallback('large')
                              )
                          } 
                          alt={movie.title}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getMovieFallback('large');
                          }}
                        />
                        <div className="netflix-overlay">
                          <div className="netflix-overlay-info">
                            <h4>{movie.title}</h4>
                            <div className="netflix-meta">
                              <span className="year">{new Date(movie.release_date).getFullYear()}</span>
                              <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="netflix-actions">
                              <button className="netflix-play-btn">▶ Play</button>
                              <button className="netflix-info-btn">ⓘ More Info</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Added */}
              <div className="netflix-section">
                <h3 className="netflix-section-title">Recently Added</h3>
                <div className="netflix-carousel">
                  {movies.slice(12, 18).map((movie) => (
                    <div key={movie.id} className="netflix-card" onClick={() => setSelectedMovie(movie)}>
                      <div className="netflix-card-image">
                        <img 
                          src={movie.backdrop_path 
                            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                            : (movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : getMovieFallback('large')
                              )
                          } 
                          alt={movie.title}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getMovieFallback('large');
                          }}
                        />
                        <div className="netflix-overlay">
                          <div className="netflix-overlay-info">
                            <h4>{movie.title}</h4>
                            <div className="netflix-meta">
                              <span className="year">{new Date(movie.release_date).getFullYear()}</span>
                              <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="netflix-actions">
                              <button className="netflix-play-btn">▶ Play</button>
                              <button className="netflix-info-btn">ⓘ More Info</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for comics, characters, movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch()}
              className="search-input"
            />
            <button 
              onClick={handleGlobalSearch}
              className="search-button"
            >
              🔍
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido condicional: Wiki vs Home */}
      {isWikiMode ? (
        // Modo Wiki - Solo mostrar contenido específico
        <main className="wiki-content">
          {wikiSection === 'movies' && renderMovies()}
          {wikiSection === 'characters' && renderCharacters()}
          {wikiSection === 'comics' && renderComics()}
          {(wikiSection === 'locations' || wikiSection === 'teams' || wikiSection === 'series') && (
            <div className="content-section">
              <div className="section-header">
                <h2>Wiki: {wikiSection.charAt(0).toUpperCase() + wikiSection.slice(1)}</h2>
                <p>Coming soon - {wikiSection} database</p>
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
                        src={character.image?.small_url || getSmartCharacterFallback(character, 'small')} 
                        alt={character.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getSmartCharacterFallback(character, 'small');
                        }}
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
                        src={character.image?.small_url || getSmartCharacterFallback(character, 'small')} 
                        alt={character.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getSmartCharacterFallback(character, 'small');
                        }}
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
    </div>
  );
};

export default Home;