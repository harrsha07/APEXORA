'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { DiscountCode } from '@/types';
import { Slashes, PlusIcon, EditIcon, TrashIcon, TagIcon } from '@/components/icons';

export default function DiscountsManagerPage() {
  const { draftState, saveDiscount, deleteDiscount, showToast } = useStore();
  const discounts = draftState.discounts;

  const [form, setForm] = useState<DiscountCode>({
    id: `disc-${Date.now()}`,
    code: '',
    type: 'percentage',
    value: 10,
    minOrderValue: 999,
    usageLimit: 100,
    usageCount: 0,
    active: true,
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (d: DiscountCode) => {
    setForm({ ...d });
    setIsEditing(true);
  };

  const handleReset = () => {
    setForm({
      id: `disc-${Date.now()}`,
      code: '',
      type: 'percentage',
      value: 10,
      minOrderValue: 999,
      usageLimit: 100,
      usageCount: 0,
      active: true,
      description: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || form.value <= 0) {
      showToast('Coupon code and discount value are required');
      return;
    }
    saveDiscount({ ...form, code: form.code.trim().toUpperCase() });
    handleReset();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>PROMOTIONS & SPECIAL OFFERS</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            DISCOUNTS & <span className="text-[#E10600]">OFFERS.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Configure percentage promo codes, flat rebates, free shipping triggers, and minimum spend requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form (5 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            {isEditing ? 'EDIT DISCOUNT CODE' : 'CREATE NEW PROMO CODE'}
          </h2>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              PROMO CODE *
            </label>
            <input
              type="text"
              required
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
              placeholder="e.g. APEX10"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono font-bold uppercase tracking-widest"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                DISCOUNT TYPE
              </label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as any })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Flat Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                VALUE ({form.type === 'percentage' ? '%' : '₹'}) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.value}
                onChange={e => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                MINIMUM ORDER VALUE (₹)
              </label>
              <input
                type="number"
                min="0"
                value={form.minOrderValue}
                onChange={e => setForm({ ...form, minOrderValue: Number(e.target.value) })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                USAGE LIMIT
              </label>
              <input
                type="number"
                min="1"
                value={form.usageLimit || ''}
                onChange={e => setForm({ ...form, usageLimit: Number(e.target.value) || undefined })}
                placeholder="100"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              OFFER DESCRIPTION
            </label>
            <input
              type="text"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="10% OFF on all Drop 001 orders over ₹999"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase pt-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm({ ...form, active: e.target.checked })}
              className="accent-[#E10600] w-4 h-4"
            />
            <span>Coupon Active on Store</span>
          </label>

          <div className="flex gap-2 pt-4 border-t border-[#1C1F26]">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E10600] text-white text-xs font-black tracking-widest uppercase"
            >
              {isEditing ? 'SAVE CODE EDITS' : 'CREATE DISCOUNT CODE'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 border border-[#30353E] text-white text-xs font-bold uppercase"
              >
                CANCEL
              </button>
            )}
          </div>
        </form>

        {/* Discounts List (7 cols) */}
        <div className="lg:col-span-7 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            ACTIVE PROMOTIONAL CODES ({discounts.length})
          </h2>

          <div className="divide-y divide-[#1D2128]">
            {discounts.map(d => (
              <div key={d.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-white px-2 py-1 bg-[#181B22] border border-[#2B2F38] tracking-widest">
                      {d.code}
                    </span>
                    <span className="font-bold text-emerald-400 text-xs">
                      {d.type === 'percentage' ? `${d.value}% OFF` : `₹${d.value} FLAT OFF`}
                    </span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      d.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {d.active ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </div>
                  <p className="text-xs text-[#8E939C]">{d.description}</p>
                  <span className="text-[10px] text-[#6F747F] block">
                    Min Order: ₹{d.minOrderValue} · Used: {d.usageCount} times {d.usageLimit ? `/ ${d.usageLimit} max` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(d)}
                    className="p-2 border border-[#30353E] hover:border-white text-white rounded text-xs"
                    title="Edit"
                  >
                    <EditIcon size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete coupon code "${d.code}"?`)) {
                        deleteDiscount(d.id);
                      }
                    }}
                    className="p-2 border border-[#30353E] hover:border-[#E10600] text-[#ff6b70] rounded text-xs"
                    title="Delete"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
