'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes, ArrowUpRightIcon } from '@/components/icons';

export default function Drop001Page() {
  const { products } = useStore();

  const dropProducts = products.filter(
    p => p.active && (p.id.includes('apex') || p.id.includes('redline') || p.id.includes('circuit'))
  );

  return (
    <div className="flex flex-col">
      {/* Drop Header Banner */}
      <section className="bg-[#111418] border-b border-[#252930] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-no-repeat bg-right bg-contain pointer-events-none" style={{ backgroundImage: "url('/images/drop-001-reference.jpg')" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[3px] text-[#E10600] uppercase mb-3">
              <Slashes size={18} />
              <span>LIMITED RELEASE ARCHIVE</span>
            </div>
            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.9]">
              DROP 001 — <span className="text-[#E10600]">THE PURSUIT.</span>
            </h1>
            <p className="text-sm md:text-base text-[#C6C8CC] leading-relaxed my-5">
              Three designs. One relentless mindset. APEXORA Drop 001 is engineered for those who live for the next corner. 240+ GSM ultra-heavyweight combed cotton cut in a signature boxy drop-shoulder oversized silhouette.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold tracking-widest uppercase text-[#8E939C]">
              <span>STATUS: <strong className="text-emerald-400">ACTIVE ON TRACK</strong></span>
              <span>·</span>
              <span>BATCH: <strong>LIMITED RUN</strong></span>
              <span>·</span>
              <span>SIZES: <strong>S TO XXL</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Concept Board Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#15171B] border border-[#252930] p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] tracking-[2.5px] uppercase block mb-1">
                DESIGN BOARD ARCHIVE
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
                THE PURSUIT MASTER REFERENCE
              </h2>
            </div>
            <p className="text-xs text-[#8E939C] max-w-md">
              High-resolution design board showing the original front and back typography and track graphics for APEX ONE, REDLINE, and APEX AFTER DARK.
            </p>
          </div>
          <div className="w-full bg-[#08090B] border border-[#252930] overflow-hidden">
            <img
              src="/images/drop-001-reference.jpg"
              alt="Drop 001 master design board"
              className="w-full max-h-[500px] object-contain mx-auto"
            />
          </div>
        </div>

        {/* Garments Grid */}
        <div className="mb-12">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white tracking-tight uppercase mb-8">
            AVAILABLE GARMENTS IN <span className="text-[#E10600]">DROP 001</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dropProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
