'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Slashes, CheckIcon } from '@/components/icons';

export default function WebsiteSettingsPage() {
  const { draftState, updateDraft, showToast } = useStore();
  const settings = draftState.settings;

  const handleChange = (key: keyof typeof settings, value: any) => {
    updateDraft('settings', prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Website and business settings saved to draft.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>COMMERCE & BUSINESS PARAMETERS</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            STORE <span className="text-[#E10600]">SETTINGS.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Configure contact coordinates, shipping rates, free delivery thresholds, and store operational status.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Business & Contact Info (6 cols) */}
        <div className="lg:col-span-6 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            BUSINESS CONTACT CHANNELS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                CONTACT EMAIL
              </label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={e => handleChange('contactEmail', e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                BUSINESS PHONE
              </label>
              <input
                type="text"
                required
                value={settings.businessPhone}
                onChange={e => handleChange('businessPhone', e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                WHATSAPP DESK NUMBER
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={e => handleChange('whatsappNumber', e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                INSTAGRAM PROFILE URL
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={e => handleChange('instagramUrl', e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              YOUTUBE CHANNEL URL
            </label>
            <input
              type="url"
              value={settings.youtubeUrl}
              onChange={e => handleChange('youtubeUrl', e.target.value)}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              PHYSICAL PADDOCK / BUSINESS ADDRESS
            </label>
            <textarea
              rows={3}
              value={settings.businessAddress}
              onChange={e => handleChange('businessAddress', e.target.value)}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
            />
          </div>
        </div>

        {/* Right Column: Commerce, Shipping & Maintenance (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Shipping & Currency */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
              SHIPPING & CURRENCY RATES
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  DEFAULT CURRENCY
                </label>
                <input
                  type="text"
                  readOnly
                  value="INR (Indian Rupee)"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-[#8E939C] text-xs p-2.5 outline-none uppercase font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  CURRENCY SYMBOL
                </label>
                <input
                  type="text"
                  readOnly
                  value="₹"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-[#8E939C] text-xs p-2.5 outline-none font-black text-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  STANDARD SHIPPING FEE (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.shippingCharge}
                  onChange={e => handleChange('shippingCharge', Number(e.target.value))}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  FREE SHIPPING THRESHOLD (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.freeShippingThreshold}
                  onChange={e => handleChange('freeShippingThreshold', Number(e.target.value))}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold"
                />
              </div>
            </div>
            <p className="text-[10px] text-[#7E8491] uppercase tracking-wider">
              Orders valued at or above ₹{settings.freeShippingThreshold} automatically receive 100% free delivery.
            </p>
          </div>

          {/* Maintenance Mode */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
              STORE ACCESS CONTROL
            </h2>

            <label className="p-4 border border-[#2B2F38] bg-[#15171C] flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-black uppercase text-white block">
                  MAINTENANCE MODE (PIT STOP)
                </span>
                <span className="text-[11px] text-[#8E939C] block mt-0.5">
                  Temporarily pause public storefront with "Pit Stop In Progress" screen.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={e => handleChange('maintenanceMode', e.target.checked)}
                className="accent-[#E10600] w-5 h-5"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase transition-colors"
          >
            SAVE STORE SETTINGS
          </button>
        </div>
      </form>
    </div>
  );
}
