import React from 'react';
import type { Series } from '../api/comicvine';

interface SeriesModalProps {
  series: Series;
  onClose: () => void;
}

const SeriesModal: React.FC<SeriesModalProps> = ({ series, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content series-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-layout">
          <div className="modal-image-section">
            <img 
              src={series.image?.original_url || series.image?.medium_url || 'https://via.placeholder.com/600x400/333333/ffffff?text=Series'} 
              alt={series.name}
              className="modal-series-image"
            />
          </div>
          
          <div className="modal-info-section">
            <div className="modal-header">
              <h1 className="modal-title">{series.name}</h1>
              <div className="modal-meta">
                {series.publisher && (
                  <span className="modal-publisher">{series.publisher.name}</span>
                )}
                {series.start_year && (
                  <span className="modal-year">Desde {series.start_year}</span>
                )}
                {series.count_of_volumes && (
                  <span className="modal-volumes">{series.count_of_volumes} volúmenes</span>
                )}
                {series.count_of_issues && (
                  <span className="modal-issues">{series.count_of_issues} números</span>
                )}
              </div>
            </div>
            
            <div className="modal-description">
              <h3>Descripción</h3>
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: series.description || '<p>Descripción no disponible</p>' 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesModal;
