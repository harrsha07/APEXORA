'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Slashes } from '@/components/icons';

export default function CulturePage() {
  const { pages } = useStore();
  const page = pages.find(p => p.slug === 'culture') || {
    title: 'OUR MOTORSPORT CULTURE',
    subtitle: "RACING ISN'T JUST A SPORT. IT'S A MINDSET.",
    content: "Speed, precision and attitude."
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-[#0D0F14] border border-[#222733] p-8 sm:p-10 mb-8 text-center shadow-xl">
        <div className="inline-flex items-center justify-center gap-2 bg-[#161A22] border border-[#2B303C] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-3">
          <Slashes size={20} className="text-[#E10600]" />
          <span>MANIFESTO & PHILOSOPHY</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white uppercase leading-[1.12]">
          {page.title}
        </h1>
        <p className="text-xs text-[#E10600] uppercase tracking-[3px] mt-2 font-black">
          {page.subtitle}
        </p>
      </div>

      <div className="bg-[#0D0F14] border border-[#222733] p-8 md:p-12 space-y-6 text-sm text-[#D1D5DB] leading-relaxed whitespace-pre-line shadow-xl">
        {page.content}
      </div>
    </div>
  );
}
