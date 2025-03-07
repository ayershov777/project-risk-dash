import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if the user is already logged in by making a request to the backend
        const checkAuthStatus = async () => {
            try {
                setLoading(true);
                const response = await api.get('/auth/current-user');
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.log('Not authenticated');
                setUser(null);
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await api.post('/auth/login', { email, password });
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log in');
            throw err;
        }
    };

    const signup = async (userData) => {
        try {
            setError(null);
            const response = await api.post('/auth/signup', userData);
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
            // Force logout client-side even if server request fails
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        signup,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
