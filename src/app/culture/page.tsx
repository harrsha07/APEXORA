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
      <div className="border-b border-[#252930] pb-8 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-2">
          <Slashes size={20} />
          <span>MANIFESTO & PHILOSOPHY</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white uppercase leading-none">
          {page.title}
        </h1>
        <p className="text-xs text-[#E10600] uppercase tracking-[3px] mt-2 font-black">
          {page.subtitle}
        </p>
      </div>

      <div className="bg-[#111418] border border-[#252930] p-8 md:p-12 space-y-6 text-sm text-[#C6C8CC] leading-relaxed whitespace-pre-line">
        {page.content}
      </div>
    </div>
  );
}
