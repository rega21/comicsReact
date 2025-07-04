import React from 'react';

interface FavoritesCounterProps {
  count: number;
  onClick: () => void;
}

const FavoritesCounter: React.FC<FavoritesCounterProps> = ({ count, onClick }) => {
  return (
    <button className="favorites-counter" onClick={onClick}>
      <div className="counter-icon">
        <span className="heart-icon">❤️</span>
        {count > 0 && (
          <span className="counter-badge">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
      <span className="counter-text">Mis Favoritos</span>
    </button>
  );
};

export default FavoritesCounter;
