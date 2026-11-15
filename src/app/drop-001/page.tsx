'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes } from '@/components/icons';

export default function Drop001Page() {
  const { products } = useStore();

  const dropProducts = products.filter(
    p => p.active && (p.id.includes('apex') || p.id.includes('redline') || p.id.includes('circuit'))
  );

  return (
    <div className="flex flex-col">
      {/* Drop Header Banner with Solid Dark Plate */}
      <section className="bg-[#08090B] border-b border-[#1E222D] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl bg-[#0D0F14] border border-[#222733] p-8 sm:p-10 md:p-12 shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[3px] text-[#E2E4E9] uppercase mb-4">
              <Slashes size={18} className="text-[#E10600]" />
              <span>LIMITED RELEASE ARCHIVE</span>
            </div>

            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl text-white tracking-normal uppercase leading-[1.08] mb-4">
              DROP 001 — <span className="text-[#E10600]">THE PURSUIT.</span>
            </h1>

            <p className="text-base text-[#D1D5DB] leading-relaxed mb-6 font-normal">
              Three designs. One relentless mindset. APEXORA Drop 001 is engineered for those who live for the next corner. 240+ GSM ultra-heavyweight combed cotton cut in a signature boxy drop-shoulder oversized silhouette.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest uppercase text-[#9CA3AF] pt-4 border-t border-[#1E222D]">
              <span className="bg-[#14171E] px-3 py-1 border border-[#222733]">STATUS: <strong className="text-emerald-400">ACTIVE ON TRACK</strong></span>
              <span className="bg-[#14171E] px-3 py-1 border border-[#222733]">BATCH: <strong className="text-white">LIMITED RUN</strong></span>
              <span className="bg-[#14171E] px-3 py-1 border border-[#222733]">SIZES: <strong className="text-white">S TO XXL</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Concept Board Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#0D0F14] border border-[#222733] p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] tracking-[2.5px] uppercase block mb-1">
                DESIGN BOARD ARCHIVE
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl sm:text-3xl text-white uppercase leading-tight">
                THE PURSUIT MASTER REFERENCE
              </h2>
            </div>
            <p className="text-xs text-[#D1D5DB] max-w-md font-normal leading-relaxed">
              High-resolution design board showing the original front and back typography and track graphics for APEX ONE, REDLINE, and APEX AFTER DARK.
            </p>
          </div>
          <div className="w-full bg-[#13161C] border border-[#222733] overflow-hidden p-2">
            <img
              src="/images/drop-001-reference.jpg"
              alt="Drop 001 master design board"
              className="w-full max-h-[500px] object-contain mx-auto"
            />
          </div>
        </div>

        {/* Garments Grid */}
        <div className="mb-12">
          <div className="bg-[#0D0F14] border border-[#222733] p-6 mb-8 flex items-center justify-between">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white tracking-normal uppercase leading-tight">
              AVAILABLE GARMENTS IN <span className="text-[#E10600]">DROP 001</span>
            </h2>
            <span className="text-xs font-bold tracking-widest text-[#9CA3AF] uppercase">
              {dropProducts.length} DESIGNS RELEASED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {dropProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
