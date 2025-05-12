"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
    lowQualitySrc?: string;
    id?: string;
    containerClassName?: string;
    priority?: boolean;
    transitionDuration?: number;
    transitionType?: 'fade' | 'zoom' | 'slide';
}

export default function EnhancedImage({
    src,
    alt,
    lowQualitySrc,
    width,
    height,
    className = '',
    containerClassName = '',
    id,
    priority = false,
    transitionDuration = 0.5,
    transitionType = 'fade',
    ...props
}: EnhancedImageProps) {
    const [isLoaded, setIsLoaded] = useState(priority);
    const [isHovered, setIsHovered] = useState(false);

    // Create transition variants based on type
    let variants = {
        initial: {},
        animate: {},
        exit: {}
    };

    switch (transitionType) {
        case 'fade':
            variants = {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
            };
            break;
        case 'zoom':
            variants = {
                initial: { opacity: 0, scale: 1.05 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 }
            };
            break;
        case 'slide':
            variants = {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 }
            };
            break;
    }

    return (
        <div
            className={`relative overflow-hidden ${containerClassName}`}
            id={id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {lowQualitySrc && !isLoaded && (
                <img
                    src={lowQualitySrc}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover blur-md opacity-70 transition-opacity ${className}`}
                    style={{ filter: "blur(10px)" }}
                    aria-hidden="true"
                />
            )}

            <AnimatePresence>
                <motion.div
                    key={String(src)}
                    initial="initial"
                    animate={isLoaded ? "animate" : "initial"}
                    exit="exit"
                    variants={variants}
                    transition={{ duration: transitionDuration }}
                    className="w-full h-full"
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className={className}
                        onLoad={() => setIsLoaded(true)}
                        priority={priority}
                        {...props}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Optional hover effect */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
