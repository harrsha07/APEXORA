'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { CloseIcon, PlusIcon, MinusIcon, CheckIcon, ShieldCheckIcon, TruckIcon } from './icons';

export default function ProductModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<'front' | 'back'>('front');

  if (!quickViewProduct) return null;

  const currentImage =
    activeImage === 'back' && quickViewProduct.backImage
      ? quickViewProduct.backImage
      : quickViewProduct.image;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#111418] border border-[#2B2F38] text-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#8E939C] hover:text-white bg-[#0A0C0E]/70 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <CloseIcon size={20} />
        </button>

        {/* Left Column: Image with Front / Back Switch */}
        <div className="bg-[#15171B] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#252930]">
          <div className="relative aspect-square flex items-center justify-center">
            <img
              src={currentImage}
              alt={quickViewProduct.name}
              className="max-h-[360px] w-full object-contain"
            />
            {quickViewProduct.tag && (
              <span className="absolute top-2 left-2 bg-[#E10600] text-white text-[9px] font-black tracking-widest px-2 py-0.5 uppercase">
                {quickViewProduct.tag}
              </span>
            )}
          </div>

          {/* Front / Back Toggle Buttons */}
          <div className="flex gap-2 pt-4 justify-center">
            <button
              onClick={() => setActiveImage('front')}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                activeImage === 'front'
                  ? 'border-[#E10600] bg-[#E10600] text-white'
                  : 'border-[#30353E] bg-[#1A1D24] text-[#A5A8AF] hover:text-white'
              }`}
            >
              FRONT VIEW
            </button>
            <button
              onClick={() => setActiveImage('back')}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                activeImage === 'back'
                  ? 'border-[#E10600] bg-[#E10600] text-white'
                  : 'border-[#30353E] bg-[#1A1D24] text-[#A5A8AF] hover:text-white'
              }`}
            >
              BACK GRAPHIC
            </button>
          </div>
        </div>

        {/* Right Column: Details & Size Selector */}
        <div className="p-8 flex flex-col justify-between bg-[#0D0F14]">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-2.5 py-1 rounded-sm text-[10px] font-bold tracking-[2px] text-[#E2E4E9] uppercase mb-2">
              <span className="w-2.5 h-0.5 bg-[#E10600]" />
              <span>DROP 001 / MOTORSPORT STREETWEAR</span>
            </div>

            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl md:text-4xl text-white tracking-normal uppercase leading-[1.12]">
              {quickViewProduct.name}
            </h2>

            <p className="text-xs text-[#9CA3AF] mt-1 uppercase tracking-wider font-medium">
              {quickViewProduct.subtitle}
            </p>

            <div className="flex items-baseline gap-3 my-4">
              <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.compareAtPrice && (
                <span className="text-sm text-[#7E8491] line-through">
                  ₹{quickViewProduct.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5">
                In Stock · Ready to dispatch
              </span>
            </div>

            <p className="text-xs text-[#D1D5DB] leading-relaxed line-clamp-3 font-normal">
              {quickViewProduct.description}
            </p>

            {/* Size selection */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-white">
                  SELECT SIZE
                </span>
                <span className="text-[10px] text-[#8E939C] uppercase tracking-wider">
                  Unisex Oversized Fit
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {quickViewProduct.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-black tracking-wider uppercase border transition-all ${
                      selectedSize === size
                        ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                        : 'border-[#30353E] bg-[#15171C] text-[#C6C8CC] hover:border-white hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white">
                QUANTITY
              </span>
              <div className="flex items-center border border-[#30353E] bg-[#15171C]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#A5A8AF] hover:text-white"
                >
                  <MinusIcon size={14} />
                </button>
                <span className="w-10 text-center text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#A5A8AF] hover:text-white"
                >
                  <PlusIcon size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-[#252930] space-y-3">
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-[2.5px] uppercase transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>ADD SIZE {selectedSize} TO BAG</span>
              <span>↗</span>
            </button>

            <div className="flex justify-between items-center text-[10px] text-[#8E939C] tracking-wider uppercase pt-2">
              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-[#E10600] hover:underline font-bold"
              >
                View Full Specifications & Care Guide →
              </Link>
              <span>SKU: {quickViewProduct.sku}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
