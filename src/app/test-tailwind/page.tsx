import React from 'react';

export default function TailwindDiagnosticTest() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Tailwind CSS v4 Diagnostic Test</h1>

                {/* Basic Color Test */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Basic Color Test</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-red-500 text-white p-4 rounded-lg text-center">
                            Red 500
                        </div>
                        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                            Blue 500
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-lg text-center">
                            Green 500
                        </div>
                        <div className="bg-purple-500 text-white p-4 rounded-lg text-center">
                            Purple 500
                        </div>
                    </div>
                </div>

                {/* Custom Theme Variables Test */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Custom Theme Variables</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Test Card 1 */}
                        <div className="bg-card text-card-foreground p-6 rounded-lg shadow border border-border">
                            <h3 className="text-xl font-semibold mb-2">Card Styling</h3>
                            <p className="text-muted-foreground">This card uses bg-card and text-card-foreground variables.</p>
                        </div>

                        {/* Test Card 2 */}
                        <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Primary Styling</h3>
                            <p>This card uses bg-primary and text-primary-foreground variables.</p>
                        </div>

                        {/* Test Card 3 */}
                        <div className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Secondary Styling</h3>
                            <p>This card uses bg-secondary and text-secondary-foreground variables.</p>
                        </div>

                        {/* Test Card 4 */}
                        <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Accent Styling</h3>
                            <p>This card uses bg-accent and text-accent-foreground variables.</p>
                        </div>

                        {/* Test Card 5 */}
                        <div className="bg-muted text-muted-foreground p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Muted Styling</h3>
                            <p>This card uses bg-muted and text-muted-foreground variables.</p>
                        </div>

                        {/* Test Card 6 */}
                        <div className="bg-destructive text-destructive-foreground p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">Destructive Styling</h3>
                            <p>This card uses bg-destructive and text-destructive-foreground variables.</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Elements Test */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Interactive Elements</h2>
                    <div className="flex gap-4 flex-wrap">
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition-colors">
                            Hover Test (Blue)
                        </button>
                        <button className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                            Border Test
                        </button>
                        <button className="px-4 py-2 focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md border border-border">
                            Focus Ring Test (click me)
                        </button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-opacity">
                            Primary Button
                        </button>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    ✅ If you can see styled colors and proper spacing, Tailwind CSS v4 is working correctly!
                </div>
            </div>
        </div>
    );
}
