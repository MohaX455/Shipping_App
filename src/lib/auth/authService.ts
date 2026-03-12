/**
 * Auth Service - Centralized authentication logic
 * Inspired by Old_Frontend approach but modernized
 * Handles token management, user state, and API communication
 * Production-level implementation with security best practices
 */

import { showToast } from '@/lib/toast/toast';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role?: 'sender' | 'traveler' | 'admin';
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export interface AuthError {
    code: string;
    message: string;
}

class AuthService {
    private baseUrl: string;

    constructor() {
        // Use backend base URL from migration inventory
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jetcamer.com/social-shipping/api';
    }

    /**
     * Login user with email and password
     * Backend expects 'username' field, not 'email'
     * @throws AuthError on failure
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/auth/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (!response.ok) {
                let errorMessage = 'Login failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = `HTTP ${response.status}: Login failed`;
                }
                throw {
                    code: 'LOGIN_FAILED',
                    message: errorMessage,
                } as AuthError;
            }

            const data: any = await response.json();

            // Extract from nested response structure (Old_Frontend uses final_data)
            const token = data.token || data.final_data?.token;
            const user = data.final_data?.users || data.user;

            if (!token || !user) {
                throw {
                    code: 'LOGIN_INVALID_RESPONSE',
                    message: 'Invalid response from server',
                } as AuthError;
            }

            const normalizedUser: AuthUser = {
                id: user.id || user._id,
                name: user.name || user.username || user.first_name,
                email: user.email,
                role: user.role,
            };

            this.setToken(token);
            this.setUser(normalizedUser);
            // Persist full auth state if backend returns a larger structure
            try {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authState', JSON.stringify(data));
                }
            } catch {}

            return { token, user: normalizedUser };
        } catch (error) {
            if (error instanceof Error && 'code' in error) {
                throw error; // Already AuthError
            }
            if (error instanceof Error) {
                throw {
                    code: 'LOGIN_ERROR',
                    message: error.message || 'Login failed',
                } as AuthError;
            }
            throw {
                code: 'LOGIN_ERROR',
                message: 'An unexpected error occurred',
            } as AuthError;
        }
    }

    /**
     * Register new user
     * @throws AuthError on failure
     */
    async signup(userData: {
        name: string;
        email: string;
        mobile: string;
        address?: string;
        gender?: string;
        password: string;
    }): Promise<AuthResponse> {
        try {
            // Prepare payload matching Old_Frontend structure
            const payload = {
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile,
                address: userData.address || '',
                gender: userData.gender || '',
                password: userData.password,
            };

            const response = await fetch(`${this.baseUrl}/auth/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = 'Registration failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = `HTTP ${response.status}: Registration failed`;
                }
                throw {
                    code: 'SIGNUP_FAILED',
                    message: errorMessage,
                } as AuthError;
            }

            const data: any = await response.json();

            const token = data.token || data.final_data?.token;
            const user = data.final_data?.users || data.user;

            if (!token || !user) {
                throw {
                    code: 'SIGNUP_INVALID_RESPONSE',
                    message: 'Invalid response from server',
                } as AuthError;
            }

            const normalizedUser: AuthUser = {
                id: user.id || user._id,
                name: user.name || user.username,
                email: user.email,
                role: user.role,
            };

            this.setToken(token);
            this.setUser(normalizedUser);

            return { token, user: normalizedUser };
        } catch (error) {
            if (error instanceof Error && 'code' in error) {
                throw error;
            }
            if (error instanceof Error) {
                throw {
                    code: 'SIGNUP_ERROR',
                    message: error.message || 'Registration failed',
                } as AuthError;
            }
            throw {
                code: 'SIGNUP_ERROR',
                message: 'An unexpected error occurred',
            } as AuthError;
        }
    }

    /**
     * Request password reset
     * @throws AuthError on failure
     */
    async requestPasswordReset(email: string): Promise<{ success: boolean }> {
        try {
            const response = await fetch(`${this.baseUrl}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-API-Key': 'a0482b-1f6c-466f-bdd6-3782639ed3da',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                let errorMessage = 'Password reset request failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = `HTTP ${response.status}: Password reset failed`;
                }
                throw {
                    code: 'RESET_FAILED',
                    message: errorMessage,
                } as AuthError;
            }

            return { success: true };
        } catch (error) {
            if (error instanceof Error && 'code' in error) {
                throw error;
            }
            if (error instanceof Error) {
                throw {
                    code: 'RESET_ERROR',
                    message: error.message || 'Password reset failed',
                } as AuthError;
            }
            throw {
                code: 'RESET_ERROR',
                message: 'An unexpected error occurred',
            } as AuthError;
        }
    }

    /**
     * Logout user - clear tokens and user data
     */
    logout(): void {
        this.clearToken();
        this.clearUser();
        this.notifyLogout();
    }

    /**
     * Get current token
     */
    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }

    /**
     * Set authentication token
     */
    private setToken(token: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    /**
     * Clear token
     */
    private clearToken(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    /**
     * Get current user data
     */
    getUser(): AuthUser | null {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem(AUTH_USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    /**
     * Set user data
     */
    private setUser(user: AuthUser): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }

    /**
     * Clear user data
     */
    private clearUser(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_USER_KEY);
    }

    /**
     * Check if authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken() && !!this.getUser();
    }

    /**
     * Notify backend of logout
     */
    private async notifyLogout(): Promise<void> {
        try {
            await fetch(`${this.baseUrl}/auth/users/logout`, {
                method: 'POST',
            });
        } catch {
            console.debug('Logout notification failed');
        }
    }
}

// Export singleton
export const authService = new AuthService();
