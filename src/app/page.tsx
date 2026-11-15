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
                className="relative bg-[#08090B] border-b border-[#1E222D] overflow-hidden"
              >
                {/* Background Motorsport Gradients & Race Lines (strictly non-overlapping) */}
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
                <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                  <div className="relative">
                    <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-[160px] text-white/[0.04] leading-none tracking-tighter">
                      APX
                    </span>
                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#E10600]/40 to-transparent mt-2" />
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 relative z-10">
                  {/* Hero Solid Background Card for 100% Legibility and Zero Overlap */}
                  <div className="max-w-2xl bg-[#0D0F14]/95 border border-[#222733] p-8 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md">
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3.5 py-1.5 rounded-sm mb-6">
                      <span className="w-4 h-0.5 bg-[#E10600] inline-block" />
                      <span className="text-[11px] font-bold tracking-[2.5px] text-[#E2E4E9] uppercase">
                        {section.eyebrow || '— APEXORA / MOTORSPORT CULTURE BY HARSHA'}
                      </span>
                    </div>

                    {/* Main Heading - Clean Line Height, Zero Overlap */}
                    <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-normal uppercase leading-[1.08] mb-6">
                      BUILT FOR <br />
                      THE <span className="text-[#E10600]">PURSUIT.</span>
                    </h1>

                    {/* Subtitle with Solid High-Contrast Colour */}
                    <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed max-w-xl mb-8 font-normal">
                      {section.subtitle || 'For the ones who live for the next corner. Racing culture, reworked for everyday life.'}
                    </p>

                    {/* Primary & Secondary Action CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={section.ctaLink || '/drop-001'}
                        className="skew-btn px-8 py-4 bg-[#E10600] hover:bg-[#FF1E17] text-white font-['Barlow_Condensed',sans-serif] font-black italic text-base tracking-[2px] uppercase shadow-lg shadow-[#E10600]/30 inline-flex items-center gap-2 transition-all"
                      >
                        <span>{section.ctaText || 'SHOP DROP 001'}</span>
                        <ArrowUpRightIcon size={16} />
                      </Link>

                      <a
                        href="#collection"
                        className="skew-btn px-6 py-4 bg-[#161A22] border border-[#3A404F] hover:border-white text-white font-['Barlow_Condensed',sans-serif] font-bold text-sm tracking-[1.5px] uppercase inline-flex items-center gap-2 transition-all"
                      >
                        <span>{section.secondaryCtaText || 'VIEW COLLECTION'}</span>
                      </a>
                    </div>

                    {/* Technical Badges Plate */}
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#1E222D] text-[10px] font-bold tracking-[2.5px] text-[#9CA3AF] uppercase">
                      <span className="text-white">RACE / STREET / CULTURE</span>
                      <span className="text-[#E10600]">·</span>
                      <span>INDIA · GLOBAL</span>
                    </div>
                  </div>
                </div>

                {/* Hero Bottom Telemetry Bar */}
                <div className="bg-[#08090B] border-t border-[#1E222D] py-3 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-[2px] uppercase text-[#A5A8AF]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#E10600] font-black italic text-lg leading-none">///</span>
                      <span className="text-white">RACE / STREET / CULTURE</span>
                    </div>
                    <div>
                      <span className="text-[#9CA3AF]">BY HARSHA · INDIA</span>
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
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1E222D] bg-[#08090B]"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Section Heading Banner with Solid Dark Plate */}
                  <div className="bg-[#0D0F14] border border-[#222733] p-6 sm:p-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-[11px] font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-3">
                        <span className="w-4 h-0.5 bg-[#E10600] inline-block" />
                        <span>{section.eyebrow || '— FIRST RELEASE / DROP 001'}</span>
                      </div>
                      <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-normal uppercase leading-[1.1]">
                        THE <span className="text-[#E10600]">PURSUIT.</span>
                      </h2>
                      <p className="text-xs font-bold tracking-[3px] uppercase text-[#9CA3AF] mt-2">
                        {section.subtitle || 'THREE DESIGNS. ONE MINDSET.'}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-[#D1D5DB] max-w-xs leading-relaxed font-normal">
                        Track-inspired graphics. Everyday attitude. Limited quantities available per size.
                      </p>
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-white bg-[#E10600] hover:bg-[#FF1E17] px-4 py-2 uppercase mt-3 transition-colors shadow-md"
                      >
                        <span>VIEW ALL PRODUCTS</span>
                        <ArrowRightIcon size={12} />
                      </Link>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {activeProducts.map((product, idx) => (
                      <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                  </div>

                  {/* Footnote */}
                  <div className="mt-8 p-4 bg-[#0D0F14] border border-[#1E222D] text-[11px] text-[#9CA3AF] tracking-wider uppercase text-center md:text-left flex items-center justify-between flex-wrap gap-2">
                    <span>240+ GSM HEAVYWEIGHT COMBED COTTON · OVERSIZED BOXY FIT</span>
                    <span className="text-[#E10600] font-bold">LIMITED DROP 001 INVENTORY</span>
                  </div>
                </div>
              </section>
            );

          case 'manifesto':
            return (
              <section
                key={section.id}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1E222D] bg-[#0A0C10] relative overflow-hidden"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Big Triple Racing Slash Accent */}
                  <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center">
                    <span className="text-[#E10600] font-black italic text-7xl lg:text-8xl leading-none select-none">
                      ///
                    </span>
                  </div>

                  {/* Story Card on Solid Dark Plate - No Text Overlap */}
                  <div className="lg:col-span-6 bg-[#0D0F14] border border-[#222733] p-8 sm:p-10 md:p-12 shadow-2xl">
                    <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-[11px] font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-4">
                      <span className="w-3 h-0.5 bg-[#E10600]" />
                      <span>{section.eyebrow || 'THE APEXORA STORY'}</span>
                    </div>

                    <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-normal uppercase leading-[1.12] mb-5">
                      RACING ISN&apos;T <br />
                      JUST A SPORT. <br />
                      <span className="text-[#E10600]">IT&apos;S A MINDSET.</span>
                    </h2>

                    <p className="text-base text-[#D1D5DB] leading-relaxed max-w-xl mb-6 font-normal">
                      {section.description ||
                        'Created by Harsha, for riders and everyone drawn to speed. APEXORA Motorsport Culture is built around the focus, discipline, and raw sensation of being on the limit.'}
                    </p>

                    <a
                      href="https://www.instagram.com/harrsha.58/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black tracking-[2px] uppercase text-white bg-[#161A22] border border-[#2B303C] hover:border-[#E10600] px-5 py-3 transition-all"
                    >
                      <span>FOLLOW HARSHA&apos;S JOURNEY</span>
                      <ArrowUpRightIcon size={14} className="text-[#E10600]" />
                    </a>
                  </div>

                  {/* 3 Value Pillars in Distinct Solid Background Cards */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="bg-[#12151B] border border-[#222733] p-6 shadow-md transition-all hover:border-[#E10600]/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-[#E10600]">
                          01
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase bg-[#1A1E26] px-2 py-0.5">
                          TELEMETRY
                        </span>
                      </div>
                      <h4 className="text-sm font-black tracking-wider text-white uppercase">
                        RACING ROOTED
                      </h4>
                      <p className="text-xs text-[#D1D5DB] mt-1 leading-relaxed">
                        Directly influenced by real circuit telemetry, apex cornering geometry, and trackside engineering.
                      </p>
                    </div>

                    <div className="bg-[#12151B] border border-[#222733] p-6 shadow-md transition-all hover:border-[#E10600]/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-[#E10600]">
                          02
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase bg-[#1A1E26] px-2 py-0.5">
                          MATERIAL
                        </span>
                      </div>
                      <h4 className="text-sm font-black tracking-wider text-white uppercase">
                        BUILT FOR EVERYDAY
                      </h4>
                      <p className="text-xs text-[#D1D5DB] mt-1 leading-relaxed">
                        Ultra-heavyweight 240+ GSM combed cotton engineered for all-day durability, structured shape, and a boxy silhouette.
                      </p>
                    </div>

                    <div className="bg-[#12151B] border border-[#222733] p-6 shadow-md transition-all hover:border-[#E10600]/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-[#E10600]">
                          03
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase bg-[#1A1E26] px-2 py-0.5">
                          CULTURE
                        </span>
                      </div>
                      <h4 className="text-sm font-black tracking-wider text-white uppercase">
                        MADE TO STAND OUT
                      </h4>
                      <p className="text-xs text-[#D1D5DB] mt-1 leading-relaxed">
                        Bold racing graphics, tachometer redlines, and contrast red accents designed for street and paddock presence.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'collection_spotlight':
            return (
              <section
                key={section.id}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1E222D] bg-[#08090B]"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="bg-[#0D0F14] border border-[#222733] p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-[11px] font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-2">
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
                        className="group relative h-80 bg-[#12151B] border border-[#222733] hover:border-[#E10600] overflow-hidden flex flex-col justify-end p-6 transition-all"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${col.bannerImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />

                        <div className="relative z-10 bg-[#0D0F14]/90 border border-[#222733] p-4 backdrop-blur-sm space-y-1">
                          <span className="text-[10px] font-bold tracking-[2px] text-[#E10600] uppercase block">
                            COLLECTION
                          </span>
                          <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase group-hover:text-[#E10600] transition-colors leading-tight">
                            {col.title}
                          </h3>
                          <p className="text-xs text-[#D1D5DB] line-clamp-1 font-normal">
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
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1E222D] bg-[#0A0C10]"
              >
                <div className="max-w-7xl mx-auto bg-[#0D0F14] border border-[#222733] p-8 sm:p-10 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-[11px] font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-3">
                      <span className="w-4 h-0.5 bg-[#E10600] inline-block" />
                      <span>{section.eyebrow || 'FOLLOW THE MOVEMENT'}</span>
                    </div>
                    <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-normal uppercase leading-[1.1]">
                      STAY ON <span className="text-[#E10600]">THE LINE.</span>
                    </h2>
                    <p className="text-sm text-[#D1D5DB] mt-2 max-w-md font-normal">
                      New drops, track days, throttle therapy, and behind-the-scenes with Harsha.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <a
                      href={settings.instagramUrl || 'https://www.instagram.com/harrsha.58/'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#14171E] border border-[#282E3B] hover:border-[#E10600] text-white flex items-center justify-between gap-6 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <InstagramIcon size={20} className="text-[#E10600]" />
                        <div className="text-left">
                          <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block font-bold">INSTAGRAM</span>
                          <span className="font-bold text-xs text-white">@HARRSHA.58</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#E10600] font-black">↗</span>
                    </a>

                    <a
                      href={settings.youtubeUrl || 'https://www.youtube.com/@harrsha.58'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#14171E] border border-[#282E3B] hover:border-[#E10600] text-white flex items-center justify-between gap-6 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <YoutubeIcon size={20} className="text-[#E10600]" />
                        <div className="text-left">
                          <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block font-bold">YOUTUBE</span>
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
