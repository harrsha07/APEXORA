'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  Slashes,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TagIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@/components/icons';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedDiscount,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const freeThreshold = settings.freeShippingThreshold || 1499;
  const amountNeeded = Math.max(0, freeThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 max-w-xl mx-auto text-center">
        <Slashes size={44} className="text-[#E10600] mx-auto mb-4" />
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl text-white uppercase mb-2">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-xs text-[#8E939C] max-w-sm mx-auto mb-8 leading-relaxed">
          You haven&apos;t added any race garments to your selection yet. Explore Drop 001 to find your track-day setup.
        </p>
        <Link
          href="/drop-001"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-[2px] uppercase shadow-lg shadow-[#E10600]/30 transition-transform active:scale-95"
        >
          <span>EXPLORE DROP 001</span>
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>CONFIRM YOUR RACE SELECTION</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            SHOPPING BAG <span className="text-[#E10600]">({cartCount} ITEMS)</span>
          </h1>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8E939C] hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeftIcon size={14} />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="bg-[#111418] border border-[#252930] p-4 mb-8">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-white">
            <TruckIcon size={16} className="text-[#E10600]" />
            {amountNeeded === 0 ? (
              <span className="text-emerald-400">Congratulations! You unlocked FREE Express Shipping across India.</span>
            ) : (
              <span>
                Add <strong className="text-[#E10600]">₹{amountNeeded.toLocaleString('en-IN')}</strong> more to qualify for FREE SHIPPING
              </span>
            )}
          </span>
          <span className="font-bold text-[#8E939C]">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-[#252930] overflow-hidden rounded-full">
          <div
            className="h-full bg-[#E10600] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cart Line Items (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#111418] border border-[#252930] divide-y divide-[#1D2128]">
            {cart.map(item => (
              <div key={item.key} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-[#181B22] border border-[#2B2F38] flex-shrink-0 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-0.5">
                      COLOUR: <span className="text-white font-bold">{item.color}</span> · SIZE: <span className="text-white font-bold">{item.size}</span>
                    </p>
                    <p className="text-xs text-white font-bold mt-1 sm:hidden">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1C1F26]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#30353E] bg-[#15171C]">
                    <button
                      onClick={() => updateCartQuantity(item.key, -1)}
                      className="w-8 h-8 flex items-center justify-center text-[#A5A8AF] hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon size={12} />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.key, 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#A5A8AF] hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon size={12} />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white w-24 text-right">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-[#6F747F] hover:text-[#E10600] p-1.5 transition-colors"
                    aria-label="Remove item"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#8E939C] pt-2">
            <span>Garments reserved for 30 minutes in active session</span>
            <button
              onClick={() => {
                if (confirm('Clear entire shopping bag?')) {
                  cart.forEach(i => removeFromCart(i.key));
                }
              }}
              className="text-[#E10600] hover:underline uppercase font-bold"
            >
              Empty Bag
            </button>
          </div>
        </div>

        {/* Summary Card (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-6 sticky top-28">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase tracking-wider border-b border-[#252930] pb-3">
              ORDER SUMMARY
            </h2>

            {/* Promo Code Form */}
            {appliedDiscount ? (
              <div className="flex items-center justify-between bg-[#151922] border border-[#E10600]/40 p-3 text-xs">
                <div className="flex items-center gap-2">
                  <TagIcon size={16} className="text-[#E10600]" />
                  <span className="font-bold text-white">{appliedDiscount.code}</span>
                  <span className="text-[#8E939C]">(-₹{discountAmount.toLocaleString('en-IN')})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[10px] text-[#E10600] uppercase font-bold tracking-wider hover:underline"
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponError('');
                    }}
                    placeholder="PROMO CODE"
                    className="flex-1 bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2.5 outline-none uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[#252930] hover:bg-[#30353E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-[#ff4c52] pt-1">{couponError}</p>}
              </form>
            )}

            {/* Breakdown */}
            <div className="space-y-2 text-xs uppercase tracking-wider text-[#8E939C] border-t border-[#1C1F26] pt-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="text-white font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E10600]">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white font-bold">
                  {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-black text-white pt-4 border-t border-[#252930]">
                <span className="font-['Barlow_Condensed',sans-serif] italic tracking-wide">TOTAL</span>
                <span className="font-['Barlow_Condensed',sans-serif] text-2xl text-[#E10600]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-[2px] uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#E10600]/30 transition-transform active:scale-[0.99]"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRightIcon size={16} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#6F747F] uppercase tracking-wider">
              <ShieldCheckIcon size={14} className="text-[#8E939C]" />
              <span>Razorpay Encrypted & Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
