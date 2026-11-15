'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes } from '@/components/icons';

export default function NewArrivalsPage() {
  const { products } = useStore();

  const newProducts = [...products]
    .filter(p => p.active)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner on Solid Dark Plate */}
      <div className="bg-[#0D0F14] border border-[#222733] p-8 sm:p-10 mb-8 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-3">
          <Slashes size={18} className="text-[#E10600]" />
          <span>FRESH FROM THE PADDOCK</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white tracking-normal uppercase leading-[1.12]">
          NEW <span className="text-[#E10600]">ARRIVALS.</span>
        </h1>
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-2 font-medium">
          Latest motorsport streetwear cuts, track graphics and limited edition runs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
}
