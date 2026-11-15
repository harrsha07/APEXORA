'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { SearchIcon, CloseIcon, ArrowRightIcon } from './icons';

export default function SearchModal() {
  const { searchModalOpen, setSearchModalOpen, products } = useStore();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.active &&
        (p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-80 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      <div className="relative bg-[#111111] border border-[#292929] text-white w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Search Input Box */}
        <div className="p-4 sm:p-6 border-b border-[#292929] flex items-center gap-3 bg-[#151515]">
          <SearchIcon size={20} className="text-[#E10600] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, SERIES, COLOURS..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-[#858585] text-sm md:text-base font-bold tracking-wider uppercase outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#858585] hover:text-white p-1"
            >
              <CloseIcon size={16} />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="text-xs uppercase font-bold text-[#858585] hover:text-[#E10600] pl-2 border-l border-[#292929]"
          >
            ESC
          </button>
        </div>

        {/* Quick Tags when empty */}
        {!query && (
          <div className="p-6 bg-[#111111]">
            <p className="text-[10px] font-bold tracking-[2px] text-[#858585] uppercase mb-3">
              POPULAR SEARCHES
            </p>
            <div className="flex flex-wrap gap-2">
              {['APEX ONE', 'REDLINE', 'AFTER DARK', 'CIRCUIT', 'OVERSIZED', 'JET BLACK', 'DROP 001'].map(
                tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs font-bold tracking-wider uppercase bg-[#151515] border border-[#292929] hover:border-[#E10600] hover:text-[#E10600] text-white transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#292929] bg-[#111111]">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-[#858585]">
                <p className="text-sm font-bold uppercase tracking-wider text-white">
                  No products found for "{query}"
                </p>
                <p className="text-xs mt-1">
                  Try searching for "APEX ONE", "REDLINE", or "TEE".
                </p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setSearchModalOpen(false)}
                  className="py-3 flex items-center justify-between group hover:bg-[#161920] px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-16 bg-[#181B22] border border-[#252930] flex-shrink-0 p-1">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-[#E10600] uppercase tracking-wider block">
                        {product.tag}
                      </span>
                      <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg text-white group-hover:text-[#E10600] uppercase">
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-[#8E939C] uppercase">
                        COLOUR: {product.color}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-['Barlow_Condensed',sans-serif] font-bold text-lg text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRightIcon
                      size={16}
                      className="text-[#6F747F] group-hover:text-[#E10600] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
