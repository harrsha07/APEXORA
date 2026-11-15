'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes, ArrowUpRightIcon, ArrowRightIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';

export default function HomePage() {
  const { homepageSections, products, collections, settings } = useStore();

  const sortedSections = [...homepageSections]
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order);

  const activeProducts = products.filter(p => p.active);

  return (
    <div className="flex flex-col">
      {sortedSections.map(section => {
        switch (section.type) {
          case 'hero':
            return (
              <section
                key={section.id}
                className="relative bg-transparent border-b border-[#292929] overflow-hidden"
              >
                {/* Background Motorsport Gradients & Race Lines */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(135deg, rgba(225, 6, 0, 0.08) 0%, transparent 40%),
                      repeating-linear-gradient(125deg, transparent, transparent 40px, rgba(255, 255, 255, 0.03) 40px, rgba(255, 255, 255, 0.03) 41px)
                    `
                  }}
                />

                {/* Right Decorative Graphic Area (Desktop Only) */}
                <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                  <div className="relative">
                    <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-[180px] text-white/[0.04] leading-none tracking-tighter">
                      APX
                    </span>
                    <div className="w-72 h-1 bg-gradient-to-r from-transparent via-[#E10600]/40 to-transparent mt-2" />
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 relative z-10">
                  <div className="max-w-2xl">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-4 h-[2px] bg-[#E10600]" />
                      <span className="text-xs sm:text-[13px] font-bold tracking-[2.5px] text-[#B8B8B8] uppercase">
                        {section.eyebrow || '— APEXORA / MOTORSPORT CULTURE BY HARSHA'}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-normal uppercase leading-[1.05] mb-6">
                      BUILT FOR <br />
                      THE <span className="text-[#E10600]">PURSUIT.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg text-[#B8B8B8] leading-relaxed max-w-xl mb-8 font-normal">
                      {section.subtitle || 'For the ones who live for the next corner. Racing culture, reworked for everyday life.'}
                    </p>

                    {/* Primary Action CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href="/collections/apex-series"
                        className="px-8 py-4 bg-[#E10600] hover:bg-[#FF1E17] text-white font-['Barlow_Condensed',sans-serif] font-black italic text-base tracking-[2px] uppercase shadow-lg shadow-[#E10600]/30 inline-flex items-center gap-2 transition-all"
                      >
                        <span>EXPLORE APEX SERIES</span>
                        <ArrowUpRightIcon size={16} />
                      </Link>
                      <Link
                        href={section.ctaLink || '/drop-001'}
                        className="px-8 py-4 bg-[#111111] hover:bg-[#151515] border border-[#292929] hover:border-[#E10600] text-white font-['Barlow_Condensed',sans-serif] font-black italic text-base tracking-[2px] uppercase inline-flex items-center gap-2 transition-all"
                      >
                        <span>{section.ctaText || 'SHOP DROP 001'}</span>
                        <ArrowRightIcon size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Hero Bottom Telemetry Bar */}
                <div className="border-t border-[#292929] bg-[#080808] py-3.5 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-[2.5px] uppercase">
                    <div className="flex items-center gap-2 text-white">
                      <span>RACE / STREET / CULTURE</span>
                    </div>
                    <div>
                      <span className="text-[#858585]">BY HARSHA · INDIA</span>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'featured':
            return (
              <section
                key={section.id}
                id="collection"
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#292929] bg-transparent"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Clean Section Heading */}
                  <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-4 h-[2px] bg-[#E10600]" />
                        <span className="text-[11px] font-bold tracking-[2.5px] text-[#858585] uppercase">
                          {section.eyebrow || '— FIRST RELEASE / DROP 001'}
                        </span>
                      </div>
                      <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-normal uppercase leading-[1.05]">
                        THE <span className="text-[#E10600]">PURSUIT.</span>
                      </h2>
                      <p className="text-xs font-bold tracking-[3px] uppercase text-[#858585] mt-2">
                        {section.subtitle || 'THREE DESIGNS. ONE MINDSET.'}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-xs sm:text-sm text-[#B8B8B8] max-w-xs leading-relaxed font-normal">
                        Track-inspired graphics.<br className="hidden sm:inline" /> Everyday attitude.
                      </p>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {activeProducts.map((product, idx) => (
                      <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'manifesto':
            return (
              <section
                key={section.id}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#292929] bg-transparent"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Big Triple Racing Slash Accent */}
                  <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center">
                    <span className="text-[#E10600] font-black italic text-6xl lg:text-7xl leading-none select-none">
                      ///
                    </span>
                  </div>

                  {/* Story Text */}
                  <div className="lg:col-span-6">
                    <div className="text-[11px] font-bold tracking-[2.5px] text-[#858585] uppercase mb-3">
                      {section.eyebrow || 'THE APEXORA STORY'}
                    </div>

                    <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-normal uppercase leading-[1.08] mb-4">
                      RACING ISN&apos;T JUST <br />
                      A SPORT. <span className="text-[#E10600]">IT&apos;S A MINDSET.</span>
                    </h2>

                    <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed max-w-xl mb-6 font-normal">
                      {section.description ||
                        'Created by Harsha, for riders and everyone drawn to speed.'}
                    </p>

                    <a
                      href="https://www.instagram.com/harrsha.58/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black tracking-[2px] uppercase text-white bg-[#111111] border border-[#292929] hover:border-[#E10600] px-5 py-3 transition-all"
                    >
                      <span>FOLLOW HARSHA&apos;S JOURNEY</span>
                      <ArrowUpRightIcon size={14} className="text-[#E10600]" />
                    </a>
                  </div>

                  {/* 3 Value Pillars */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    <div className="flex items-center gap-4 py-3 border-b border-[#292929]">
                      <span className="text-sm font-black tracking-widest text-[#E10600] uppercase font-['Barlow_Condensed',sans-serif]">
                        01
                      </span>
                      <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">
                        RACING ROOTED
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-3 border-b border-[#292929]">
                      <span className="text-sm font-black tracking-widest text-[#E10600] uppercase font-['Barlow_Condensed',sans-serif]">
                        02
                      </span>
                      <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">
                        BUILT FOR EVERYDAY
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-3 border-b border-[#292929]">
                      <span className="text-sm font-black tracking-widest text-[#E10600] uppercase font-['Barlow_Condensed',sans-serif]">
                        03
                      </span>
                      <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">
                        MADE TO STAND OUT
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'collection_spotlight':
            return (
              <section
                key={section.id}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#292929] bg-transparent"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="bg-[#151515] border border-[#292929] p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3 py-1 rounded-sm text-[11px] font-bold tracking-[2.5px] text-white uppercase mb-2">
                        <span className="w-3 h-0.5 bg-[#E10600]" />
                        <span>{section.eyebrow || 'CURATED RELEASES'}</span>
                      </div>
                      <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white tracking-normal uppercase leading-[1.1]">
                        {section.title || 'EXPLORE COLLECTIONS'}
                      </h2>
                    </div>
                    <Link
                      href="/collections"
                      className="text-xs font-black tracking-widest text-white bg-[#E10600] hover:bg-[#FF1E17] px-4 py-2 uppercase transition-all shadow-md"
                    >
                      EXPLORE ALL COLLECTIONS →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {collections.map(col => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.slug}`}
                        className="group relative h-80 bg-[#151515] border border-[#292929] hover:border-[#E10600] overflow-hidden flex flex-col justify-end p-6 transition-all"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${col.bannerImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />

                        <div className="relative z-10 bg-[#151515]/95 border border-[#292929] p-4 backdrop-blur-sm space-y-1">
                          <span className="text-[10px] font-bold tracking-[2px] text-[#E10600] uppercase block">
                            COLLECTION
                          </span>
                          <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase group-hover:text-[#E10600] transition-colors leading-tight">
                            {col.title}
                          </h3>
                          <p className="text-xs text-[#B8B8B8] line-clamp-1 font-normal">
                            {col.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'instagram':
            return (
              <section
                key={section.id}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#292929] bg-transparent"
              >
                <div className="max-w-7xl mx-auto bg-[#151515] border border-[#292929] p-8 sm:p-10 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3 py-1 rounded-sm text-[11px] font-bold tracking-[2.5px] text-white uppercase mb-3">
                      <span className="w-4 h-0.5 bg-[#E10600] inline-block" />
                      <span>{section.eyebrow || 'FOLLOW THE MOVEMENT'}</span>
                    </div>
                    <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-normal uppercase leading-[1.1]">
                      STAY ON <span className="text-[#E10600]">THE LINE.</span>
                    </h2>
                    <p className="text-sm text-[#B8B8B8] mt-2 max-w-md font-normal">
                      New drops, track days, throttle therapy, and behind-the-scenes with Harsha.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <a
                      href={settings.instagramUrl || 'https://www.instagram.com/harrsha.58/'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#111111] border border-[#292929] hover:border-[#E10600] text-white flex items-center justify-between gap-6 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <InstagramIcon size={20} className="text-[#E10600]" />
                        <div className="text-left">
                          <span className="text-[10px] text-[#858585] uppercase tracking-wider block font-bold">INSTAGRAM</span>
                          <span className="font-bold text-xs text-white">@HARRSHA.58</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#E10600] font-black">↗</span>
                    </a>

                    <a
                      href={settings.youtubeUrl || 'https://www.youtube.com/@harrsha.58'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#111111] border border-[#292929] hover:border-[#E10600] text-white flex items-center justify-between gap-6 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <YoutubeIcon size={20} className="text-[#E10600]" />
                        <div className="text-left">
                          <span className="text-[10px] text-[#858585] uppercase tracking-wider block font-bold">YOUTUBE</span>
                          <span className="font-bold text-xs text-white">@HARRSHA.58</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#E10600] font-black">↗</span>
                    </a>
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
