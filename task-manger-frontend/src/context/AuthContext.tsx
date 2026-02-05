import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

interface User {
    id: string;
    email: string;
    fullName: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, fullName: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signup = async (email: string, fullName: string, password: string) => {
        await api.post('/auth/signup', { email, fullName, password });
        // Automatically log in after signup
        await login(email, password);
    };

    const login = async (email: string, password: string) => {
        const response = await api.post('/auth/signin', { email, password });
        const { access_token, user: userData } = response.data;

        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
