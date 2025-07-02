import React, { useState } from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se propague al card
    setIsAnimating(true);
    onToggle();
    
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? 'favorite-active' : ''} ${isAnimating ? 'favorite-animating' : ''}`}
      onClick={handleClick}
      aria-label={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
    >
      <div className="heart-container">
        <div className="heart-icon">
          {isFavorite ? '❤️' : '🤍'}
        </div>
        {isAnimating && (
          <div className="heart-particles">
            <span className="particle particle-1">💫</span>
            <span className="particle particle-2">✨</span>
            <span className="particle particle-3">⭐</span>
            <span className="particle particle-4">💖</span>
          </div>
        )}
      </div>
      <span className="favorite-text">
        {isFavorite ? 'En Favoritos' : 'Agregar a Favoritos'}
      </span>
    </button>
  );
};

export default FavoriteButton;
