/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create contexts
const AuthContext = createContext();

// Configure default axios for our backend
export const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : '/api',
    withCredentials: true, // Needed to attach cookies
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Runs once on load to see if they have an active session cookie
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get('/auth/me');
                setUser(res.data.user);
            } catch {
                // Not logged in or expired
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMe();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        setUser(res.data.user);
        return res.data;
    };

    const register = async (name, email, password) => {
        // According to our backend auth controller we need "fullname"
        const res = await api.post('/auth/register', { fullname: name, email, password });
        setUser(res.data.user);
        return res.data;
    };

    const logout = async () => {
        try {
            await api.delete('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
        }
    };

    const updateProfile = async (data) => {
        const res = await api.put('/auth/profile', data);
        setUser(res.data.user);
        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
