import React from 'react';
import type { Character as ComicVineCharacter } from '../api/comicvine';
import { getCharacterImageLocal } from '../utils/imageUtils';

interface CharacterModalProps {
  character: ComicVineCharacter;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="character-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-body">
          <div className="character-modal-image">
            <img
              src={getCharacterImageLocal(character)}
              alt={character.name}
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
              <div className="character-powers-modal">
                <h3>Poderes y Habilidades</h3>
                <div className="powers-grid">
                  {character.powers.map((power, index) => (
                    <span key={index} className="power-tag-modal">
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
