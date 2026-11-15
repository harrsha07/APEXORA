'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import { ArrowUpRightIcon, PlusIcon } from './icons';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { setQuickViewProduct } = useStore();

  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;
  const formattedComparePrice = product.compareAtPrice
    ? `₹${product.compareAtPrice.toLocaleString('en-IN')}`
    : null;

  return (
    <article className="group flex flex-col bg-[#111418] border border-[#252930] hover:border-[#E10600]/50 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-[#15171B] overflow-hidden border-b border-[#252930]">
        {/* Red Tag / Category badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 bg-[#E10600] text-white text-[9px] font-black tracking-widest px-2.5 py-1 uppercase shadow-md select-none">
            {product.tag}
          </span>
        )}

        {/* Exclusive / Sale badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-10 bg-[#252930]/90 border border-white/10 text-white text-[8px] font-bold tracking-wider px-2 py-0.5 uppercase backdrop-blur-sm select-none">
            {product.badge}
          </span>
        )}

        {/* Link to detail page */}
        <Link
          href={`/product/${product.id}`}
          className="block w-full h-full relative cursor-pointer group-hover:scale-105 transition-transform duration-500"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={`${product.name} garment`}
            className="w-full h-full object-contain p-3 transition-opacity duration-300"
          />
        </Link>

        {/* Quick View Pill */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-3 right-3 z-10 bg-black/80 hover:bg-[#E10600] text-white text-[9px] font-bold tracking-wider px-2.5 py-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all uppercase backdrop-blur-sm"
          aria-label={`Quick view ${product.name}`}
        >
          <span>QUICK VIEW</span>
          <ArrowUpRightIcon size={12} />
        </button>
      </div>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[9px] font-bold tracking-[1.8px] text-[#E10600] uppercase mb-1">
            <span>0{index + 1} / APEXORA DROP 001</span>
            {product.stock <= 10 && product.stock > 0 && (
              <span className="text-amber-400 font-semibold">ONLY {product.stock} LEFT</span>
            )}
            {product.stock === 0 && (
              <span className="text-rose-400 font-semibold">SOLD OUT</span>
            )}
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white tracking-tight uppercase group-hover:text-[#E10600] transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#8E939C] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          <p className="text-[10px] text-[#6F747F] tracking-widest uppercase mt-3">
            COLOUR · <span className="text-[#C6C8CC] font-bold">{product.color.toUpperCase()}</span>
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-5 pt-4 border-t border-[#1C1F26]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white">
              {formattedPrice}
            </span>
            {formattedComparePrice && (
              <span className="text-xs text-[#6F747F] line-through">
                {formattedComparePrice}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/product/${product.id}`}
              className="py-2.5 px-3 border border-[#3A3F4A] hover:border-white text-center text-white text-[10px] font-black tracking-widest uppercase transition-colors"
            >
              VIEW DETAILS
            </Link>

            <button
              onClick={() => setQuickViewProduct(product)}
              className="py-2.5 px-3 bg-[#E10600] hover:bg-[#ff1e17] text-white text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1 transition-colors"
            >
              <span>SELECT SIZE</span>
              <PlusIcon size={12} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
