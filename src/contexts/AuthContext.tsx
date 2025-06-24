'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserTier = 'free' | 'premium' | 'enterprise'

export interface User {
    id: string
    email: string
    name: string
    tier: UserTier
    features: string[]
    apiCalls: number
    maxApiCalls: number
    joinDate: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    upgrade: (tier: UserTier) => Promise<boolean>
    checkFeatureAccess: (feature: string) => boolean
    getRemainingApiCalls: () => number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Feature matrix by tier
const TIER_FEATURES = {
    free: [
        'basic_analysis',
        'public_reports'
    ],
    premium: [
        'basic_analysis',
        'public_reports',
        'advanced_analytics',
        'competitor_intelligence',
        'export_reports',
        'api_access_limited'
    ],
    enterprise: [
        'basic_analysis',
        'public_reports',
        'advanced_analytics',
        'competitor_intelligence',
        'export_reports',
        'api_access_unlimited',
        'real_time_monitoring',
        'custom_integrations',
        'white_label',
        'priority_support',
        'custom_analysis'
    ]
}

const API_LIMITS = {
    free: 10,
    premium: 1000,
    enterprise: -1 // unlimited
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check for existing session on mount
        const savedUser = localStorage.getItem('arco_user')
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser)
                setUser(userData)
                setIsAuthenticated(true)
            } catch (error) {
                localStorage.removeItem('arco_user')
            }
        }
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call - in production, this would be a real authentication endpoint
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                const userData = await response.json()

                // Create user object with tier-based features
                const user: User = {
                    ...userData,
                    features: TIER_FEATURES[userData.tier as UserTier] || TIER_FEATURES.free,
                    maxApiCalls: API_LIMITS[userData.tier as UserTier] || API_LIMITS.free
                }

                setUser(user)
                setIsAuthenticated(true)
                localStorage.setItem('arco_user', JSON.stringify(user))
                return true
            }

            return false
        } catch (error) {
            // Demo login for development
            if (email === 'demo@arco.dev') {
                const demoUser: User = {
                    id: 'demo-user',
                    email: 'demo@arco.dev',
                    name: 'Demo User',
                    tier: password === 'enterprise' ? 'enterprise' : password === 'premium' ? 'premium' : 'free',
                    features: TIER_FEATURES[password as UserTier] || TIER_FEATURES.free,
                    apiCalls: 0,
                    maxApiCalls: API_LIMITS[password as UserTier] || API_LIMITS.free,
                    joinDate: new Date().toISOString()
                }

                setUser(demoUser)
                setIsAuthenticated(true)
                localStorage.setItem('arco_user', JSON.stringify(demoUser))
                return true
            }

            return false
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('arco_user')
    }

    const upgrade = async (tier: UserTier): Promise<boolean> => {
        if (!user) return false

        try {
            // Simulate upgrade API call
            const response = await fetch('/api/user/upgrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({ tier }),
            })

            if (response.ok) {
                const updatedUser: User = {
                    ...user,
                    tier,
                    features: TIER_FEATURES[tier],
                    maxApiCalls: API_LIMITS[tier]
                }

                setUser(updatedUser)
                localStorage.setItem('arco_user', JSON.stringify(updatedUser))
                return true
            }

            return false
        } catch (error) {
            // Demo upgrade
            const updatedUser: User = {
                ...user,
                tier,
                features: TIER_FEATURES[tier],
                maxApiCalls: API_LIMITS[tier]
            }

            setUser(updatedUser)
            localStorage.setItem('arco_user', JSON.stringify(updatedUser))
            return true
        }
    }

    const checkFeatureAccess = (feature: string): boolean => {
        if (!user) return false
        return user.features.includes(feature)
    }

    const getRemainingApiCalls = (): number => {
        if (!user) return 0
        if (user.maxApiCalls === -1) return -1 // unlimited
        return Math.max(0, user.maxApiCalls - user.apiCalls)
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            upgrade,
            checkFeatureAccess,
            getRemainingApiCalls
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// Hook for feature gating
export function useFeatureAccess(feature: string) {
    const { checkFeatureAccess, user } = useAuth()
    return {
        hasAccess: checkFeatureAccess(feature),
        userTier: user?.tier || 'free',
        requiresUpgrade: !checkFeatureAccess(feature)
    }
}
