'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes, ArrowLeftIcon, ArrowUpRightIcon } from '@/components/icons';

export default function ApexSeriesPage() {
  const { products } = useStore();

  const apexSeriesProducts = products.filter(
    p =>
      p.active &&
      (p.id === 'apex-series-01' ||
        p.id === 'rider-core-03' ||
        p.id === 'rider-focus' ||
        p.id === 'apex-line-58' ||
        p.id === 'checker-evolution')
  );

  return (
    <div className="flex flex-col">
      {/* Series Hero Banner with Solid Dark Plate */}
      <section className="bg-transparent border-b border-[#292929] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl bg-[#151515] border border-[#292929] p-8 sm:p-10 md:p-12 shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[3px] text-white uppercase mb-4">
              <Slashes size={18} className="text-[#E10600]" />
              <span>NEW COLLECTION · DROP 002</span>
            </div>

            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl text-white tracking-normal uppercase leading-[1.08] mb-4">
              APEX SERIES — <span className="text-[#E10600]">SPEED &amp; CONTROL.</span>
            </h1>

            <p className="text-base text-[#B8B8B8] leading-relaxed mb-6 font-normal">
              From the starting grid to the checkered flag, it&apos;s a journey of evolution. 5 high-octane oversized T-shirts engineered in 260 GSM heavyweight combed cotton with authentic 3D buff puff print textures, aerodynamic helmet visors, and signature #58 racing telemetry.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest uppercase text-[#858585] pt-4 border-t border-[#292929]">
              <span className="bg-[#111111] px-3 py-1 border border-[#292929]">
                STATUS: <strong className="text-emerald-400">ACTIVE RELEASE</strong>
              </span>
              <span className="bg-[#111111] px-3 py-1 border border-[#292929]">
                FABRIC: <strong className="text-white">260 GSM HEAVYWEIGHT</strong>
              </span>
              <span className="bg-[#111111] px-3 py-1 border border-[#292929]">
                FIT: <strong className="text-white">BOX OVERSIZED</strong>
              </span>
              <span className="bg-[#111111] px-3 py-1 border border-[#292929]">
                PRINT: <strong className="text-[#E10600]">3D BUFF PUFF TEXTURE</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Concept Board Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Master Showcase Banner */}
        <div className="bg-[#151515] border border-[#292929] p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] tracking-[2.5px] uppercase block mb-1">
                DESIGN 04 / MASTER SHOWCASE
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl sm:text-3xl text-white uppercase leading-tight">
                CHECKER EVOLUTION &amp; 3D PUFF TEXTURE
              </h2>
            </div>
            <p className="text-xs text-[#B8B8B8] max-w-md font-normal leading-relaxed">
              Featuring 3D raised puff tactile print, 260 GSM premium combed cotton, and aerodynamic racing contours tested on track.
            </p>
          </div>
          <div className="w-full bg-[#080808] border border-[#292929] overflow-hidden p-2">
            <img
              src="/images/apexora-checker-evolution.jpg"
              alt="APEXORA Checker Evolution and 3D Buff Puff Texture Showcase"
              className="w-full max-h-[550px] object-contain mx-auto"
            />
          </div>
        </div>

        {/* 5 Garment Grid */}
        <div className="mb-12">
          <div className="bg-[#151515] border border-[#292929] p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] tracking-[2px] uppercase block mb-1">
                THE LINEUP
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white tracking-normal uppercase leading-tight">
                ALL 5 GARMENTS IN <span className="text-[#E10600]">APEX SERIES</span>
              </h2>
            </div>
            <span className="text-xs font-bold tracking-widest text-[#858585] uppercase">
              {apexSeriesProducts.length} DESIGNS AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {apexSeriesProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
