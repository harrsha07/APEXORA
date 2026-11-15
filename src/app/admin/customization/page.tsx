'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Slashes, EyeIcon, CheckIcon, RefreshIcon } from '@/components/icons';

export default function WebsiteCustomizationPage() {
  const { draftState, updateDraft, publishChanges, showToast } = useStore();
  const settings = draftState.settings;

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleChange = (key: keyof typeof settings, value: any) => {
    updateDraft('settings', prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>VISUAL BRAND ARCHITECT</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            WEBSITE <span className="text-[#E10600]">CUSTOMIZATION.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Configure branding, color palette, racing typography, button geometry, and top announcement alerts.
          </p>
        </div>

        {/* Device toggle for preview */}
        <div className="flex items-center border border-[#30353E] bg-[#111418] p-1">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              previewDevice === 'desktop' ? 'bg-[#E10600] text-white' : 'text-[#8E939C] hover:text-white'
            }`}
          >
            🖥️ Desktop
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              previewDevice === 'mobile' ? 'bg-[#E10600] text-white' : 'text-[#8E939C] hover:text-white'
            }`}
          >
            📱 Mobile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Identity & Branding */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase border-b border-[#252930] pb-2">
              BRAND IDENTITY & LOGO
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  BRAND NAME
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={e => handleChange('siteName', e.target.value)}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  HEADER LOGO TEXT
                </label>
                <input
                  type="text"
                  value={settings.logoText}
                  onChange={e => handleChange('logoText', e.target.value)}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                BRAND TAGLINE
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={e => handleChange('tagline', e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider uppercase font-semibold"
              />
            </div>
          </div>

          {/* 2. Color Palette */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase border-b border-[#252930] pb-2">
              RACING COLOR SYSTEM
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  ACCENT RED
                </label>
                <div className="flex items-center gap-2 bg-[#15171C] border border-[#2B2F38] p-1.5">
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={e => handleChange('accentColor', e.target.value)}
                    className="w-7 h-7 bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-white uppercase">{settings.accentColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  RACING BLACK
                </label>
                <div className="flex items-center gap-2 bg-[#15171C] border border-[#2B2F38] p-1.5">
                  <input
                    type="color"
                    value={settings.backgroundColor}
                    onChange={e => handleChange('backgroundColor', e.target.value)}
                    className="w-7 h-7 bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-white uppercase">{settings.backgroundColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  CARBON BLACK
                </label>
                <div className="flex items-center gap-2 bg-[#15171C] border border-[#2B2F38] p-1.5">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={e => handleChange('secondaryColor', e.target.value)}
                    className="w-7 h-7 bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-white uppercase">{settings.secondaryColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  PANEL SURFACE
                </label>
                <div className="flex items-center gap-2 bg-[#15171C] border border-[#2B2F38] p-1.5">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={e => handleChange('primaryColor', e.target.value)}
                    className="w-7 h-7 bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-white uppercase">{settings.primaryColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Typography & Button Styles */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase border-b border-[#252930] pb-2">
              TYPOGRAPHY & BUTTON GEOMETRY
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  HEADING FONT FAMILY
                </label>
                <select
                  value={settings.headingFont}
                  onChange={e => handleChange('headingFont', e.target.value)}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold"
                >
                  <option value="Barlow Condensed">Barlow Condensed (Aggressive Racing)</option>
                  <option value="Rajdhani">Rajdhani (Technical Cockpit)</option>
                  <option value="DM Sans">DM Sans (Minimal Street)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  BUTTON GEOMETRY
                </label>
                <select
                  value={settings.buttonStyle}
                  onChange={e => handleChange('buttonStyle', e.target.value as any)}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold"
                >
                  <option value="skewed">Skewed Racing Angle (-6° aerodynamic)</option>
                  <option value="sharp">Sharp Rectangular (Industrial)</option>
                  <option value="rounded">Slightly Rounded</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Global Motorsport Background Image */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase border-b border-[#252930] pb-2">
              SITE-WIDE MOTORSPORT BACKGROUND IMAGE
            </h2>
            <p className="text-xs text-[#8E939C]">
              Applied across all store pages with a dark racing gradient overlay to guarantee text legibility.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  BACKGROUND IMAGE PRESET
                </label>
                <select
                  value={settings.backgroundImage || '/images/apexora-track-curb-bg.png'}
                  onChange={e => handleChange('backgroundImage', e.target.value)}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold"
                >
                  <option value="/images/apexora-track-curb-bg.png">
                    01. Racing Track Curb + Checkered Flag & Carbon Texture (Default)
                  </option>
                  <option value="/images/apexora-superbike-paddock.jpg">
                    02. APEXORA Superbike Paddock Grandstand
                  </option>
                  <option value="/images/apexora-night-track-bg.png">
                    03. Night Circuit Light Trails & Red Apex Kerb
                  </option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  CUSTOM IMAGE URL (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={settings.backgroundImage || ''}
                  onChange={e => handleChange('backgroundImage', e.target.value)}
                  placeholder="/images/apexora-track-curb-bg.png"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider"
                />
              </div>
            </div>
          </div>

          {/* 5. Top Announcement Bar */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#252930] pb-2">
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
                ANNOUNCEMENT TICKER BAR
              </h2>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
                <input
                  type="checkbox"
                  checked={settings.announcementActive}
                  onChange={e => handleChange('announcementActive', e.target.checked)}
                  className="accent-[#E10600] w-4 h-4"
                />
                <span>Active on Site</span>
              </label>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                PRIMARY ANNOUNCEMENT TEXT
              </label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={e => handleChange('announcementText', e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold tracking-wider"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  SUBTEXT (DESKTOP)
                </label>
                <input
                  type="text"
                  value={settings.announcementSubtext}
                  onChange={e => handleChange('announcementSubtext', e.target.value)}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  CLICK DESTINATION URL
                </label>
                <input
                  type="text"
                  value={settings.announcementLink}
                  onChange={e => handleChange('announcementLink', e.target.value)}
                  placeholder="/drop-001"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#252930] pb-3">
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase flex items-center gap-2">
                <EyeIcon size={16} className="text-[#E10600]" />
                <span>LIVE VISUAL PREVIEW</span>
              </h2>
              <span className="text-[10px] text-[#8E939C] uppercase font-mono">
                {previewDevice === 'desktop' ? '1280px View' : '390px Mobile View'}
              </span>
            </div>

            {/* Simulated Storefront Container */}
            <div
              className={`border border-[#30353E] bg-[#08090B] overflow-hidden mx-auto transition-all ${
                previewDevice === 'mobile' ? 'max-w-[340px] shadow-2xl' : 'w-full'
              }`}
            >
              {/* Simulated Announcement Bar */}
              {settings.announcementActive && (
                <div
                  className="py-1 px-3 text-[8px] font-bold tracking-widest uppercase text-white flex justify-between items-center"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  <span>{settings.announcementText}</span>
                  {previewDevice === 'desktop' && <span>{settings.announcementSubtext}</span>}
                </div>
              )}

              {/* Simulated Header */}
              <div className="p-3 bg-[#08090B] border-b border-[#252930] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#E10600] font-black italic text-lg leading-none">///</span>
                  <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-base tracking-tight text-white leading-none">
                    {settings.siteName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-[#A5A8AF] uppercase">
                  <span>SHOP</span>
                  <span>DROP 001</span>
                  <span className="px-1.5 py-0.5 bg-[#E10600] text-white rounded">BAG 2</span>
                </div>
              </div>

              {/* Simulated Hero Snippet */}
              <div className="p-6 bg-[#111418] border-b border-[#252930] text-center space-y-2 relative overflow-hidden">
                <span className="text-[8px] font-bold text-[#E10600] tracking-widest uppercase block">
                  {settings.tagline}
                </span>
                <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase leading-none">
                  BUILT FOR THE <span style={{ color: settings.accentColor }}>PURSUIT.</span>
                </h3>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    className={`px-4 py-1.5 text-[9px] font-black tracking-widest uppercase text-white ${
                      settings.buttonStyle === 'skewed'
                        ? 'skew-btn'
                        : settings.buttonStyle === 'rounded'
                        ? 'rounded'
                        : ''
                    }`}
                    style={{ backgroundColor: settings.accentColor }}
                  >
                    <span>SHOP NOW</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#7E8491] uppercase tracking-wider">
              Preview updates automatically in real-time as you tweak values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
