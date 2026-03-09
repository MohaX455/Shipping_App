'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, AuthUser, AuthError } from '@/lib/auth/authService';

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: AuthError | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: {
        name: string;
        email: string;
        mobile: string;
        address?: string;
        gender?: string;
        password: string;
    }) => Promise<void>;
    requestPasswordReset: (email: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);

    // Initialize auth state on mount
    useEffect(() => {
        const initializeAuth = () => {
            const storedUser = authService.getUser();
            const token = authService.getToken();

            if (token && storedUser) {
                setUser(storedUser);
            } else {
                // Clear any inconsistent state
                authService.logout();
                setUser(null);
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            setUser(response.user);
            // Notify other parts of the app that a login occurred
            if (typeof window !== 'undefined') {
                try {
                    window.dispatchEvent(new CustomEvent('app:logged_in'));
                } catch { }
            }
        } catch (err) {
            const authError = err as AuthError;
            setError(authError);
            throw authError;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (userData: {
        name: string;
        email: string;
        mobile: string;
        address?: string;
        gender?: string;
        password: string;
    }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.signup(userData);
            setUser(response.user);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError);
            throw authError;
        } finally {
            setIsLoading(false);
        }
    };

    const requestPasswordReset = async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.requestPasswordReset(email);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError);
            throw authError;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setError(null);
    };

    const clearError = () => {
        setError(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        requestPasswordReset,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * Must be used within AuthProvider
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
