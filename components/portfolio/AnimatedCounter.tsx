"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export default function AnimatedCounter({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    decimals = 0
}: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    useEffect(() => {
        if (isInView) {
            let startTimestamp: number;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                const easedProgress = easeOutQuart(progress);

                setCount(easedProgress * end);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };

            window.requestAnimationFrame(step);
        }
    }, [isInView, end, duration]);

    const formattedCount = decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toString();

    return (
        <span ref={ref} className="inline-block font-bold">
            {prefix}
            {formattedCount}
            {suffix}
        </span>
    );
}

// Specialized metric display component
export function ImpactMetric({
    value,
    label,
    prefix = '',
    suffix = '',
    highlight = false
}: {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    highlight?: boolean;
}) {
    return (
        <div className={`portfolio-metric-card ${highlight ? 'border-blue-500' : ''}`}>
            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-3xl font-bold ${highlight ? 'text-blue-500' : 'text-neutral-800 dark:text-white'}`}>
                <AnimatedCounter
                    end={value}
                    prefix={prefix}
                    suffix={suffix}
                />
            </p>
        </div>
    );
}
