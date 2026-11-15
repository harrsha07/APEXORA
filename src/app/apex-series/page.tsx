'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes, ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';

export default function ApexSeriesPage() {
  const { products } = useStore();

  const apexSeriesProducts = products.filter(
    p =>
      p.active &&
      (p.id === 'apex-series-01' ||
        p.id === 'apex-line-58' ||
        p.id === 'rider-core-03' ||
        p.id === 'rider-focus' ||
        p.id === 'checker-evolution')
  );

  return (
    <div className="flex flex-col">
      {/* Series Hero Banner with Solid Dark Motorsport Plate */}
      <section className="bg-transparent border-b border-[#292929] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl bg-[#151515] border border-[#292929] p-8 sm:p-10 md:p-12 shadow-2xl relative">
            <div className="w-1.5 h-full bg-[#E10600] absolute left-0 top-0" />

            <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[3px] text-white uppercase mb-4">
              <Slashes size={18} className="text-[#E10600]" />
              <span>COLLECTION ARCHIVE · 2026</span>
            </div>

            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl text-white tracking-normal uppercase leading-[1.05] mb-4">
              APEX SERIES — <span className="text-[#E10600]">SPEED & CONTROL.</span>
            </h1>

            <p className="text-base text-[#B8B8B8] leading-relaxed mb-6 font-normal max-w-2xl">
              From the starting grid to the checkered flag, it is a journey of evolution. Five iconic heavyweight oversized T-shirts crafted in 260 GSM combed cotton, authentic paddock telemetry, 3D puff textures, and high-speed circuit graphics.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold tracking-widest uppercase text-[#858585] pt-4 border-t border-[#292929]">
              <span className="bg-[#111111] px-3 py-1.5 border border-[#292929]">
                STATUS: <strong className="text-emerald-400">ACTIVE ON TRACK</strong>
              </span>
              <span className="bg-[#111111] px-3 py-1.5 border border-[#292929]">
                FABRIC: <strong className="text-white">260 GSM HEAVYWEIGHT</strong>
              </span>
              <span className="bg-[#111111] px-3 py-1.5 border border-[#292929]">
                PRINT: <strong className="text-white">3D PUFF + HIGH-DENSITY</strong>
              </span>
              <span className="bg-[#111111] px-3 py-1.5 border border-[#292929]">
                SIZES: <strong className="text-white">S TO XXL</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Feature Showcase */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Banner Card */}
        <div className="bg-[#151515] border border-[#292929] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] tracking-[2.5px] uppercase block mb-1">
                DESIGN 04 / CHECKER EVOLUTION
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl sm:text-3xl text-white uppercase leading-tight">
                FROM THE GRID TO THE FLAG
              </h2>
            </div>
            <p className="text-xs text-[#B8B8B8] max-w-md font-normal leading-relaxed">
              Featuring our groundbreaking Buff (Puff) 3D raised texture print that brings tactile track curbs and checkered flags directly to garment wear.
            </p>
          </div>

          <div className="w-full bg-[#111111] border border-[#292929] overflow-hidden p-2">
            <img
              src="/images/apexora-checker-evolution.jpg"
              alt="APEXORA Checker Evolution master showcase"
              className="w-full max-h-[500px] object-contain mx-auto"
            />
          </div>
        </div>

        {/* 5 Garments Grid */}
        <div>
          <div className="bg-[#151515] border border-[#292929] p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[2.5px] text-[#E10600] uppercase block mb-1">
                AVAILABLE GARMENTS
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white tracking-normal uppercase leading-tight">
                THE 5 <span className="text-[#E10600]">FLAGSHIP SILHOUETTES</span>
              </h2>
            </div>
            <span className="text-xs font-bold tracking-widest text-[#858585] uppercase">
              {apexSeriesProducts.length} DESIGNS RELEASED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {apexSeriesProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>

        {/* Collection Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#151515] border border-[#292929] p-6 space-y-2">
            <div className="flex items-center gap-2 text-[#E10600] text-xs font-bold uppercase tracking-wider">
              <span>01 / APEX SERIES</span>
            </div>
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
              PRECISION / SPEED / CONTROL
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed">
              Clean angular torso piping with checkered accents and the large dark metallic geometric apex crest on the spine.
            </p>
          </div>

          <div className="bg-[#151515] border border-[#292929] p-6 space-y-2">
            <div className="flex items-center gap-2 text-[#E10600] text-xs font-bold uppercase tracking-wider">
              <span>02 / RIDER FOCUS</span>
            </div>
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
              FOCUS / DISCIPLINE / MINDSET
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed">
              Targeting visor crosshairs, &quot;RACE LEARN REPEAT&quot; sleeve typography, and photorealistic racing helmet artwork.
            </p>
          </div>

          <div className="bg-[#151515] border border-[#292929] p-6 space-y-2">
            <div className="flex items-center gap-2 text-[#E10600] text-xs font-bold uppercase tracking-wider">
              <span>03 / APEX LINE 58</span>
            </div>
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
              THE RACING LINE
            </h3>
            <p className="text-xs text-[#858585] leading-relaxed">
              The line to the apex where milliseconds are won or lost. Leaning superbike racer cutting through the #58 racing stripe.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-8 border-t border-[#292929]">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#858585] hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeftIcon size={14} />
            <span>Explore All Collections</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
