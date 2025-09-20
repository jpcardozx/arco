'use client';

import React from 'react';
import { Container } from './primitives';
import { Typography } from './primitives';
import { Grid, GridItem } from './layout/Grid';
import { Card } from './primitives';
import { Button } from './primitives';
import { Badge } from './primitives';

export function HomePageClient() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
                <Container size="xl" padding="lg">
                    <div className="text-center space-y-6">
                        <Badge variant="outline" className="border-white/20 text-white">
                            ✨ New Layout System
                        </Badge>
                        <Typography variant="h1" className="text-4xl md:text-6xl font-bold">
                            ARCO Design System
                        </Typography>
                        <Typography variant="lead" className="text-xl text-white/90 max-w-2xl mx-auto">
                            Professional web development with S-Tier components, layout system, and modern architecture
                        </Typography>
                        <div className="flex gap-4 justify-center">
                            <Button size="lg" variant="secondary">
                                View Components
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                Documentation
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <Container size="xl" padding="lg">
                    <div className="text-center space-y-6 mb-16">
                        <Typography variant="h2" className="text-3xl md:text-4xl font-bold">
                            Built for Performance
                        </Typography>
                        <Typography variant="lead" className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Every component is optimized for speed, accessibility, and developer experience
                        </Typography>
                    </div>

                    <Grid cols={3} gap="lg" responsive={{ sm: 1, md: 2, lg: 3 }}>
                        <GridItem>
                            <Card padding="lg" className="h-full">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 dark:text-blue-400 text-xl">⚡</span>
                                    </div>
                                    <Typography variant="h4" className="font-semibold">
                                        Lightning Fast
                                    </Typography>
                                    <Typography variant="body" className="text-neutral-600 dark:text-neutral-400">
                                        Optimized components with minimal bundle size and maximum performance
                                    </Typography>
                                </div>
                            </Card>
                        </GridItem>

                        <GridItem>
                            <Card padding="lg" className="h-full">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600 dark:text-green-400 text-xl">♿</span>
                                    </div>
                                    <Typography variant="h4" className="font-semibold">
                                        Accessible
                                    </Typography>
                                    <Typography variant="body" className="text-neutral-600 dark:text-neutral-400">
                                        WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
                                    </Typography>
                                </div>
                            </Card>
                        </GridItem>

                        <GridItem>
                            <Card padding="lg" className="h-full">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600 dark:text-purple-400 text-xl">🎨</span>
                                    </div>
                                    <Typography variant="h4" className="font-semibold">
                                        Design System
                                    </Typography>
                                    <Typography variant="body" className="text-neutral-600 dark:text-neutral-400">
                                        Consistent tokens, primitives, and components for scalable design
                                    </Typography>
                                </div>
                            </Card>
                        </GridItem>
                    </Grid>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="bg-neutral-50 dark:bg-neutral-900 py-20">
                <Container size="xl" padding="lg">
                    <Grid cols={4} gap="lg" responsive={{ sm: 2, md: 4 }}>
                        <GridItem>
                            <div className="text-center space-y-2">
                                <Typography variant="metric" className="text-3xl font-bold text-blue-600">
                                    20+
                                </Typography>
                                <Typography variant="label" className="text-neutral-600 dark:text-neutral-400">
                                    Components
                                </Typography>
                            </div>
                        </GridItem>
                        <GridItem>
                            <div className="text-center space-y-2">
                                <Typography variant="metric" className="text-3xl font-bold text-green-600">
                                    0
                                </Typography>
                                <Typography variant="label" className="text-neutral-600 dark:text-neutral-400">
                                    TypeScript Errors
                                </Typography>
                            </div>
                        </GridItem>
                        <GridItem>
                            <div className="text-center space-y-2">
                                <Typography variant="metric" className="text-3xl font-bold text-purple-600">
                                    100%
                                </Typography>
                                <Typography variant="label" className="text-neutral-600 dark:text-neutral-400">
                                    Accessible
                                </Typography>
                            </div>
                        </GridItem>
                        <GridItem>
                            <div className="text-center space-y-2">
                                <Typography variant="metric" className="text-3xl font-bold text-orange-600">
                                    S-Tier
                                </Typography>
                                <Typography variant="label" className="text-neutral-600 dark:text-neutral-400">
                                    Performance
                                </Typography>
                            </div>
                        </GridItem>
                    </Grid>
                </Container>
            </section>
        </>
    );
}
