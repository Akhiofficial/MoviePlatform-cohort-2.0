/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth, api } from './AuthContext';

const UserActivityContext = createContext();

export const UserActivityProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user data when they log in
    useEffect(() => {
        if (user) {
            fetchUserActivity();
        } else {
            setFavorites([]);
            setHistory([]);
        }
    }, [user]);

    const fetchUserActivity = async () => {
        try {
            setLoading(true);
            const [favRes, histRes] = await Promise.all([
                api.get('/favorites'),
                api.get('/history')
            ]);
            setFavorites(favRes.data.favorites || []);
            setHistory(histRes.data.history || []);
        } catch (error) {
            console.error('Error fetching user activity:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- FAVORITES ---
    const addFavorite = async (movie) => {
        try {
            const res = await api.post('/favorites', {
                movieId: movie.movieId || movie.id?.toString(),
                title: movie.title || movie.name,
                poster: movie.poster || movie.poster_path
            });
            // Update local state without refetching everything
            setFavorites(prev => [...prev, res.data.favorite]);
            return true;
        } catch (error) {
            console.error('Error adding favorite:', error);
            return false;
        }
    };

    const removeFavorite = async (movieId) => {
        try {
            await api.delete(`/favorites/${movieId}`);
            setFavorites(prev => prev.filter(f => f.movieId !== movieId?.toString()));
            return true;
        } catch (error) {
            console.error('Error removing favorite:', error);
            return false;
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some(f => f.movieId === movieId?.toString());
    };

    const toggleFavorite = async (movie) => {
        const id = movie.movieId || movie.id?.toString();
        if (isFavorite(id)) {
            return await removeFavorite(id);
        } else {
            return await addFavorite(movie);
        }
    };

    // --- HISTORY ---
    const addToHistory = async (movie) => {
        if (!user) return; // Only track logged in users
        try {
            await api.post('/history', {
                movieId: movie.id?.toString(),
                title: movie.title || movie.name,
                poster: movie.poster_path
            });
            // Refresh history to get the new sorted order/timestamps
            const histRes = await api.get('/history');
            setHistory(histRes.data.history || []);
        } catch (error) {
            console.error('Error adding to history:', error);
        }
    };

    return (
        <UserActivityContext.Provider value={{
            favorites,
            history,
            loading,
            toggleFavorite,
            isFavorite,
            addToHistory
        }}>
            {children}
        </UserActivityContext.Provider>
    );
};

export const useUserActivity = () => useContext(UserActivityContext);
