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
      <div className="border-b border-[#252930] pb-8 mb-10">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-2">
          <Slashes size={18} />
          <span>FRESH FROM THE PADDOCK</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white tracking-tight uppercase leading-none">
          NEW <span className="text-[#E10600]">ARRIVALS.</span>
        </h1>
        <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-2">
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
