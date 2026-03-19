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

  // Igual que el modal de cómic: backdrop y stopPropagation
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content movie-modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-header" style={{ display: 'flex', gap: 32 }}>
          <div className="modal-image-container" style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <div className="modal-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'flex-start' }}>
            <h1 className="modal-title" style={{ fontSize: '2.1rem', fontWeight: 700, color: '#f5c518', marginBottom: 8 }}>{displayMovie.title}</h1>
            {displayMovie.release_date && (
              <div className="modal-meta" style={{ fontSize: '1.1rem', color: '#e0e0e0' }}><strong style={{ color: '#f5c518' }}>Año:</strong> {new Date(displayMovie.release_date).getFullYear()}</div>
            )}
            {movieDetails?.runtime && (
              <div className="modal-meta" style={{ fontSize: '1.1rem', color: '#e0e0e0' }}><strong style={{ color: '#f5c518' }}>Duración:</strong> {movieDetails.runtime} minutos</div>
            )}
            {movieDetails?.genres && movieDetails.genres.length > 0 && (
              <div className="modal-meta" style={{ fontSize: '1.1rem', color: '#e0e0e0' }}><strong style={{ color: '#f5c518' }}>Géneros:</strong> {movieDetails.genres.map(g => g.name).join(', ')}</div>
            )}
            {movieDetails?.directors && movieDetails.directors.length > 0 && (
              <div className="modal-meta" style={{ fontSize: '1.1rem', color: '#e0e0e0' }}><strong style={{ color: '#f5c518' }}>Dirección:</strong> {movieDetails.directors.map(d => d.name).join(', ')}</div>
            )}
            {movieDetails?.cast && movieDetails.cast.length > 0 && (
              <div className="modal-meta" style={{ fontSize: '1.1rem', color: '#e0e0e0' }}><strong style={{ color: '#f5c518' }}>Reparto:</strong> {movieDetails.cast.slice(0, 5).map(actor => actor.name).join(', ')}{movieDetails.cast.length > 5 && '...'}</div>
            )}
            {displayMovie.overview && (
              <div className="modal-description" style={{ marginTop: 12, fontSize: '1.13rem', color: '#fff', lineHeight: 1.6, fontWeight: 400, background: 'rgba(102,126,234,0.10)', borderRadius: 12, padding: '16px 18px' }}>
                <strong style={{ color: '#764ba2', fontSize: '1.15rem', fontWeight: 600 }}>Descripción:</strong>
                <span style={{ display: 'block', marginTop: 6 }}>{displayMovie.overview}</span>
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
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
