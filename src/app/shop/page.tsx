'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { SearchIcon, Slashes } from '@/components/icons';

export default function ShopPage() {
  const { products, collections } = useStore();
  const [selectedCollection, setSelectedCollection] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedColor, setSelectedColor] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeProducts = useMemo(() => products.filter(p => p.active), [products]);

  const activeCollections = useMemo(() => collections.filter(c => c.active), [collections]);

  const categories = useMemo(() => {
    const set = new Set(activeProducts.map(p => p.category));
    return ['ALL', ...Array.from(set)];
  }, [activeProducts]);

  const colors = useMemo(() => {
    const set = new Set(activeProducts.map(p => p.color));
    return ['ALL', ...Array.from(set)];
  }, [activeProducts]);

  const filteredProducts = useMemo(() => {
    return activeProducts
      .filter(p => {
        if (selectedCollection !== 'ALL') {
          const col = collections.find(c => c.id === selectedCollection || c.slug === selectedCollection);
          if (col && !col.productIds.includes(p.id)) return false;
        }
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
        if (selectedColor !== 'ALL' && p.color !== selectedColor) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.tag.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [activeProducts, collections, selectedCollection, selectedCategory, selectedColor, sortBy, searchQuery]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner on Solid Dark Plate */}
      <div className="bg-[#151515] border border-[#292929] p-8 sm:p-10 mb-8 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[2.5px] text-white uppercase mb-3">
          <Slashes size={18} className="text-[#E10600]" />
          <span>GARMENTS & PERFORMANCE APPAREL</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white tracking-normal uppercase leading-[1.1]">
          SHOP ALL <span className="text-[#E10600]">PRODUCTS.</span>
        </h1>
        <p className="text-xs text-[#858585] uppercase tracking-wider mt-2 font-medium">
          Showing {filteredProducts.length} of {activeProducts.length} race-ready streetwear garments
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col gap-4 bg-[#151515] border border-[#292929] p-4 mb-8 shadow-xl">
        {/* Collections Quick Filter */}
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-[#292929]">
          <span className="text-[10px] font-bold text-[#E10600] uppercase tracking-wider mr-1">COLLECTION:</span>
          <button
            onClick={() => setSelectedCollection('ALL')}
            className={`px-3 py-1 text-xs font-bold tracking-wider uppercase border transition-colors ${selectedCollection === 'ALL'
                ? 'bg-[#E10600] border-[#E10600] text-white shadow-md'
                : 'bg-[#111111] border-[#292929] text-[#B8B8B8] hover:text-white hover:border-[#E10600]'
              }`}
          >
            ALL
          </button>
          {activeCollections.map(col => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`px-3 py-1 text-xs font-bold tracking-wider uppercase border transition-colors ${selectedCollection === col.id
                  ? 'bg-[#E10600] border-[#E10600] text-white shadow-md'
                  : 'bg-[#111111] border-[#292929] text-[#B8B8B8] hover:text-white hover:border-[#E10600]'
                }`}
            >
              {col.id === 'apex-series' ? '★ ' + col.title.split('—')[0].trim() : col.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        {/* Categories & Search/Sort Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-[#858585] uppercase tracking-wider mr-1">CATEGORY:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-colors ${selectedCategory === cat
                    ? 'bg-[#E10600] border-[#E10600] text-white shadow-md'
                    : 'bg-[#111111] border-[#292929] text-[#B8B8B8] hover:text-white hover:border-[#E10600]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="FILTER BY NAME..."
                className="w-full bg-[#111111] border border-[#292929] text-white text-xs px-3 py-2 pl-8 outline-none uppercase tracking-wider placeholder-[#858585]"
              />
              <SearchIcon size={14} className="absolute left-2.5 top-2.5 text-[#858585]" />
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#111111] border border-[#292929] text-white text-xs px-3 py-2 outline-none uppercase tracking-wider cursor-pointer"
            >
              <option value="featured">FEATURED</option>
              <option value="newest">NEWEST</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-[#252930] bg-[#111418] p-8">
          <Slashes size={38} className="text-[#E10600]" />
          <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase mt-3">
            NO PRODUCTS MATCH YOUR FILTER
          </h3>
          <p className="text-xs text-[#8E939C] mt-1 mb-6">
            Try resetting your category or search keywords to view the catalogue.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedColor('ALL');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#E10600] text-white text-xs font-bold uppercase tracking-widest"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
