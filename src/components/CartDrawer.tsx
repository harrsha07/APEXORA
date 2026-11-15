'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon, TagIcon, ArrowRightIcon, TruckIcon, Slashes } from './icons';

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedDiscount,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!cartDrawerOpen) return null;

  const freeThreshold = settings.freeShippingThreshold || 1499;
  const amountNeeded = Math.max(0, freeThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
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

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-[#101216] border-l border-[#252930] flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-6 border-b border-[#252930] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#E10600]">
                APEXORA / YOUR SELECTION
              </p>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white tracking-wide uppercase mt-0.5">
                YOUR BAG <span className="text-[#E10600]">({cartCount})</span>
              </h2>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-2 text-[#8E939C] hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#15181E] px-6 py-3 border-b border-[#252930]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-white font-medium text-[11px] tracking-wider uppercase">
                <TruckIcon size={14} className="text-[#E10600]" />
                {amountNeeded === 0 ? (
                  <span className="text-emerald-400 font-bold">You unlocked FREE Express Shipping!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#E10600]">₹{amountNeeded.toLocaleString('en-IN')}</strong> for FREE shipping
                  </span>
                )}
              </span>
              <span className="text-[10px] font-bold text-[#8E939C]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#252930] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#E10600] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#1D2128]">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <Slashes size={44} className="text-[#E10600]" />
                <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white tracking-wide uppercase">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-[#8E939C] max-w-xs">
                  Your garage is empty. Head to Drop 001 and select your race garment.
                </p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    router.push('/drop-001');
                  }}
                  className="px-6 py-3 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase transition-colors"
                >
                  EXPLORE DROP 001 ↗
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.key} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-24 bg-[#181B22] border border-[#2B2F38] flex-shrink-0 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg text-white leading-tight uppercase">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-[#686D77] hover:text-[#E10600] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <TrashIcon size={14} />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#8E939C] tracking-wider uppercase mt-1 flex gap-3">
                        <span>SIZE: <strong className="text-white">{item.size}</strong></span>
                        <span>COLOUR: <strong className="text-white">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#30353E] bg-[#0A0C0E]">
                        <button
                          onClick={() => updateCartQuantity(item.key, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#A5A8AF] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.key, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#A5A8AF] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>

                      <span className="font-['Barlow_Condensed',sans-serif] font-bold text-lg text-white">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#252930] bg-[#0D0F13] space-y-4">
              {/* Promo code */}
              {appliedDiscount ? (
                <div className="flex items-center justify-between bg-[#151922] border border-[#E10600]/40 px-3 py-2 text-xs">
                  <div className="flex items-center gap-2 text-white">
                    <TagIcon size={14} className="text-[#E10600]" />
                    <span className="font-bold tracking-wider">{appliedDiscount.code}</span>
                    <span className="text-[#8E939C]">(-₹{discountAmount.toLocaleString('en-IN')})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-[#E10600] uppercase font-bold tracking-wider hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError('');
                      }}
                      placeholder="DISCOUNT CODE (e.g. APEX10)"
                      className="w-full bg-[#15181E] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2 outline-none uppercase tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 bg-[#252930] hover:bg-[#30353E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-[#ff4c52]">{couponError}</p>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs tracking-wider uppercase text-[#8E939C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E10600]">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#252930]">
                  <span className="font-['Barlow_Condensed',sans-serif] italic tracking-wide">ESTIMATED TOTAL</span>
                  <span className="font-['Barlow_Condensed',sans-serif] text-xl text-[#E10600]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-[2px] uppercase flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRightIcon size={16} />
                </button>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    router.push('/cart');
                  }}
                  className="w-full py-2.5 border border-[#30353E] hover:border-white text-[#C6C8CC] hover:text-white text-[11px] font-bold tracking-[1.5px] uppercase transition-colors"
                >
                  VIEW FULL SHOPPING BAG
                </button>
              </div>

              <p className="text-[10px] text-center text-[#686D77] uppercase tracking-wider">
                PCI-DSS Encrypted Checkout · 100% Secure Payment
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
