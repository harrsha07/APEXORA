'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes, ArrowUpRightIcon, ArrowRightIcon, InstagramIcon, YoutubeIcon, CheckIcon } from '@/components/icons';

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
                className="racing-hero flex flex-col justify-between py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative"
              >
                <div className="hero-grid-accents" />
                <div className="racing-stamp">
                  <span>APX</span>
                  <small>RACE / STREET / CULTURE</small>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center my-auto">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-bold tracking-[3px] text-[#C6C8CC] uppercase flex items-center gap-2 mb-4">
                      <span className="w-5 h-0.5 bg-[#E10600] inline-block" />
                      {section.eyebrow || 'APEXORA / MOTORSPORT CULTURE BY HARSHA'}
                    </p>

                    <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.88] uppercase my-4">
                      BUILT FOR <br />
                      THE <span className="text-[#E10600]">PURSUIT.</span>
                    </h1>

                    <p className="text-sm md:text-base text-[#C6C8CC] leading-relaxed max-w-lg my-6">
                      {section.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Link
                        href={section.ctaLink || '/drop-001'}
                        className="skew-btn px-7 py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white font-['Barlow_Condensed',sans-serif] font-black italic text-base tracking-[2px] uppercase shadow-lg shadow-[#E10600]/30 inline-flex items-center gap-2"
                      >
                        <span>{section.ctaText || 'SHOP DROP 001'}</span>
                        <ArrowUpRightIcon size={16} />
                      </Link>

                      <a
                        href="#collection"
                        className="skew-btn px-6 py-4 border border-[#444850] hover:border-white text-white font-['Barlow_Condensed',sans-serif] font-bold text-sm tracking-[1.5px] uppercase inline-flex items-center gap-2 transition-colors"
                      >
                        <span>{section.secondaryCtaText || 'VIEW COLLECTION'}</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-6 mt-12 text-[10px] font-bold tracking-[2.5px] text-[#7E8491] uppercase">
                      <span>RACE / STREET / CULTURE</span>
                      <span>·</span>
                      <span>INDIA · GLOBAL</span>
                    </div>
                  </div>
                </div>

                {/* Hero Bottom Bar */}
                <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 relative z-10 flex items-center justify-between text-[10px] font-bold tracking-[2px] uppercase text-[#A5A8AF]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#E10600] font-black italic text-lg leading-none">///</span>
                    <span>THE PURSUIT COLLECTION</span>
                  </div>
                  <div>
                    <span>BY HARSHA · INDIA</span>
                  </div>
                </div>
              </section>
            );

          case 'featured':
            return (
              <section
                key={section.id}
                id="collection"
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1C1F26] bg-[#08090B]"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Section Heading */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                      <p className="text-[11px] font-bold tracking-[3px] text-[#C6C8CC] uppercase flex items-center gap-2 mb-2">
                        <span className="w-5 h-0.5 bg-[#E10600] inline-block" />
                        {section.eyebrow || 'FIRST RELEASE / DROP 001'}
                      </p>
                      <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
                        THE <span className="text-[#E10600]">PURSUIT.</span>
                      </h2>
                      <p className="text-xs font-bold tracking-[3px] uppercase text-[#7E8491] mt-2">
                        {section.subtitle || 'THREE DESIGNS. ONE MINDSET.'}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-xs text-[#8E939C] max-w-xs leading-relaxed">
                        Track-inspired graphics. Everyday attitude. Limited quantities available per size.
                      </p>
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#E10600] hover:underline uppercase mt-2"
                      >
                        <span>VIEW ALL PRODUCTS</span>
                        <ArrowRightIcon size={12} />
                      </Link>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeProducts.map((product, idx) => (
                      <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                  </div>

                  <p className="text-[10px] text-[#636873] tracking-wider uppercase mt-8 text-center md:text-left">
                    Design previews are based on the supplied Drop 001 reference board. 240+ GSM heavyweight oversized fit.
                  </p>
                </div>
              </section>
            );

          case 'manifesto':
            return (
              <section
                key={section.id}
                className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#252930] bg-[#101216] relative overflow-hidden"
              >
                {/* Subtle watermark */}
                <span className="absolute -right-8 -bottom-16 text-[#E10600]/5 font-['Barlow_Condensed',sans-serif] font-black italic text-[240px] select-none pointer-events-none">
                  ///
                </span>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                  <div className="lg:col-span-1 hidden lg:block">
                    <span className="text-[#E10600] font-black italic text-8xl leading-none">
                      ///
                    </span>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-[11px] font-bold tracking-[3px] text-[#E10600] uppercase">
                      {section.eyebrow || 'THE APEXORA STORY'}
                    </p>

                    <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[0.9]">
                      RACING ISN&apos;T <br />
                      JUST A SPORT. <br />
                      <span className="text-[#E10600]">IT&apos;S A MINDSET.</span>
                    </h2>

                    <p className="text-sm md:text-base text-[#A5A8AF] leading-relaxed max-w-xl">
                      {section.description ||
                        'APEXORA Motorsport Culture is built around the focus, discipline and feeling of being on the limit. Created by Harsha, for riders and everyone drawn to speed.'}
                    </p>

                    <a
                      href="https://www.instagram.com/harrsha.58/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black tracking-[2px] uppercase text-white hover:text-[#E10600] transition-colors pt-2"
                    >
                      <span>FOLLOW HARSHA&apos;S JOURNEY</span>
                      <ArrowUpRightIcon size={14} className="text-[#E10600]" />
                    </a>
                  </div>

                  <div className="lg:col-span-4 border-l border-[#2B2F38] pl-6 md:pl-10 space-y-8">
                    <div className="space-y-1">
                      <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-[#E10600] block">
                        01
                      </span>
                      <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                        RACING ROOTED
                      </h4>
                      <p className="text-xs text-[#8E939C]">
                        Directly influenced by real circuit telemetry and superbike geometry.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-[#E10600] block">
                        02
                      </span>
                      <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                        BUILT FOR EVERYDAY
                      </h4>
                      <p className="text-xs text-[#8E939C]">
                        Ultra-heavyweight 240+ GSM cotton engineered for durability and boxy drape.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-[#E10600] block">
                        03
                      </span>
                      <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                        MADE TO STAND OUT
                      </h4>
                      <p className="text-xs text-[#8E939C]">
                        Aggressive racing graphics and contrast red accents that command respect.
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
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1C1F26] bg-[#08090B]"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                      <p className="text-[11px] font-bold tracking-[3px] text-[#E10600] uppercase mb-1">
                        {section.eyebrow || 'CURATED RELEASES'}
                      </p>
                      <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white tracking-tight uppercase">
                        {section.title}
                      </h2>
                    </div>
                    <Link
                      href="/collections"
                      className="text-xs font-black tracking-widest text-[#E10600] hover:underline uppercase"
                    >
                      EXPLORE ALL COLLECTIONS →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {collections.map(col => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.slug}`}
                        className="group relative h-80 bg-[#15171B] border border-[#252930] hover:border-[#E10600] overflow-hidden flex flex-col justify-end p-6 transition-all"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${col.bannerImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                        <div className="relative z-10 space-y-1">
                          <span className="text-[9px] font-bold tracking-[2px] text-[#E10600] uppercase block">
                            COLLECTION
                          </span>
                          <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase group-hover:text-[#E10600] transition-colors">
                            {col.title}
                          </h3>
                          <p className="text-xs text-[#C6C8CC] line-clamp-1">
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
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#252930] bg-[#0C0E12]"
              >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div>
                    <p className="text-[11px] font-bold tracking-[3px] text-[#C6C8CC] uppercase flex items-center gap-2 mb-2">
                      <span className="w-5 h-0.5 bg-[#E10600] inline-block" />
                      {section.eyebrow || 'FOLLOW THE MOVEMENT'}
                    </p>
                    <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
                      STAY ON <span className="text-[#E10600]">THE LINE.</span>
                    </h2>
                    <p className="text-xs text-[#8E939C] mt-2 max-w-md">
                      New drops, track days, throttle therapy, and behind-the-scenes with Harsha.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <a
                      href={settings.instagramUrl || 'https://www.instagram.com/harrsha.58/'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#15171C] border border-[#2B2F38] hover:border-[#E10600] text-white flex items-center justify-between gap-6 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <InstagramIcon size={20} className="text-[#E10600]" />
                        <div className="text-left">
                          <span className="text-[10px] text-[#8E939C] uppercase tracking-wider block">INSTAGRAM</span>
                          <span className="font-bold text-xs">@HARRSHA.58</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#E10600] font-black">↗</span>
                    </a>

                    <a
                      href={settings.youtubeUrl || 'https://www.youtube.com/@harrsha.58'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#15171C] border border-[#2B2F38] hover:border-[#E10600] text-white flex items-center justify-between gap-6 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <YoutubeIcon size={20} className="text-[#E10600]" />
                        <div className="text-left">
                          <span className="text-[10px] text-[#8E939C] uppercase tracking-wider block">YOUTUBE</span>
                          <span className="font-bold text-xs">@HARRSHA.58</span>
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
