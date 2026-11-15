'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Slashes, CheckIcon } from '@/components/icons';

export default function SEOManagementPage() {
  const { draftState, showToast } = useStore();

  const [seoForm, setSeoForm] = useState({
    metaTitle: 'APEXORA — Motorsport Culture by Harsha',
    metaDescription: 'Built for speed. Defined by culture. Premium motorsport streetwear and racing performance apparel. Drop 001 is now live.',
    keywords: 'motorsport, streetwear, racing apparel, oversized tee, superbike, APEXORA, Harsha, Drop 001',
    ogImage: '/images/apexora-racing-hero.jpg',
    canonicalUrl: 'https://apexora.store',
    robotsIndex: true,
    robotsFollow: true,
    googleVerification: 'google-site-verification-apexora-token'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Global SEO metadata saved to draft.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>SEARCH ENGINE OPTIMIZATION</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            SEO <span className="text-[#E10600]">MANAGEMENT.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Optimize meta titles, descriptions, social Open Graph previews, and Google indexability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            STOREFRONT SEARCH METADATA
          </h2>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              DEFAULT META TITLE ({seoForm.metaTitle.length}/60 chars)
            </label>
            <input
              type="text"
              required
              value={seoForm.metaTitle}
              onChange={e => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold tracking-wider"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              DEFAULT META DESCRIPTION ({seoForm.metaDescription.length}/160 chars)
            </label>
            <textarea
              rows={3}
              required
              value={seoForm.metaDescription}
              onChange={e => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              TARGET KEYWORDS (COMMA SEPARATED)
            </label>
            <input
              type="text"
              value={seoForm.keywords}
              onChange={e => setSeoForm({ ...seoForm, keywords: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                OPEN GRAPH SHARING IMAGE URL
              </label>
              <input
                type="text"
                value={seoForm.ogImage}
                onChange={e => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                CANONICAL BASE URL
              </label>
              <input
                type="url"
                value={seoForm.canonicalUrl}
                onChange={e => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
              <input
                type="checkbox"
                checked={seoForm.robotsIndex}
                onChange={e => setSeoForm({ ...seoForm, robotsIndex: e.target.checked })}
                className="accent-[#E10600] w-4 h-4"
              />
              <span>Allow Search Engines to Index</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
              <input
                type="checkbox"
                checked={seoForm.robotsFollow}
                onChange={e => setSeoForm({ ...seoForm, robotsFollow: e.target.checked })}
                className="accent-[#E10600] w-4 h-4"
              />
              <span>Follow Hyperlinks</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#1C1F26]">
            <button
              type="submit"
              className="px-8 py-3 bg-[#E10600] text-white text-xs font-black tracking-widest uppercase"
            >
              SAVE SEO CONFIGURATION
            </button>
          </div>
        </form>

        {/* Google SERP Preview (5 cols) */}
        <div className="lg:col-span-5 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase border-b border-[#252930] pb-2">
            GOOGLE SEARCH SNIPPET PREVIEW
          </h2>

          <div className="bg-[#1F232B] p-4 border border-[#30353E] rounded space-y-1 font-sans">
            <span className="text-xs text-[#8E939C] block truncate">
              {seoForm.canonicalUrl}
            </span>
            <h3 className="text-sm font-bold text-[#8AB4F8] hover:underline cursor-pointer leading-snug">
              {seoForm.metaTitle}
            </h3>
            <p className="text-xs text-[#BDC1C6] leading-relaxed line-clamp-2">
              {seoForm.metaDescription}
            </p>
          </div>

          {/* Social Card Preview */}
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase border-b border-[#252930] pb-2 pt-4">
            SOCIAL SHARING (OPEN GRAPH) PREVIEW
          </h2>

          <div className="bg-[#15171C] border border-[#2B2F38] overflow-hidden">
            <img src={seoForm.ogImage} alt="OG preview" className="w-full h-36 object-cover" />
            <div className="p-3 space-y-1">
              <span className="text-[10px] text-[#7E8491] uppercase font-mono block">apexora.store</span>
              <strong className="text-xs text-white block truncate">{seoForm.metaTitle}</strong>
              <p className="text-[11px] text-[#8E939C] line-clamp-1">{seoForm.metaDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
