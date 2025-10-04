/**
 * ARCO About Section
 * About/Methodology section with breadcrumb and image
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface AboutSectionProps {
  breadcrumb?: {
    items: Array<{ label: string; href?: string }>;
  };
  title?: string;
  author?: {
    team: string;
    date: string;
    readTime: string;
  };
  shareTitle?: string;
  image?: string;
}

export function AboutSection({
  breadcrumb = {
    items: [
      { label: 'Início', href: '/' },
      { label: 'Metodologia', href: '/metodologia' }
    ]
  },
  title = "Operação para prestadores locais",
  author = {
    team: "Equipe ARCO",
    date: "Jan 2024",
    readTime: "5 min leitura"
  },
  shareTitle = "Compartilhar",
  image = "https://placehold.co/780x450"
}: AboutSectionProps) {
  
  const socialShareButtons = [
    { name: 'LinkedIn', href: '#', icon: '🔗' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Facebook', href: '#', icon: '👥' },
    { name: 'WhatsApp', href: '#', icon: '💬' }
  ];

  return (
    <section className="self-stretch px-16 py-28 bg-Color-Scheme-2-Background flex flex-col justify-start items-center gap-20 overflow-hidden">
      <div className="w-full max-w-[1280px] flex flex-col justify-start items-start gap-20">
        <div className="self-stretch inline-flex justify-start items-start gap-20">
          
          {/* Content Side */}
          <div className="w-96 self-stretch inline-flex flex-col justify-between items-start">
            <div className="self-stretch flex flex-col justify-start items-start gap-8">
              
              {/* Breadcrumb */}
              <nav className="inline-flex justify-start items-center gap-2" aria-label="Breadcrumb">
                {breadcrumb.items.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-center text-Color-Scheme-2-Text text-base font-normal font-['Barlow'] leading-normal hover:opacity-80 transition-opacity"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-center text-Color-Scheme-2-Text text-base font-normal font-['Barlow'] leading-normal">
                        {item.label}
                      </span>
                    )}
                    {index < breadcrumb.items.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-Color-Scheme-2-Text" />
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Title */}
              <h1 className="self-stretch text-Color-Scheme-2-Text text-5xl font-normal font-['Arsenal_SC'] uppercase leading-[52px]">
                {title}
              </h1>
            </div>

            {/* Author & Share Section */}
            <div className="self-stretch flex flex-col justify-start items-start gap-8">
              
              {/* Author Info */}
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="inline-flex justify-start items-start gap-1">
                  <span className="text-Color-Scheme-2-Text text-base font-normal font-['Barlow'] leading-normal">
                    Por
                  </span>
                  <span className="text-Color-Scheme-2-Text text-base font-semibold font-['Barlow'] leading-normal">
                    {author.team}
                  </span>
                </div>
                <div className="inline-flex justify-start items-center gap-2">
                  <span className="text-Color-Scheme-2-Text text-sm font-normal font-['Barlow'] leading-tight">
                    {author.date}
                  </span>
                  <span className="text-Color-Scheme-2-Text text-lg font-normal font-['Barlow'] leading-relaxed">
                    •
                  </span>
                  <span className="text-Color-Scheme-2-Text text-sm font-normal font-['Barlow'] leading-tight">
                    {author.readTime}
                  </span>
                </div>
              </div>

              {/* Share Section */}
              <div className="flex flex-col justify-start items-start gap-4">
                <h3 className="text-Color-Scheme-2-Text text-base font-semibold font-['Barlow'] leading-normal">
                  {shareTitle}
                </h3>
                <div className="inline-flex justify-start items-start gap-2">
                  {socialShareButtons.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="p-1 bg-Color-Scheme-2-Foreground rounded-[64px] inline-flex flex-col justify-center items-center overflow-hidden hover:bg-Color-Scheme-2-Foreground/80 transition-colors"
                      aria-label={`Share on ${social.name}`}
                    >
                      <div className="w-6 h-6 relative flex items-center justify-center">
                        <span className="text-xs">{social.icon}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="flex-1 h-96 rounded-2xl relative overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}