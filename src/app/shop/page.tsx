'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { SearchIcon, Slashes } from '@/components/icons';

export default function ShopPage() {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedColor, setSelectedColor] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeProducts = useMemo(() => products.filter(p => p.active), [products]);

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
  }, [activeProducts, selectedCategory, selectedColor, sortBy, searchQuery]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#252930] pb-8 mb-10">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-2">
          <Slashes size={18} />
          <span>GARMENTS & PERFORMANCE APPAREL</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white tracking-tight uppercase leading-none">
          SHOP ALL <span className="text-[#E10600]">PRODUCTS.</span>
        </h1>
        <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-2">
          Showing {filteredProducts.length} of {activeProducts.length} race-ready streetwear garments
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#111418] border border-[#252930] p-4 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-[#686D77] uppercase tracking-wider mr-1">CATEGORY:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#E10600] border-[#E10600] text-white'
                  : 'bg-[#15171C] border-[#2B2F38] text-[#A5A8AF] hover:text-white'
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
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2 pl-8 outline-none uppercase tracking-wider"
            />
            <SearchIcon size={14} className="absolute left-2.5 top-2.5 text-[#686D77]" />
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2 outline-none uppercase tracking-wider cursor-pointer"
          >
            <option value="featured">FEATURED</option>
            <option value="newest">NEWEST</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
          </select>
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
