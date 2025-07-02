import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  type: 'comic' | 'character' | 'movie';
  data: any;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('comics-app-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comics-app-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.find(fav => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== itemId));
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(fav => fav.id === itemId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  };
};
