'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Slashes, BagIcon, SearchIcon, UserIcon, MenuIcon, CloseIcon } from './icons';

export default function Header() {
  const { settings, navigation, cartCount, setCartDrawerOpen, setSearchModalOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const headerNav = navigation
    .filter(item => item.visible && (item.location === 'header' || item.location === 'both'))
    .sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-50 bg-[#080808] border-b border-[#292929] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] md:h-[82px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group select-none">
          <Slashes size={28} className="text-[#E10600] group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl md:text-3xl tracking-tight text-white leading-none">
              APEXORA
            </span>
            <span className="text-[7px] md:text-[8px] font-['DM_Sans',sans-serif] font-semibold tracking-[2.8px] text-[#B8B8B8] uppercase leading-none mt-0.5">
              MOTORSPORT CULTURE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[12px] font-bold tracking-[1.8px] uppercase">
          {headerNav.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-colors flex items-center gap-1.5 relative py-1 ${
                  isActive ? 'text-[#E10600]' : 'text-[#B8B8B8] hover:text-white'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="bg-[#E10600] text-white text-[8px] font-black px-1.5 py-0.2 rounded-sm tracking-widest">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E10600]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-[#B8B8B8] hover:text-white hover:bg-[#151515] rounded transition-colors"
            aria-label="Search products"
          >
            <SearchIcon size={19} />
          </button>

          {/* Account */}
          <Link
            href="/account"
            className="p-2 text-[#B8B8B8] hover:text-white hover:bg-[#151515] rounded transition-colors hidden sm:block"
            aria-label="My Account"
          >
            <UserIcon size={19} />
          </Link>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-2 border border-[#292929] hover:border-[#E10600] bg-[#111111] hover:bg-[#151515] text-white px-3.5 py-2 text-[11px] font-black tracking-widest uppercase transition-all shadow-md"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <BagIcon size={16} className="text-[#E10600]" />
            <span>BAG ({cartCount})</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 text-white hover:text-[#E10600] lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111111] border-b border-[#292929] px-6 py-6 shadow-2xl relative z-60">
          <nav className="flex flex-col gap-4 text-sm font-bold tracking-[2px] uppercase">
            {headerNav.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-[#292929] flex items-center justify-between ${
                  pathname === item.href ? 'text-[#E10600]' : 'text-white hover:text-[#E10600]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-[#E10600] text-white text-[9px] px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#B8B8B8] hover:text-white flex items-center gap-2 mt-2"
            >
              <UserIcon size={16} />
              <span>Customer Account</span>
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#B8B8B8] hover:text-white flex items-center gap-2"
            >
              <span>Track Your Package</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#E10600] flex items-center gap-2 border-t border-[#292929] pt-4"
            >
              <span>/// Admin Control Room</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
