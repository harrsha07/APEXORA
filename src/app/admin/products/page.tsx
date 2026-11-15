'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Product } from '@/types';
import {
  Slashes,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  UploadIcon,
  EyeIcon,
  CheckIcon
} from '@/components/icons';

const BLANK_PRODUCT: Product = {
  id: '',
  name: '',
  subtitle: 'Racing oversized T-shirt',
  price: 1099,
  compareAtPrice: 1499,
  image: '/images/apex-one.jpg',
  backImage: '/images/apex-one.jpg',
  color: 'Jet Black',
  tag: '01 / RACE DNA',
  category: 'Oversized Tees',
  description: 'Heavyweight 240+ GSM combed cotton cut in a signature boxy drop-shoulder oversized silhouette.',
  specifications: {
    fit: 'Boxy drop-shoulder oversized fit',
    fabric: '100% Super-Combed Ring-Spun Cotton',
    weight: '240 GSM Ultra-Heavyweight',
    print: 'Dual-pass High Density + Puff Screenprint',
    origin: 'Designed in India · Track Tested',
    care: 'Machine wash cold inside-out · Do not iron direct on graphic'
  },
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  sku: 'APX-001',
  stock: 45,
  active: true,
  featured: true,
  badge: 'DROP 001',
  createdAt: new Date().toISOString()
};

export default function ProductManagerPage() {
  const { draftState, saveProduct, deleteProduct, duplicateProduct, showToast } = useStore();
  const products = draftState.products;

  const [form, setForm] = useState<Product>({ ...BLANK_PRODUCT, id: `prod-${Date.now()}` });
  const [isEditing, setIsEditing] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const handleEdit = (p: Product) => {
    setForm({ ...p });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setForm({ ...BLANK_PRODUCT, id: `prod-${Date.now()}` });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.price <= 0) {
      showToast('Product title and valid price are required');
      return;
    }
    saveProduct(form);
    handleReset();
  };

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.color.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>CATALOGUE & INVENTORY OPERATIONS</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            PRODUCT <span className="text-[#E10600]">MANAGER.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Add garments, configure front and back artwork visuals, update pricing, inventory stock, and size variants.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2"
        >
          <PlusIcon size={14} />
          <span>Add New Garment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Product Editor Form (5 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#252930] pb-3">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
              {isEditing ? 'EDIT PRODUCT' : 'CREATE NEW PRODUCT'}
            </h2>
            <span className="text-[10px] font-bold text-[#E10600] uppercase font-mono">
              {form.sku}
            </span>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              PRODUCT TITLE *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. APEX ONE"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              SUBTITLE
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={e => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Racing performance oversized tee"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                PRICE (₹) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                COMPARE-AT PRICE (₹)
              </label>
              <input
                type="number"
                value={form.compareAtPrice || ''}
                onChange={e => setForm({ ...form, compareAtPrice: Number(e.target.value) || undefined })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                COLOUR *
              </label>
              <input
                type="text"
                required
                value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })}
                placeholder="Jet Black"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                STOCK QUANTITY *
              </label>
              <input
                type="number"
                required
                min="0"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                TAG / BADGE
              </label>
              <input
                type="text"
                value={form.tag}
                onChange={e => setForm({ ...form, tag: e.target.value })}
                placeholder="01 / RACE DNA"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none tracking-wider uppercase font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                SKU CODE
              </label>
              <input
                type="text"
                value={form.sku}
                onChange={e => setForm({ ...form, sku: e.target.value })}
                placeholder="APX-001"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono uppercase"
              />
            </div>
          </div>

          {/* Front & Back Image URLs */}
          <div className="space-y-3 pt-2 border-t border-[#1C1F26]">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                FRONT IMAGE URL *
              </label>
              <input
                type="text"
                required
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="/images/apex-one.jpg"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                BACK GRAPHIC IMAGE URL
              </label>
              <input
                type="text"
                value={form.backImage || ''}
                onChange={e => setForm({ ...form, backImage: e.target.value })}
                placeholder="/images/apex-one.jpg"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              GARMENT DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
              <input
                type="checkbox"
                checked={form.active}
                onChange={e => setForm({ ...form, active: e.target.checked })}
                className="accent-[#E10600] w-4 h-4"
              />
              <span>Published on Store</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={e => setForm({ ...form, featured: e.target.checked })}
                className="accent-[#E10600] w-4 h-4"
              />
              <span>Featured Item</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4 border-t border-[#1C1F26]">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase"
            >
              {isEditing ? 'SAVE PRODUCT EDITS' : 'SAVE NEW PRODUCT'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 border border-[#30353E] hover:border-white text-white text-xs font-bold uppercase tracking-wider"
              >
                CANCEL
              </button>
            )}
          </div>
        </form>

        {/* Products List Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252930] pb-3">
            <div>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
                ACTIVE PRODUCTS ({products.length})
              </h2>
              <span className="text-xs text-[#8E939C]">All garments in current catalogue</span>
            </div>

            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-1.5 outline-none uppercase tracking-wider"
            />
          </div>

          <div className="divide-y divide-[#1D2128]">
            {filtered.map(p => (
              <div key={p.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-[#181B22] border border-[#2B2F38] flex-shrink-0 p-1">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#E10600] uppercase tracking-wider block">
                      {p.tag}
                    </span>
                    <h3 className="font-['Barlow_Condensed',sans-serif] font-bold text-lg text-white uppercase leading-tight">
                      {p.name}
                    </h3>
                    <div className="text-[11px] text-[#8E939C] flex items-center gap-3 mt-0.5">
                      <span>₹{p.price.toLocaleString('en-IN')}</span>
                      <span>·</span>
                      <span>Stock: <strong>{p.stock}</strong></span>
                      <span>·</span>
                      <span className={p.active ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {p.active ? 'LIVE' : 'HIDDEN'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-2 border border-[#30353E] hover:border-white text-white rounded text-xs"
                    title="Edit Product"
                  >
                    <EditIcon size={14} />
                  </button>
                  <button
                    onClick={() => duplicateProduct(p.id)}
                    className="p-2 border border-[#30353E] hover:border-white text-white rounded text-xs"
                    title="Duplicate Product"
                  >
                    <CopyIcon size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete product "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    className="p-2 border border-[#30353E] hover:border-[#E10600] text-[#ff6b70] rounded text-xs"
                    title="Delete Product"
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
