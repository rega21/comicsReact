import React from 'react';
import { getCharacterFallback } from '../utils/imageUtils';
import type { Character as ComicVineCharacter } from '../api/comicvine';

interface CharacterModalProps {
  character: ComicVineCharacter;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="character-modal">
        <div className="modal-header">
          <h2>{character.name}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="character-modal-image">
            <img
              src={character.image?.screen_large_url || getCharacterFallback('large')}
              alt={character.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getCharacterFallback('large');
              }}
            />
          </div>

          <div className="character-modal-info">
            <div className="character-basic-info">
              <h3>Información Básica</h3>
              <div className="info-row">
                <span className="info-label">Nombre Real:</span>
                <span className="info-value">{character.real_name || 'Identidad secreta'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Editorial:</span>
                <span className="info-value publisher-badge">{character.publisher?.name || 'Editorial desconocida'}</span>
              </div>
            </div>

            <div className="character-description">
              <h3>Descripción</h3>
              <p>{character.description?.replace(/<[^>]*>/g, '') || 'Descripción no disponible'}</p>
            </div>

            {character.powers && character.powers.length > 0 && (
              <div className="character-powers">
                <h3>Poderes y Habilidades</h3>
                <div className="powers-grid">
                  {character.powers.map((power, index) => (
                    <span key={index} className="power-badge">
                      {power}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
