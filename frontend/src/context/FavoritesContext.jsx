import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    // Initialize state from LocalStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            const localData = localStorage.getItem('favorites');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing favorites from local storage", error);
            return [];
        }
    });

    // Sync to LocalStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (item) => {
        setFavorites(prev => {
            // Prevent duplicates
            if (prev.find(fav => fav.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
    };

    const toggleFavorite = (item) => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
