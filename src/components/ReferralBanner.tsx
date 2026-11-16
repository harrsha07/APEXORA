'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Slashes, CheckIcon, ArrowRightIcon } from '@/components/icons';

interface ReferralBannerProps {
  variant?: 'drawer' | 'page' | 'checkout';
  className?: string;
}

export default function ReferralBanner({ variant = 'drawer', className = '' }: ReferralBannerProps) {
  const { hasReferred, appliedDiscount, discountAmount, unlockReferralDiscount, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const isReferralActive =
    appliedDiscount?.code === 'RIDER20' ||
    appliedDiscount?.code === 'REFERRAL20' ||
    (appliedDiscount?.type === 'percentage' && appliedDiscount?.value === 20 && hasReferred);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/?ref=rider`;
    }
    return 'http://localhost:3000/?ref=rider';
  };

  const handleWhatsAppShare = () => {
    const url = getShareUrl();
    const message = encodeURIComponent(
      `Check out APEXORA Motorsport Culture — premium heavyweight racing streetwear & oversized T-shirts! Use my link for 20% instant OFF: ${url}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
    unlockReferralDiscount();
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      unlockReferralDiscount();
      showToast('🔗 Referral link copied! 20% discount applied to your order.');
    } catch (e) {
      unlockReferralDiscount();
    }
  };

  // 1. ALREADY UNLOCKED / APPLIED STATE
  if (isReferralActive) {
    return (
      <div
        className={`bg-gradient-to-r from-[#181112] via-[#141414] to-[#111612] border-2 border-emerald-500/80 p-4 relative overflow-hidden shadow-lg ${className}`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckIcon size={16} className="text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[2px] text-emerald-400">
                REFERRAL ACTIVE · 20% DISCOUNT APPLIED
              </span>
              <span className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-wider">
                -20% OFF
              </span>
            </div>

            <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg sm:text-xl text-white uppercase leading-tight mt-0.5">
              YOU SAVED {discountAmount > 0 ? `₹${discountAmount.toLocaleString('en-IN')}` : '20%'} WITH REFERRAL!
            </h4>

            <p className="text-[11px] text-[#A8ABB2] mt-0.5">
              20% instant discount has been deducted from your order. Thank you for representing APEXORA!
            </p>

            <div className="mt-2.5 flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="text-[10px] font-bold text-white hover:text-emerald-400 uppercase tracking-wider underline flex items-center gap-1 transition-colors"
              >
                <span>{copied ? '✓ Link Copied!' : 'Copy Referral Link Again'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. HIGHLIGHTED UNCLAIMED STATE (PROMPT TO REFER & GET 20% INSTANT DISCOUNT)
  return (
    <div
      className={`bg-gradient-to-r from-[#1F1214] via-[#181315] to-[#121214] border-2 border-[#E10600] p-4 sm:p-5 relative overflow-hidden shadow-xl animate-in fade-in duration-300 ${className}`}
    >
      {/* Red Ambient Glow & Corner Flag Stripe */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E10600]/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 bg-[#E10600] text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-3 py-1 shadow-md select-none">
        INSTANT 20% OFF
      </div>

      <div className="relative z-10">
        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
          <span className="text-[10px] font-black tracking-[2.5px] uppercase text-[#E10600]">
            SPECIAL REFERRAL OFFER
          </span>
        </div>

        {/* Title */}
        <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl sm:text-2xl text-white uppercase leading-tight">
          REFER A FRIEND &amp; GET <span className="text-[#E10600]">20% INSTANT DISCOUNT.</span>
        </h4>

        {/* Description */}
        <p className="text-xs text-[#C6C8CC] mt-1 leading-relaxed max-w-lg">
          Share APEXORA with a friend or fellow rider to instantly unlock <strong className="text-white">20% OFF</strong> your entire bag and checkout payment.
        </p>

        {/* Quick Action Buttons */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
          {/* WhatsApp Direct Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-black text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-md transition-all active:scale-95"
            title="Share via WhatsApp and instantly get 20% OFF"
          >
            <span>💬 SHARE ON WHATSAPP (INSTANT 20% OFF)</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-[#1A1D24] hover:bg-[#252A35] border border-[#3A404E] hover:border-white text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all active:scale-95"
            title="Copy your referral link to unlock 20% discount"
          >
            <span>{copied ? '✓ COPIED & 20% APPLIED!' : '🔗 COPY LINK & APPLY 20%'}</span>
          </button>
        </div>

        <p className="text-[9px] text-[#8E939C] uppercase tracking-wider mt-2.5 flex items-center gap-1.5">
          <span>⚡ No wait time — your 20% discount is applied immediately upon sharing!</span>
        </p>
      </div>
    </div>
  );
}
