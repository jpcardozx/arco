/**
 * ARCO Footer Section
 * Complete footer with CTA, navigation, and social links
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const ArcoLogo = () => (
  <div className="w-20 h-9 relative overflow-hidden">
    <div className="w-16 h-9 left-[6.67px] top-0 absolute overflow-hidden">
      <div className="w-5 h-4 left-[50.82px] top-[10.87px] absolute bg-Color-Neutral-Darkest" />
      <div className="w-5 h-6 left-[34.33px] top-[11.32px] absolute bg-Color-Neutral-Darkest" />
      <div className="w-5 h-4 left-[18.55px] top-[10.87px] absolute bg-Color-Neutral-Darkest" />
      <div className="w-5 h-4 left-0 top-[10.24px] absolute bg-Color-Neutral-Darkest" />
      <div className="w-4 h-2.5 left-[1.15px] top-0 absolute bg-Color-Neutral-Darkest" />
    </div>
  </div>
);

const footerNavigation: FooterSection[] = [
  {
    title: 'Navegação',
    links: [
      { label: 'Início', href: '/' },
      { label: 'Metodologia', href: '/metodologia' },
      { label: 'Planos', href: '/planos' },
      { label: 'Casos', href: '/casos' },
      { label: 'Casa', href: '/casa' }
    ]
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Auto', href: '/auto' },
      { label: 'Contato', href: '/contato' },
      { label: 'Privacidade', href: '/privacidade' },
      { label: 'Termos', href: '/termos' },
      { label: 'FAQ', href: '/faq' }
    ]
  }
];

const teamMembers = [
  'https://placehold.co/48x48',
  'https://placehold.co/48x48',
  'https://placehold.co/48x48',
  'https://placehold.co/48x48',
  'https://placehold.co/48x48'
];

const socialIcons = [
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'YouTube', href: '#' }
];

export function FooterSection() {
  return (
    <footer className="self-stretch px-16 py-20 bg-Color-Scheme-2-Background flex flex-col justify-start items-center gap-20 overflow-hidden">
      <div className="w-full max-w-[1280px] flex flex-col justify-start items-start gap-20">
        
        {/* Main Footer Content */}
        <div className="self-stretch inline-flex justify-between items-start">
          
          {/* CTA Section */}
          <div className="flex-1 max-w-[560px] inline-flex flex-col justify-start items-start gap-8">
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <h2 className="self-stretch text-Color-Scheme-2-Text text-7xl font-normal font-['Arsenal_SC'] uppercase leading-[72px]">
                Transforme sua operação local
              </h2>
              <p className="self-stretch text-Color-Scheme-2-Text text-base font-normal font-['Barlow'] leading-normal">
                Resultados mensuráveis e estratégia personalizada para seu negócio.
              </p>
            </div>
            
            {/* Footer CTAs */}
            <div className="inline-flex justify-start items-start gap-4">
              <Button
                size="lg"
                className="px-3 py-1.5 bg-Color-Manz rounded-[100px] text-Color-Neutral-Darkest text-base font-medium font-['Barlow'] leading-normal hover:bg-Color-Manz/90"
                asChild
              >
                <Link href="/contato">Contato</Link>
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="px-3 py-1.5 bg-Opacity-Neutral-Darkest-5/5 rounded-[100px] text-Color-Neutral-Darkest text-base font-medium font-['Barlow'] leading-normal"
                asChild
              >
                <Link href="/metodologia">Saiba mais</Link>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 max-w-96 flex justify-start items-start gap-8 overflow-hidden">
            {footerNavigation.map((section) => (
              <nav key={section.title} className="flex-1 inline-flex flex-col justify-start items-start">
                {section.links.map((link) => (
                  <div key={link.label} className="self-stretch py-2 inline-flex justify-start items-start">
                    <Link
                      href={link.href}
                      className="flex-1 text-Color-Scheme-2-Text text-sm font-semibold font-['Barlow'] leading-tight hover:opacity-80 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="self-stretch flex flex-col justify-start items-start gap-8">
          
          {/* Logo and Team */}
          <div className="self-stretch inline-flex justify-between items-center">
            <ArcoLogo />
            
            {/* Team Avatars */}
            <div className="flex justify-start items-center -space-x-2">
              {teamMembers.map((avatar, index) => (
                <div key={index} className="w-12 h-12 rounded-full border-2 border-Color-White overflow-hidden relative">
                  <Image
                    src={avatar}
                    alt={`Team member ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="self-stretch h-px bg-Color-Scheme-2-Border/20" />

          {/* Copyright and Social */}
          <div className="self-stretch inline-flex justify-between items-center">
            <p className="text-Color-Scheme-2-Text text-sm font-normal font-['Barlow'] leading-tight">
              © 2024 ARCO. Todos os direitos reservados.
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-start items-start gap-3">
              {socialIcons.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-6 h-6 text-Color-Scheme-2-Text hover:opacity-80 transition-opacity"
                  aria-label={social.name}
                >
                  <div className="w-6 h-6 relative overflow-hidden">
                    {/* Placeholder for social icons */}
                    <div className="w-5 h-5 left-[2px] top-[2.24px] absolute bg-Color-Scheme-2-Text" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}