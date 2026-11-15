'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Slashes, InstagramIcon, YoutubeIcon, WhatsAppIcon, ArrowRightIcon, CheckIcon } from './icons';

export default function Footer() {
  const { settings, navigation } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[#292929] text-[#B8B8B8] pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#292929]">
          {/* Brand info on Solid Dark Plate */}
          <div className="lg:col-span-2 space-y-4 bg-[#151515] border border-[#292929] p-6 sm:p-8 shadow-xl">
            <Link href="/" className="flex items-center gap-2 select-none">
              <Slashes size={28} className="text-[#E10600]" />
              <div className="flex flex-col">
                <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl tracking-tight text-white leading-tight">
                  APEXORA
                </span>
                <span className="text-[8px] font-['DM_Sans',sans-serif] font-semibold tracking-[2.8px] text-[#B8B8B8] uppercase leading-none mt-0.5">
                  MOTORSPORT CULTURE
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#B8B8B8] max-w-sm leading-relaxed font-normal">
              Motorsport attitude reworked for everyday life. High-density racing apparel inspired by circuit telemetry, apex lines, and the paddock lifestyle.
            </p>
            <div className="text-[11px] font-black italic text-[#E10600] tracking-widest uppercase font-['Barlow_Condensed',sans-serif]">
              BUILT FOR THE PURSUIT.
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl || 'https://www.instagram.com/harrsha.58/'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#111111] border border-[#292929] hover:border-[#E10600] text-white hover:text-[#E10600] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={settings.youtubeUrl || 'https://www.youtube.com/@harrsha.58'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#111111] border border-[#292929] hover:border-[#E10600] text-white hover:text-[#E10600] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon size={17} />
              </a>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#111111] border border-[#292929] hover:border-[#E10600] text-white hover:text-[#E10600] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={17} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg text-white tracking-wider uppercase">
              SHOP APEXORA
            </h4>
            <ul className="space-y-2 text-xs tracking-wider uppercase">
              <li>
                <Link href="/shop" className="hover:text-[#E10600] transition-colors">
                  Shop All Garments
                </Link>
              </li>
              <li>
                <Link href="/drop-001" className="hover:text-[#E10600] transition-colors text-white font-semibold">
                  Drop 001 — The Pursuit
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#E10600] transition-colors">
                  Collections & Series
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-[#E10600] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#E10600] transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Culture */}
          <div className="space-y-3">
            <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg text-white tracking-wider uppercase">
              CULTURE & HELP
            </h4>
            <ul className="space-y-2 text-xs tracking-wider uppercase">
              <li>
                <Link href="/about" className="hover:text-[#E10600] transition-colors">
                  About APEXORA
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-[#E10600] transition-colors">
                  The Racing Mindset
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#E10600] transition-colors text-white">
                  Track Your Package
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E10600] transition-colors">
                  Contact Pit Crew
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#E10600] transition-colors">
                  FAQs & Sizing Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-lg text-white tracking-wider uppercase">
              PADDOCK PASS
            </h4>
            <p className="text-xs text-[#8E939C] leading-relaxed">
              Subscribe for private drop alerts, secret track meets, and early access to Drop 002.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#E10600] font-bold tracking-wider uppercase">
                <CheckIcon size={16} />
                <span>You are on the starting grid!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#111111] border border-[#292929] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider transition-colors placeholder-[#858585]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#E10600] hover:bg-[#FF1E17] text-white flex items-center justify-center transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-[#858585] block">
                  Zero spam. Unsubscribe anytime with one click.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wider uppercase text-[#858585]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>© {new Date().getFullYear()} APEXORA MOTORSPORT CULTURE BY HARSHA.</span>
            <span>INDIA · DROP 001</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/shipping" className="hover:text-white transition-colors">
              Shipping
            </Link>
            <Link href="/returns" className="hover:text-white transition-colors">
              Returns & Exchange
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin" className="text-[#E10600] font-bold hover:underline">
              Control Room (Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
