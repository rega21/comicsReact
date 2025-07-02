import React, { useState, useEffect } from 'react';
import type { TMDBMovie, TMDBMovieDetails } from '../api/tmdb-example';
import { getTMDBMovieDetails } from '../api/tmdb-example';
import { getMovieFallback } from '../utils/imageUtils';

interface MovieModalProps {
  movie: TMDBMovie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<TMDBMovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      loadMovieDetails();
    }
  }, [isOpen, movie]);

  const loadMovieDetails = async () => {
    setLoading(true);
    try {
      const details = await getTMDBMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (error) {
      console.error('Error loading movie details:', error);
      // Si falla, usar los datos básicos
      setMovieDetails(movie);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const displayMovie = movieDetails || movie;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content movie-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
          <div className="modal-header">
          <div className="modal-image-container">
            <div className="modal-image">
              <img
                src={displayMovie.poster_path 
                  ? `https://image.tmdb.org/t/p/w342${displayMovie.poster_path}` 
                  : getMovieFallback('large')
                }
                alt={displayMovie.title}
                style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getMovieFallback('large');
                }}
              />
            </div>
            {displayMovie.vote_average > 0 && (
              <div className="modal-rating">
                <span className="rating-stars">★</span>
                <span className="rating-value">{displayMovie.vote_average.toFixed(1)}/10</span>
              </div>
            )}
          </div>
          
          <div className="modal-info">
            <h1 className="modal-title">{displayMovie.title}</h1>
            
            {displayMovie.release_date && (
              <div className="modal-meta">
                <strong>Año:</strong> {new Date(displayMovie.release_date).getFullYear()}
              </div>
            )}

            {movieDetails?.runtime && (
              <div className="modal-meta">
                <strong>Duración:</strong> {movieDetails.runtime} minutos
              </div>
            )}

            {movieDetails?.genres && movieDetails.genres.length > 0 && (
              <div className="modal-meta">
                <strong>Géneros:</strong> {movieDetails.genres.map(g => g.name).join(', ')}
              </div>
            )}

            {movieDetails?.directors && movieDetails.directors.length > 0 && (
              <div className="modal-meta">
                <strong>Dirección:</strong> {movieDetails.directors.map(d => d.name).join(', ')}
              </div>
            )}

            {movieDetails?.cast && movieDetails.cast.length > 0 && (
              <div className="modal-meta">
                <strong>Reparto:</strong> {movieDetails.cast.slice(0, 3).map(actor => actor.name).join(', ')}
                {movieDetails.cast.length > 3 && '...'}
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-body">
          {loading && (
            <div className="modal-loading">
              <p>Cargando detalles...</p>
            </div>
          )}

          {displayMovie.overview && (
            <div className="modal-overview">
              <p>{displayMovie.overview}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
