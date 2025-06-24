'use client'

import React from 'react'

export function TailwindTest() {
    return (
        <div className="mt-8 p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-4">
            <h2 className="text-xl font-medium text-black">Tailwind Test Component</h2>

            {/* Basic styling test */}
            <div className="bg-blue-500 text-white p-4 rounded-lg">
                Basic blue box with white text
            </div>

            {/* Flex and spacing test */}
            <div className="flex space-x-4 items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500"></div>
                <div className="text-gray-700">Flex layout test</div>
            </div>

            {/* Responsive test */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-200 p-2 rounded">Column 1</div>
                <div className="bg-green-200 p-2 rounded">Column 2</div>
            </div>

            {/* Hover effects */}
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Hover me
            </button>
        </div>
    )
}
