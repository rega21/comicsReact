import React from 'react';
import type { Location } from '../api/comicvine';

interface LocationModalProps {
  location: Location;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content location-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-layout">
          <div className="modal-image-section">
            <img 
              src={location.image?.original_url || location.image?.medium_url || 'https://via.placeholder.com/600x400/333333/ffffff?text=Location'} 
              alt={location.name}
              className="modal-location-image"
            />
          </div>
          
          <div className="modal-info-section">
            <div className="modal-header">
              <h1 className="modal-title">{location.name}</h1>
              <div className="modal-meta">
                {location.publisher && (
                  <span className="modal-publisher">{location.publisher.name}</span>
                )}
                {location.first_appeared_in_issue && (
                  <span className="modal-first-appearance">
                    Primera aparición: {location.first_appeared_in_issue.name || 'Edición desconocida'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="modal-description">
              <h3>Descripción</h3>
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: location.description || '<p>Descripción no disponible</p>' 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
