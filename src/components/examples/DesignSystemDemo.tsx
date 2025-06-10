/**
 * ARCO Design System - Component Examples
 * 
 * Demonstra o uso dos novos componentes primitivos e compostos
 * Implementa as melhores práticas de UI/UX e acessibilidade
 */

import React from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui'
import { ArrowRight, Star, Users, Zap } from 'lucide-react'

/**
 * Exemplo de uso do novo Design System
 * Demonstra componentes primitivos e compostos funcionando juntos
 */
export default function DesignSystemDemo() {
    return (
        <div className="space-y-8 p-8">
            {/* Seção de Buttons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-neutral-900">
                    Buttons - Primitivos UI
                </h2>

                <div className="flex flex-wrap gap-4">
                    <Button variant="default">
                        Primary Button
                    </Button>

                    <Button variant="secondary">
                        Secondary Button
                    </Button>

                    <Button variant="outline">
                        Outline Button
                    </Button>

                    <Button variant="ghost">
                        Ghost Button
                    </Button>

                    <Button variant="destructive">
                        Destructive Button
                    </Button>

                    <Button variant="link">
                        Link Button
                    </Button>
                </div>

                {/* Buttons com ícones */}
                <div className="flex flex-wrap gap-4">
                    <Button leftIcon={<ArrowRight className="h-4 w-4" />}>
                        Com Ícone Esquerda
                    </Button>

                    <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                        Com Ícone Direita
                    </Button>

                    <Button loading>
                        Loading State
                    </Button>

                    <Button size="sm">
                        Small
                    </Button>

                    <Button size="lg">
                        Large
                    </Button>

                    <Button size="icon" variant="outline">
                        <Star className="h-4 w-4" />
                    </Button>
                </div>
            </section>

            {/* Seção de Cards */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-neutral-900">
                    Cards - Componentes Compostos
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Card Default */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Design System</CardTitle>
                            <CardDescription>
                                Sistema de componentes consistente e acessível
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-neutral-600">
                                Implementação de componentes primitivos usando Radix UI
                                e design tokens para garantir consistência visual.
                            </p>
                        </CardContent>
                        <CardFooter align="between">
                            <span className="text-sm text-neutral-500">v1.0.0</span>
                            <Button size="sm" variant="outline">
                                Ver Mais
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Card Elevated */}
                    <Card variant="elevated" interactive>
                        <CardHeader>
                            <CardTitle as="h3">Performance</CardTitle>
                            <CardDescription>
                                Otimização de bundle e lazy loading
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <Zap className="h-4 w-4 text-primary-500" />
                                <span className="text-sm">Bundle &lt; 500KB</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <Users className="h-4 w-4 text-primary-500" />
                                <span className="text-sm">Tree Shaking</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                Analisar Performance
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Card Outlined */}
                    <Card variant="outlined">
                        <CardHeader prominent>
                            <CardTitle>Acessibilidade</CardTitle>
                            <CardDescription>
                                WCAG 2.1 AA Compliance
                            </CardDescription>
                        </CardHeader>
                        <CardContent noPadding>
                            <div className="p-6 pt-0">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center">
                                        ✅ Focus Management
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Keyboard Navigation
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Screen Reader Support
                                    </li>
                                    <li className="flex items-center">
                                        ✅ Color Contrast 4.5:1
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Seção de Demonstração de Tokens */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-neutral-900">
                    Design Tokens
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Colors */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Color System</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-primary-500 rounded"></div>
                                    <span className="text-sm">Primary 500</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-neutral-600 rounded"></div>
                                    <span className="text-sm">Neutral 600</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                    <span className="text-sm">Success</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Spacing */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Spacing Scale</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-4 bg-primary-200"></div>
                                    <span className="text-sm">2 (8px)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-primary-200"></div>
                                    <span className="text-sm">4 (16px)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-4 bg-primary-200"></div>
                                    <span className="text-sm">6 (24px)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-4 bg-primary-200"></div>
                                    <span className="text-sm">8 (32px)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
