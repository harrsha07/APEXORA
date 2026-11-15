'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import AnnouncementBar from './AnnouncementBar';
import PreviewBanner from './PreviewBanner';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ProductModal from './ProductModal';
import SearchModal from './SearchModal';

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toastMessage, settings } = useStore();

  const isAdminRoute = pathname?.startsWith('/admin');

  // If maintenance mode is active and not on admin route
  if (settings.maintenanceMode && !isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex flex-col items-center justify-center p-6 text-center">
        <span className="text-[#E10600] font-black italic text-5xl mb-4">/// APEXORA</span>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl uppercase tracking-wider mb-2">
          PIT STOP IN PROGRESS
        </h1>
        <p className="text-[#A5A8AF] max-w-md text-sm mb-6">
          The APEXORA paddock is currently undergoing scheduled maintenance and system tuning. We will be back on track shortly.
        </p>
        <a
          href="/admin"
          className="text-xs uppercase tracking-widest text-[#E10600] hover:underline font-bold"
        >
          Administrator Login →
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#08090B] text-white selection:bg-[#E10600] selection:text-white">
      {!isAdminRoute && <PreviewBanner />}
      {!isAdminRoute && <AnnouncementBar />}
      {!isAdminRoute && <Header />}

      <main className="flex-1">{children}</main>

      {!isAdminRoute && <Footer />}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductModal />
      <SearchModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-5 py-3 font-bold text-xs tracking-wider uppercase shadow-2xl flex items-center gap-2 border-l-4 border-[#E10600] animate-in slide-in-from-bottom duration-200">
          <span className="text-[#E10600] font-black">///</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
