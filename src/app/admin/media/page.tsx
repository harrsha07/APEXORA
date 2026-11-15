'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { MediaItem } from '@/types';
import { getSupabase } from '@/lib/supabase';
import {
  Slashes,
  UploadIcon,
  SearchIcon,
  TrashIcon,
  CopyIcon,
  CheckIcon,
  EyeIcon
} from '@/components/icons';

export default function MediaLibraryPage() {
  const { draftState, addMediaItem, deleteMediaItem, showToast } = useStore();
  const media = draftState.media;

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const supabase = getSupabase();
    let fileUrl = '';

    if (supabase) {
      try {
        const path = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')}`;
        const { error } = await supabase.storage.from('product-images').upload(path, file);
        if (!error) {
          const { data } = supabase.storage.from('product-images').getPublicUrl(path);
          fileUrl = data.publicUrl;
        }
      } catch (err) {
        console.warn('Storage upload error:', err);
      }
    }

    if (!fileUrl) {
      // Local object URL fallback
      fileUrl = URL.createObjectURL(file);
    }

    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      name: file.name,
      url: fileUrl,
      size: `${Math.round(file.size / 1024)} KB`,
      format: file.name.split('.').pop()?.toUpperCase() || 'JPG',
      altText: file.name,
      category: 'general',
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    addMediaItem(newItem);
    setUploading(false);
    e.target.value = '';
    showToast(`Uploaded "${file.name}" to media library`);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Asset URL copied to clipboard!');
  };

  const filteredMedia = media.filter(m => {
    if (selectedCategory !== 'ALL' && m.category !== selectedCategory) return false;
    if (search.trim() && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>PADDOCK ASSETS & PHOTOGRAPHY</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            MEDIA <span className="text-[#E10600]">LIBRARY.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Store, preview, and organize garment photography, circuit banners, and brand graphics.
          </p>
        </div>

        {/* Upload Box */}
        <label className="px-5 py-2.5 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-lg">
          <UploadIcon size={14} />
          <span>{uploading ? 'UPLOADING...' : 'UPLOAD NEW ASSET'}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,video/mp4"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111418] border border-[#252930] p-4">
        <div className="flex items-center gap-2">
          {['ALL', 'products', 'banners', 'lookbook', 'general'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#E10600] border-[#E10600] text-white'
                  : 'bg-[#15171C] border-[#2B2F38] text-[#8E939C] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="SEARCH ASSETS..."
            className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2 pl-8 outline-none uppercase"
          />
          <SearchIcon size={14} className="absolute left-2.5 top-2.5 text-[#686D77]" />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="bg-[#111418] border border-[#252930] hover:border-[#E10600] flex flex-col justify-between overflow-hidden group transition-all"
          >
            <div className="aspect-square bg-[#08090B] relative overflow-hidden flex items-center justify-center p-2">
              <img
                src={item.url}
                alt={item.altText}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-2 left-2 bg-black/80 text-[8px] font-mono text-white px-1.5 py-0.5 rounded">
                {item.format}
              </span>
            </div>

            <div className="p-3 bg-[#15171C] space-y-1">
              <span className="font-mono text-xs text-white truncate block font-bold">
                {item.name}
              </span>
              <span className="text-[10px] text-[#7E8491] block">
                {item.size} · {item.uploadedAt}
              </span>

              <div className="flex items-center justify-between pt-2 border-t border-[#252930]">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="text-[10px] text-[#E10600] font-bold uppercase hover:underline flex items-center gap-1"
                >
                  <CopyIcon size={12} />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete media asset "${item.name}"?`)) {
                      deleteMediaItem(item.id);
                    }
                  }}
                  className="text-[#6F747F] hover:text-[#ff6b70] p-1"
                  title="Delete"
                >
                  <TrashIcon size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
