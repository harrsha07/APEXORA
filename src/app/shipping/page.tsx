'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Slashes } from '@/components/icons';

export default function ShippingPolicyPage() {
  const { pages } = useStore();
  const page = pages.find(p => p.slug === 'shipping') || {
    title: 'SHIPPING & DELIVERY POLICY',
    subtitle: 'RAPID TRACK-SIDE DISPATCH ACROSS INDIA & WORLDWIDE',
    content: 'All orders are processed and packed in our Bengaluru distribution hub.'
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="border-b border-[#252930] pb-8 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-2">
          <Slashes size={20} />
          <span>LOGISTICS & FULFILLMENT</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white uppercase leading-none">
          {page.title}
        </h1>
        <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-2">
          {page.subtitle}
        </p>
      </div>

      <div className="bg-[#111418] border border-[#252930] p-8 md:p-12 text-xs text-[#C6C8CC] leading-relaxed whitespace-pre-line">
        {page.content}
      </div>
    </div>
  );
}
