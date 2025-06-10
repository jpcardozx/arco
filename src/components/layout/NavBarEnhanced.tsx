'use client';

import React from "react";

export default function NavBarEnhanced() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-2xl font-bold">ARCO</div>
                <div className="hidden md:flex space-x-8">
                    <a href="#" className="font-medium hover:text-blue-600 transition-colors">Home</a>
                    <a href="#process" className="font-medium hover:text-blue-600 transition-colors">Process</a>
                    <a href="#case-studies" className="font-medium hover:text-blue-600 transition-colors">Cases</a>
                    <a href="#contact" className="font-medium hover:text-blue-600 transition-colors">Contact</a>
                </div>
                <button className="md:hidden">
                    <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
                    <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
                    <span className="block w-6 h-0.5 bg-gray-800"></span>
                </button>
            </div>
        </nav>
    );
}
