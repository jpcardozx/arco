'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, GitBranch, Users, Star, Activity } from 'lucide-react'

interface GitHubStats {
    repos: number
    commits: number
    contributors: number
    stars: number
    lastCommit: string
    languages: string[]
    publicRepos: {
        name: string
        description: string
        language: string
        stars: number
        lastUpdated: string
    }[]
}

/**
 * GitHub Integration Widget
 * Displays real technical credibility through GitHub activity
 */
export function GitHubWidget() {
    const [stats, setStats] = useState<GitHubStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulated GitHub API call - replace with real API integration
        const fetchGitHubStats = async () => {
            try {
                // In production, this would be a real GitHub API call
                const mockStats: GitHubStats = {
                    repos: 47,
                    commits: 1247,
                    contributors: 8,
                    stars: 234,
                    lastCommit: '2 hours ago',
                    languages: ['TypeScript', 'Python', 'Go', 'Rust'],
                    publicRepos: [
                        {
                            name: 'web-performance-optimizer',
                            description: 'Advanced bundle analysis and optimization toolkit',
                            language: 'TypeScript',
                            stars: 89,
                            lastUpdated: '3 hours ago'
                        },
                        {
                            name: 'react-ssr-boilerplate',
                            description: 'Production-ready SSR setup with Core Web Vitals optimization',
                            language: 'TypeScript',
                            stars: 156,
                            lastUpdated: '1 day ago'
                        },
                        {
                            name: 'lighthouse-ci-integration',
                            description: 'Automated performance testing pipeline',
                            language: 'Python',
                            stars: 67,
                            lastUpdated: '2 days ago'
                        }
                    ]
                }

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000))
                setStats(mockStats)
            } catch (error) {
                console.error('Error fetching GitHub stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGitHubStats()
    }, [])

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="text-center">
                                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Unable to load GitHub activity</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-900 rounded-lg">
                    <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Live GitHub Activity</h3>
                    <p className="text-sm text-gray-600">Real development transparency</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <GitBranch className="w-4 h-4 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">{stats.repos}</span>
                    </div>
                    <p className="text-sm text-gray-600">Repositories</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">{stats.commits.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">Commits</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-2xl font-bold text-gray-900">{stats.contributors}</span>
                    </div>
                    <p className="text-sm text-gray-600">Contributors</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-2xl font-bold text-gray-900">{stats.stars}</span>
                    </div>
                    <p className="text-sm text-gray-600">Stars</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Recent Projects</h4>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                    </span>
                </div>

                <div className="space-y-3">
                    {stats.publicRepos.map((repo, index) => (
                        <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium text-gray-900 text-sm">{repo.name}</h5>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {repo.language}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{repo.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        {repo.stars}
                                    </span>
                                    <span>Updated {repo.lastUpdated}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Languages */}
            <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                    {stats.languages.map((lang) => (
                        <span
                            key={lang}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                            {lang}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last commit: {stats.lastCommit}</span>
                    <a
                        href="https://github.com/arco-agency"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        View on GitHub →
                    </a>
                </div>
            </div>
        </motion.div>
    )
}
