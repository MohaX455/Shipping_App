'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import * as authService from '@/services/auth.client'
import { RegisterUserInput } from '@/types/auth.type'

type AuthUser = {
    id: string
    email: string
    first_name: string
}

type AuthContextType = {
    user: AuthUser | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (data: RegisterUserInput) => Promise<void>
    requestPasswordReset: (email: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const loadUser = async () => {

            try {

                const data = await authService.getCurrentUser()

                if (data?.user) {
                    setUser(data.user)
                }

            } catch { }

            setLoading(false)

        }

        loadUser()

    }, [])

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            const data = await authService.login(email, password)
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    const signup = async (data: RegisterUserInput) => {
        setLoading(true)
        try {
            const res = await authService.signup(data)
            if (res.user) {
                setUser(res.user)
            }
        } finally {
            setLoading(false)
        }
    }

    const requestPasswordReset = async (email: string) => {
        setLoading(true)
        try {
            await authService.requestPasswordReset(email)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await authService.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{ user, login, signup, requestPasswordReset, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context

}