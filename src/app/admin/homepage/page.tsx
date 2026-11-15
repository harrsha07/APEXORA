'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { HomepageSection } from '@/types';
import { Slashes, EditIcon, EyeIcon, ArrowRightIcon } from '@/components/icons';

export default function HomepageEditorPage() {
  const { draftState, updateDraft, showToast } = useStore();
  const sections = draftState.homepageSections;

  const [selectedSectionId, setSelectedSectionId] = useState<string>(sections[0]?.id || 'hero');

  const selectedSection = sections.find(s => s.id === selectedSectionId) || sections[0];

  const updateSelected = (updates: Partial<HomepageSection>) => {
    updateDraft('homepageSections', list =>
      list.map(s => (s.id === selectedSection.id ? { ...s, ...updates } : s))
    );
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const list = [...sections];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    // Re-index orders
    const reordered = list.map((s, idx) => ({ ...s, order: idx + 1 }));
    updateDraft('homepageSections', () => reordered);
    showToast(`Reordered "${moved.title}" ${direction}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>MODULAR STOREFRONT COMPOSER</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            HOMEPAGE <span className="text-[#E10600]">EDITOR.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Manage, reorder, customize text, background banners, and CTAs for every homepage block.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sections List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8E939C] px-1 mb-2">
            <span>SECTIONS ({sections.length})</span>
            <span>REORDER / VISIBILITY</span>
          </div>

          {sections.map((sec, index) => {
            const isSelected = sec.id === selectedSectionId;
            return (
              <div
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`p-4 border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#181B22] border-[#E10600] text-white'
                    : 'bg-[#111418] border-[#252930] text-[#A5A8AF] hover:border-white'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="font-mono text-xs text-[#E10600] font-bold">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg uppercase leading-tight truncate">
                      {sec.title}
                    </h3>
                    <span className="text-[10px] text-[#7E8491] uppercase tracking-wider block">
                      Type: {sec.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                  {/* Up / Down Reorder Arrows */}
                  <button
                    disabled={index === 0}
                    onClick={() => moveSection(index, 'up')}
                    className="p-1 hover:text-white disabled:opacity-20 text-xs"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, 'down')}
                    className="p-1 hover:text-white disabled:opacity-20 text-xs"
                    title="Move Down"
                  >
                    ▼
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    onClick={() => {
                      updateDraft('homepageSections', list =>
                        list.map(s => (s.id === sec.id ? { ...s, visible: !s.visible } : s))
                      );
                      showToast(`Section "${sec.title}" visibility toggled`);
                    }}
                    className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded ml-1 ${
                      sec.visible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {sec.visible ? 'VISIBLE' : 'HIDDEN'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Detail Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#111418] border border-[#252930] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#252930] pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] uppercase tracking-wider block">
                EDITING SECTION
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase mt-0.5">
                {selectedSection.title}
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
              <input
                type="checkbox"
                checked={selectedSection.visible}
                onChange={e => updateSelected({ visible: e.target.checked })}
                className="accent-[#E10600] w-4 h-4"
              />
              <span>Show On Homepage</span>
            </label>
          </div>

          <div className="space-y-4">
            {/* Eyebrow */}
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                EYEBROW / KICKER LABEL
              </label>
              <input
                type="text"
                value={selectedSection.eyebrow || ''}
                onChange={e => updateSelected({ eyebrow: e.target.value })}
                placeholder="e.g. FIRST RELEASE / DROP 001"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                MAIN HEADING TITLE
              </label>
              <input
                type="text"
                value={selectedSection.title}
                onChange={e => updateSelected({ title: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                SUBTITLE / TAGLINE
              </label>
              <input
                type="text"
                value={selectedSection.subtitle}
                onChange={e => updateSelected({ subtitle: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase tracking-wider"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                SUPPORTING COPY / DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={selectedSection.description || ''}
                onChange={e => updateSelected({ description: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
              />
            </div>

            {/* Primary CTA Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  BUTTON LABEL
                </label>
                <input
                  type="text"
                  value={selectedSection.ctaText || ''}
                  onChange={e => updateSelected({ ctaText: e.target.value })}
                  placeholder="SHOP DROP 001"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  BUTTON DESTINATION URL
                </label>
                <input
                  type="text"
                  value={selectedSection.ctaLink || ''}
                  onChange={e => updateSelected({ ctaLink: e.target.value })}
                  placeholder="/drop-001"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
                />
              </div>
            </div>

            {/* Background Image URL */}
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                BACKGROUND IMAGE URL
              </label>
              <input
                type="text"
                value={selectedSection.backgroundImage || ''}
                onChange={e => updateSelected({ backgroundImage: e.target.value })}
                placeholder="/images/apexora-racing-hero.jpg"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
