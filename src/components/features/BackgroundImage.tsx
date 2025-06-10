import Image from 'next/image';

import React from "react";

interface BackgroundImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  overlay?: boolean;
  pattern?: 'grid' | 'dots' | 'noise';
  patternOpacity?: number;
  gradient?: {
    from: string;
    to: string;
    direction?: 'to-t' | 'to-b' | 'to-r' | 'to-l' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  };
}

export default function BackgroundImage({
  src,
  alt,
  priority = false,
  className = '',
  overlay = false,
  pattern,
  patternOpacity = 0.03,
  gradient,
}: BackgroundImageProps) {
  // Pattern configurations
  const patterns = {
    grid: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
    noise: `url('/texture2-bg.png')`,
  };

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={85}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLz0vLS0vLi0tLS0uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3/2wBDARUXFxoeGh8YGBgtICAmLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />

      {/* Pattern overlay */}
      {pattern && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: patterns[pattern],
            backgroundSize: pattern === 'noise' ? 'cover' : '40px 40px',
            opacity: patternOpacity,
          }}
        />
      )}

      {/* Gradient overlay */}
      {gradient && (
        <div
          className={`absolute inset-0 bg-gradient-${gradient.direction || 'to-b'}`}
          style={{
            background: `linear-gradient(${gradient.direction?.replace('to-', 'to ') || 'to bottom'}, ${gradient.from}, ${gradient.to})`,
          }}
        />
      )}

      {/* Dark overlay */}
      {overlay && <div className="absolute inset-0 bg-black/50" />}
    </div>
  );
}
