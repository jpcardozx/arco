'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User,
    Lock,
    Mail,
    Eye,
    EyeOff,
    Crown,
    Zap,
    Shield,
    BarChart3,
    Settings,
    LogOut,
    CheckCircle,
    X
} from 'lucide-react'
import { useAuth, UserTier } from '../../contexts/AuthContext'

interface AdvancedAuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AdvancedAuthModal({ isOpen, onClose }: AdvancedAuthModalProps) {
    const { login, user, logout, upgrade, isAuthenticated } = useAuth()
    const [mode, setMode] = useState<'login' | 'dashboard' | 'upgrade'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const success = await login(email, password)
            if (success) {
                setMode('dashboard')
            } else {
                setError('Invalid credentials')
            }
        } catch (err) {
            setError('Login failed')
        } finally {
            setLoading(false)
        }
    }

    const handleUpgrade = async (tier: UserTier) => {
        setLoading(true)
        try {
            const success = await upgrade(tier)
            if (success) {
                setMode('dashboard')
            }
        } catch (err) {
            setError('Upgrade failed')
        } finally {
            setLoading(false)
        }
    }

    const getTierIcon = (tier: UserTier) => {
        switch (tier) {
            case 'enterprise': return <Crown className="w-5 h-5 text-yellow-400" />
            case 'premium': return <Zap className="w-5 h-5 text-blue-400" />
            default: return <Shield className="w-5 h-5 text-slate-400" />
        }
    }

    const getTierColor = (tier: UserTier) => {
        switch (tier) {
            case 'enterprise': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
            case 'premium': return 'from-blue-500/20 to-purple-500/20 border-blue-500/30'
            default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
        }
    }

    const renderLogin = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Access Technical Intelligence</h2>
                <p className="text-slate-300">Advanced analytics and competitive intelligence platform</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                        <div className="text-red-400 text-sm">{error}</div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Authenticating
                        </>
                    ) : (
                        <>
                            <User className="w-4 h-4" />
                            Sign In
                        </>
                    )}
                </button>
            </form>

            <div className="border-t border-slate-600 pt-6">
                <div className="text-center text-sm text-slate-400 mb-4">
                    Demo Access Available
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                        onClick={() => {
                            setEmail('demo@arco.dev')
                            setPassword('free')
                        }}
                        className="p-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-center transition-colors"
                    >
                        <div className="text-white font-medium">Free Tier</div>
                        <div className="text-xs text-slate-400">Basic features</div>
                    </button>
                    <button
                        onClick={() => {
                            setEmail('demo@arco.dev')
                            setPassword('premium')
                        }}
                        className="p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-center transition-colors"
                    >
                        <div className="text-blue-400 font-medium">Premium</div>
                        <div className="text-xs text-blue-300">Advanced analytics</div>
                    </button>
                    <button
                        onClick={() => {
                            setEmail('demo@arco.dev')
                            setPassword('enterprise')
                        }}
                        className="p-3 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg text-center transition-colors"
                    >
                        <div className="text-yellow-400 font-medium">Enterprise</div>
                        <div className="text-xs text-yellow-300">Full access</div>
                    </button>
                </div>
            </div>
        </div>
    )

    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {getTierIcon(user!.tier)}
                    <div>
                        <h2 className="text-xl font-bold text-white">{user!.name}</h2>
                        <p className="text-slate-300 capitalize">{user!.tier} Plan</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            {/* Account Overview */}
            <div className={`bg-gradient-to-r ${getTierColor(user!.tier)} rounded-lg p-6 border`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div className="text-2xl font-bold text-white">
                            {user!.maxApiCalls === -1 ? '∞' : user!.maxApiCalls - user!.apiCalls}
                        </div>
                        <div className="text-sm text-slate-300">API Calls Remaining</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{user!.features.length}</div>
                        <div className="text-sm text-slate-300">Features Available</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">
                            {new Date(user!.joinDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-slate-300">Member Since</div>
                    </div>
                </div>
            </div>

            {/* Features Access */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Available Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user!.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-white text-sm capitalize">{feature.replace(/_/g, ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upgrade Options */}
            {user!.tier !== 'enterprise' && (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Upgrade Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user!.tier === 'free' && (
                            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="w-5 h-5 text-blue-400" />
                                    <span className="font-semibold text-blue-400">Premium Plan</span>
                                </div>
                                <ul className="text-sm text-blue-300 space-y-1 mb-4">
                                    <li>• Advanced analytics</li>
                                    <li>• Competitor intelligence</li>
                                    <li>• 1,000 API calls/month</li>
                                    <li>• Export reports</li>
                                </ul>
                                <button
                                    onClick={() => handleUpgrade('premium')}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
                                >
                                    Upgrade to Premium
                                </button>
                            </div>
                        )}

                        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <span className="font-semibold text-yellow-400">Enterprise Plan</span>
                            </div>
                            <ul className="text-sm text-yellow-300 space-y-1 mb-4">
                                <li>• Unlimited API calls</li>
                                <li>• Real-time monitoring</li>
                                <li>• Custom integrations</li>
                                <li>• Priority support</li>
                                <li>• White-label options</li>
                            </ul>
                            <button
                                onClick={() => handleUpgrade('enterprise')}
                                className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded transition-colors"
                            >
                                Upgrade to Enterprise
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-blue-400" />
                                <span className="font-semibold text-white">ARCO Intelligence</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {isAuthenticated ? renderDashboard() : renderLogin()}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
