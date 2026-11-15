'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Collection } from '@/types';
import { Slashes, PlusIcon, EditIcon, TrashIcon } from '@/components/icons';

export default function CollectionsManagerPage() {
  const { draftState, saveCollection, deleteCollection, products, showToast } = useStore();
  const collections = draftState.collections;

  const [form, setForm] = useState<Collection>({
    id: `col-${Date.now()}`,
    slug: 'drop-002',
    title: 'DROP 002 — SPEED PROTOCOL',
    tagline: 'HIGH-OCTANE EVOLUTION',
    description: 'Upcoming drop exploring carbon aerodynamics and telemetry graphics.',
    bannerImage: '/images/apexora-racing-hero.jpg',
    productIds: ['apex-one', 'redline'],
    active: true,
    order: collections.length + 1
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (c: Collection) => {
    setForm({ ...c });
    setIsEditing(true);
  };

  const handleReset = () => {
    setForm({
      id: `col-${Date.now()}`,
      slug: '',
      title: '',
      tagline: '',
      description: '',
      bannerImage: '/images/apexora-racing-hero.jpg',
      productIds: [],
      active: true,
      order: collections.length + 1
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      showToast('Title and URL slug are required');
      return;
    }
    saveCollection(form);
    handleReset();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>CURATED SERIES & RELEASES</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            COLLECTION <span className="text-[#E10600]">MANAGER.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Organize garments into drops, capsule series, and promotional lookbooks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form (5 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            {isEditing ? 'EDIT COLLECTION' : 'NEW COLLECTION'}
          </h2>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              COLLECTION TITLE *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. DROP 002 — SPEED PROTOCOL"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold tracking-wider"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                URL SLUG *
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                placeholder="drop-002"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                TAGLINE
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={e => setForm({ ...form, tagline: e.target.value })}
                placeholder="HIGH-OCTANE EVOLUTION"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              BANNER IMAGE URL
            </label>
            <input
              type="text"
              value={form.bannerImage}
              onChange={e => setForm({ ...form, bannerImage: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
            />
          </div>

          {/* Product checklist */}
          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-2">
              ASSIGNED PRODUCTS
            </label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto p-2 bg-[#15171C] border border-[#2B2F38]">
              {products.map(p => {
                const checked = form.productIds.includes(p.id);
                return (
                  <label key={p.id} className="flex items-center gap-2 text-xs text-white uppercase cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={e => {
                        const next = e.target.checked
                          ? [...form.productIds, p.id]
                          : form.productIds.filter(id => id !== p.id);
                        setForm({ ...form, productIds: next });
                      }}
                      className="accent-[#E10600]"
                    />
                    <span>{p.name} ({p.color})</span>
                  </label>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase pt-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm({ ...form, active: e.target.checked })}
              className="accent-[#E10600] w-4 h-4"
            />
            <span>Active Collection</span>
          </label>

          <div className="flex gap-2 pt-4 border-t border-[#1C1F26]">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E10600] text-white text-xs font-black tracking-widest uppercase"
            >
              {isEditing ? 'SAVE COLLECTION EDITS' : 'CREATE COLLECTION'}
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

        {/* Collections List (7 cols) */}
        <div className="lg:col-span-7 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            ALL COLLECTIONS ({collections.length})
          </h2>

          <div className="divide-y divide-[#1D2128]">
            {collections.map(col => (
              <div key={col.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-[#181B22] border border-[#2B2F38] overflow-hidden flex-shrink-0">
                    <img src={col.bannerImage} alt={col.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-['Barlow_Condensed',sans-serif] font-bold text-lg text-white uppercase leading-tight">
                      {col.title}
                    </h3>
                    <span className="text-[11px] text-[#8E939C] uppercase block">
                      /{col.slug} · {col.productIds.length} Products Assigned
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(col)}
                    className="p-2 border border-[#30353E] hover:border-white text-white rounded text-xs"
                    title="Edit"
                  >
                    <EditIcon size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete collection "${col.title}"?`)) {
                        deleteCollection(col.id);
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
