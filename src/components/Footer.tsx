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
    <footer className="bg-[#08090B] border-t border-[#252930] text-[#A5A8AF] pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#1C1F26]">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 select-none">
              <Slashes size={28} className="text-[#E10600]" />
              <div className="flex flex-col">
                <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl tracking-tight text-white leading-none">
                  APEXORA
                </span>
                <span className="text-[7.5px] font-['DM_Sans',sans-serif] font-semibold tracking-[2.8px] text-[#A5A8AF] uppercase leading-none mt-0.5">
                  MOTORSPORT CULTURE
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#8E939C] max-w-sm leading-relaxed">
              Motorsport attitude reworked for everyday life. High-density racing apparel inspired by circuit telemetry, apex lines, and the paddock lifestyle.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl || 'https://www.instagram.com/harrsha.58/'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#2B2F38] hover:border-[#E10600] text-[#C6C8CC] hover:text-[#E10600] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={settings.youtubeUrl || 'https://www.youtube.com/@harrsha.58'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#2B2F38] hover:border-[#E10600] text-[#C6C8CC] hover:text-[#E10600] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon size={17} />
              </a>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#2B2F38] hover:border-[#E10600] text-[#C6C8CC] hover:text-[#E10600] transition-colors"
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
                    className="w-full bg-[#111418] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#E10600] hover:bg-[#ff1e17] text-white flex items-center justify-center transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-[#636872] block">
                  Zero spam. Unsubscribe anytime with one click.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wider uppercase text-[#737883]">
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
