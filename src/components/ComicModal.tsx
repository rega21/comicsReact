import React from 'react';
import { getComicFallback } from '../utils/imageUtils';
import type { Comic as ComicVineComic } from '../api/comicvine';

interface ComicModalProps {
  comic: ComicVineComic;
  isOpen: boolean;
  onClose: () => void;
}

const ComicModal: React.FC<ComicModalProps> = ({ comic, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <img
              src={comic.image?.screen_large_url || getComicFallback('large')}
              alt={comic.name}
              className="modal-comic-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getComicFallback('large');
              }}
            />
          </div>
          
          <div className="modal-info-section">
            <div className="modal-header">
              <h1 className="modal-title">{comic.name}</h1>
              <div className="modal-meta">
                <span className="modal-publisher">🏢 {comic.publisher?.name || 'Editorial desconocida'}</span>
                <span className="modal-year">📅 {comic.start_year || 'Año desconocido'}</span>
              </div>
            </div>
            
            <div className="modal-description">
              <h3>Descripción</h3>
              <p>{comic.description?.replace(/<[^>]*>/g, '') || 'Descripción no disponible'}</p>
            </div>

            <div className="modal-details">
              <h3>Detalles</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Editorial:</span>
                  <span className="detail-value">{comic.publisher?.name || 'Editorial desconocida'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Año de inicio:</span>
                  <span className="detail-value">{comic.start_year || 'Año desconocido'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Número de issues:</span>
                  <span className="detail-value">{comic.issue_count || 'No disponible'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicModal;
