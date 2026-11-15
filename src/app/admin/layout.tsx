'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { getSupabase } from '@/lib/supabase';
import {
  Slashes,
  EyeIcon,
  CheckIcon,
  CloseIcon,
  MenuIcon,
  LockIcon,
  ArrowRightIcon
} from '@/components/icons';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin', icon: '📊' },
  { label: 'Website Customization', href: '/admin/customization', icon: '🎨' },
  { label: 'Homepage Editor', href: '/admin/homepage', icon: '⚡' },
  { label: 'Product Manager', href: '/admin/products', icon: '👕' },
  { label: 'Collections', href: '/admin/collections', icon: '🏁' },
  { label: 'Media Library', href: '/admin/media', icon: '🖼️' },
  { label: 'Navigation Menus', href: '/admin/navigation', icon: '🧭' },
  { label: 'Pages & CMS', href: '/admin/pages', icon: '📝' },
  { label: 'Order Management', href: '/admin/orders', icon: '📦' },
  { label: 'Customers', href: '/admin/customers', icon: '👥' },
  { label: 'Discounts & Offers', href: '/admin/discounts', icon: '🏷️' },
  { label: 'SEO Management', href: '/admin/seo', icon: '🔍' },
  { label: 'Website Settings', href: '/admin/settings', icon: '⚙️' }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    setIsDraftMode,
    hasUnpublishedChanges,
    publishChanges,
    discardDraft,
    restoreDefaults,
    showToast
  } = useStore();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('admin@apexora.store');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if session exists in storage
    const session = localStorage.getItem('apexora_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }

    // Also check Supabase session if configured
    const supabase = getSupabase();
    if (supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session) {
          setIsAuthenticated(true);
        }
      });
    }
    setCheckingAuth(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword
        });
        if (!error && data.user) {
          setIsAuthenticated(true);
          localStorage.setItem('apexora_admin_session', 'true');
          showToast('Welcome to APEXORA Control Room');
          return;
        }
      } catch (err: any) {
        console.warn('Supabase auth attempt:', err);
      }
    }

    // Default admin validation
    if (
      (loginEmail.toLowerCase().includes('admin') || loginEmail.toLowerCase().includes('harsha')) &&
      loginPassword.length >= 4
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('apexora_admin_session', 'true');
      showToast('Admin access granted');
    } else {
      setLoginError('Invalid administrator credentials. Use admin@apexora.store');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('apexora_admin_session');
    const supabase = getSupabase();
    if (supabase) supabase.auth.signOut();
    showToast('Signed out of Control Room');
  };

  const handlePublish = async () => {
    setPublishing(true);
    await publishChanges();
    setPublishing(false);
  };

  const handlePreview = () => {
    setIsDraftMode(true);
    router.push('/');
    showToast('Preview mode enabled. Reviewing draft changes on storefront.');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#E10600]">
          <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
          <span>INITIALIZING APEXORA CONTROL ROOM...</span>
        </div>
      </div>
    );
  }

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex flex-col justify-center items-center p-4 selection:bg-[#E10600]">
        <div className="w-full max-w-md bg-[#111418] border border-[#252930] p-8 space-y-6 shadow-2xl relative">
          <div className="w-1.5 h-full bg-[#E10600] absolute left-0 top-0" />
          
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <Slashes size={26} className="text-[#E10600]" />
              <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl tracking-tight text-white">
                APEXORA
              </span>
            </Link>
            <span className="text-[10px] font-bold tracking-[3px] text-[#E10600] uppercase block">
              SECURE CONTROL ROOM
            </span>
            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mt-1">
              ADMINISTRATOR LOGIN
            </h1>
            <p className="text-xs text-[#8E939C] mt-1">
              Enter credentials to manage products, orders, and design system.
            </p>
          </div>

          {loginError && (
            <div className="bg-[#2B1115] border-l-4 border-[#E10600] text-[#ff8085] p-3 text-xs font-bold uppercase tracking-wider">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                ADMIN EMAIL
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="admin@apexora.store"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-[2px] uppercase transition-colors"
            >
              AUTHENTICATE ACCESS ↗
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#1C1F26]">
            <Link
              href="/"
              className="text-[11px] text-[#8E939C] hover:text-white uppercase tracking-wider"
            >
              ← Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      {/* Top Admin Control Bar */}
      <header className="sticky top-0 z-40 bg-[#111111] border-b border-[#292929] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(prev => !prev)}
            className="p-1.5 text-white lg:hidden hover:text-[#E10600]"
            aria-label="Toggle admin menu"
          >
            {mobileNavOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>

          <Link href="/admin" className="flex items-center gap-2 select-none">
            <Slashes size={22} className="text-[#E10600]" />
            <div className="flex flex-col">
              <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl tracking-tight text-white leading-none">
                APEXORA
              </span>
              <span className="text-[7px] font-bold tracking-[2px] text-[#E10600] uppercase mt-0.5">
                ADMIN CONTROL ROOM
              </span>
            </div>
          </Link>
        </div>

        {/* Draft & Publish Action System */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#16181E] border border-[#2B2F38] text-[10px] font-bold uppercase tracking-wider">
            <span
              className={`w-2 h-2 rounded-full ${
                hasUnpublishedChanges ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            <span className={hasUnpublishedChanges ? 'text-amber-400' : 'text-emerald-400'}>
              {hasUnpublishedChanges ? 'DRAFT EDITS PENDING' : 'ALL PUBLISHED LIVE'}
            </span>
          </div>

          {/* Preview button */}
          <button
            onClick={handlePreview}
            className="px-3 py-1.5 bg-[#1B1E26] hover:bg-[#252930] border border-[#30353E] text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors"
            title="Preview changes on public site"
          >
            <EyeIcon size={14} className="text-[#A5A8AF]" />
            <span className="hidden sm:inline">Preview Store</span>
          </button>

          {/* Discard button */}
          {hasUnpublishedChanges && (
            <button
              onClick={() => {
                if (confirm('Discard all unpublished draft edits and revert to live?')) {
                  discardDraft();
                }
              }}
              className="px-2.5 py-1.5 text-[10px] text-[#8E939C] hover:text-[#ff6b70] uppercase font-bold tracking-wider"
              title="Discard draft changes"
            >
              Discard
            </button>
          )}

          {/* Publish Live CTA */}
          <button
            onClick={handlePublish}
            disabled={publishing || !hasUnpublishedChanges}
            className={`px-4 py-1.5 text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5 transition-all shadow-md ${
              hasUnpublishedChanges
                ? 'bg-[#E10600] hover:bg-[#ff1e17] text-white shadow-[#E10600]/30 animate-pulse'
                : 'bg-[#252930] text-[#7E8491] cursor-not-allowed'
            }`}
          >
            <CheckIcon size={14} />
            <span>{publishing ? 'PUBLISHING...' : 'PUBLISH LIVE'}</span>
          </button>

          {/* Back to storefront */}
          <Link
            href="/"
            className="px-3 py-1.5 border border-[#30353E] hover:border-white text-[#C6C8CC] hover:text-white text-[11px] font-bold tracking-wider uppercase transition-colors"
          >
            Storefront ↗
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="p-1.5 text-[#8E939C] hover:text-[#ff6b70] text-xs font-bold uppercase ml-1"
            title="Sign out of control room"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex relative min-h-[calc(100vh-65px)]">
        {/* Mobile Navigation Drawer (when open on screens < lg) */}
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />
            {/* Drawer */}
            <div className="relative w-[280px] max-w-[80vw] bg-[#111111] border-r border-[#292929] flex flex-col justify-between py-4 z-10 shadow-2xl h-full">
              <div className="px-4 pb-3 border-b border-[#292929] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#E10600] uppercase tracking-[2px]">
                  CONTROL ROOM MENU
                </span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 text-[#858585] hover:text-white"
                  aria-label="Close menu"
                >
                  <CloseIcon size={18} />
                </button>
              </div>

              <div className="px-3 py-3 space-y-1 overflow-y-auto flex-1">
                {ADMIN_NAV.map(item => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded transition-colors ${
                        active
                          ? 'bg-[#E10600] text-white shadow-md'
                          : 'text-[#B8B8B8] hover:text-white hover:bg-[#151515]'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* User badge */}
              <div className="p-4 border-t border-[#292929] mx-3 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <strong className="text-white uppercase font-bold">Harsha (Owner)</strong>
                </div>
                <span className="text-[10px] text-[#858585] uppercase block">
                  Role: System Administrator
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Permanent Desktop Sidebar (Document flow, strictly side-by-side, NEVER overlaps content) */}
        <aside className="hidden lg:flex w-[280px] min-w-[280px] bg-[#111111] border-r border-[#292929] flex-shrink-0 flex-col justify-between py-6">
          <div className="px-3 space-y-1 overflow-y-auto">
            <span className="text-[10px] font-bold text-[#858585] uppercase tracking-[2px] px-3 py-2 block">
              MANAGEMENT CONSOLE
            </span>

            {ADMIN_NAV.map(item => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded transition-colors ${
                    active
                      ? 'bg-[#E10600] text-white shadow-md'
                      : 'text-[#B8B8B8] hover:text-white hover:bg-[#151515]'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Admin User Info Footer */}
          <div className="p-4 border-t border-[#292929] mx-3 text-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong className="text-white uppercase font-bold">Harsha (Owner)</strong>
            </div>
            <span className="text-[10px] text-[#858585] uppercase block">
              Role: System Administrator
            </span>
            <button
              onClick={() => {
                if (confirm('Reset to initial factory defaults?')) {
                  restoreDefaults();
                }
              }}
              className="mt-3 text-[10px] text-[#ff6b70] hover:underline uppercase font-bold tracking-wider block"
            >
              Reset to Defaults
            </button>
          </div>
        </aside>

        {/* Content Area - Dedicated column with min-w-0, NEVER OVERLAPPED */}
        <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#080808]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
