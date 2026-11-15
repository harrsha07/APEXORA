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
    <article className="group flex flex-col bg-[#151515] border border-[#292929] hover:border-[#E10600] transition-all duration-300 shadow-xl overflow-hidden">
      {/* Image Container with Solid Dark Background */}
      <div className="relative aspect-[4/3] bg-[#111111] overflow-hidden border-b border-[#292929] flex items-center justify-center">
        {/* Red Tag / Category badge - Prominent Solid Bar */}
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 bg-[#E10600] text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase shadow-md select-none">
            {product.tag}
          </span>
        )}

        {/* Exclusive / Sale badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-10 bg-[#151515] border border-[#292929] text-white text-[8px] font-bold tracking-wider px-2 py-0.5 uppercase select-none">
            {product.badge}
          </span>
        )}

        {/* Link to detail page */}
        <Link
          href={`/product/${product.id}`}
          className="block w-full h-full relative cursor-pointer group-hover:scale-105 transition-transform duration-500 flex items-center justify-center"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={`${product.name} garment`}
            className="w-full h-full object-contain p-4 transition-opacity duration-300"
          />
        </Link>

        {/* Quick View Pill */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-3 right-3 z-10 bg-[#080808]/90 hover:bg-[#E10600] text-white text-[9px] font-bold tracking-wider px-2.5 py-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all uppercase"
          aria-label={`Quick view ${product.name}`}
        >
          <span>QUICK VIEW</span>
          <ArrowUpRightIcon size={12} />
        </button>
      </div>

      {/* Info Container on Solid Background */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#151515]">
        <div>
          <div className="flex items-center justify-between text-[10px] font-bold tracking-[2px] text-[#E10600] uppercase mb-1.5">
            <span>0{index + 1} / APEXORA DROP 001</span>
            {product.stock <= 10 && product.stock > 0 && (
              <span className="text-amber-400 font-semibold">ONLY {product.stock} LEFT</span>
            )}
            {product.stock === 0 && (
              <span className="text-rose-400 font-semibold">SOLD OUT</span>
            )}
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl sm:text-3xl text-white tracking-normal uppercase group-hover:text-[#E10600] transition-colors leading-[1.15]">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#B8B8B8] line-clamp-1 mt-1 font-normal">
            {product.subtitle}
          </p>

          <div className="mt-3">
            <span className="text-[10px] font-bold text-[#B8B8B8] tracking-widest uppercase bg-[#111111] border border-[#292929] px-2.5 py-1 inline-block">
              COLOUR · <strong className="text-white font-bold">{product.color.toUpperCase()}</strong>
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-6 pt-4 border-t border-[#292929]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl sm:text-3xl text-white">
              {formattedPrice}
            </span>
            {formattedComparePrice && (
              <span className="text-xs text-[#858585] line-through">
                {formattedComparePrice}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/product/${product.id}`}
              className="py-3 px-3 border border-[#292929] hover:border-white bg-[#111111] text-center text-white text-[10px] font-black tracking-widest uppercase transition-colors"
            >
              VIEW DETAILS
            </Link>

            <button
              onClick={() => setQuickViewProduct(product)}
              className="py-3 px-3 bg-[#E10600] hover:bg-[#FF1E17] text-white text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1 transition-colors shadow-md shadow-[#E10600]/25"
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
