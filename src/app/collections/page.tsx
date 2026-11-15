'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Slashes, ArrowRightIcon } from '@/components/icons';

export default function CollectionsPage() {
  const { collections, products } = useStore();

  const activeCollections = collections.filter(c => c.active).sort((a, b) => a.order - b.order);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner on Solid Dark Plate */}
      <div className="bg-[#151515] border border-[#292929] p-8 sm:p-10 mb-8 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[2.5px] text-white uppercase mb-3">
          <Slashes size={18} className="text-[#E10600]" />
          <span>SERIES & EDITIONS</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white tracking-normal uppercase leading-[1.12]">
          MOTORSPORT <span className="text-[#E10600]">COLLECTIONS.</span>
        </h1>
        <p className="text-xs text-[#858585] uppercase tracking-wider mt-2 font-medium">
          Curated release capsules engineered around distinct facets of track and street riding culture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCollections.map(col => {
          const colProducts = products.filter(p => col.productIds.includes(p.id) && p.active);
          return (
            <div
              key={col.id}
              className="bg-[#151515] border border-[#292929] hover:border-[#E10600] flex flex-col justify-between overflow-hidden group transition-all shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                <img
                  src={col.bannerImage}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#E10600] text-white text-[9px] font-black tracking-widest px-2.5 py-1 uppercase">
                  {colProducts.length} GARMENTS
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-[2px] text-[#E10600] uppercase block mb-1">
                    {col.tagline}
                  </span>
                  <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase group-hover:text-[#E10600] transition-colors leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#858585] mt-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#292929]">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="w-full py-3 bg-[#111111] hover:bg-[#E10600] text-white text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 border border-[#292929] hover:border-[#E10600] transition-colors"
                  >
                    <span>EXPLORE COLLECTION</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
