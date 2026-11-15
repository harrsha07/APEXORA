'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function AnnouncementBar() {
  const { settings } = useStore();

  if (!settings.announcementActive) return null;

  return (
    <div
      className="w-full text-white text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase py-2 px-4 flex items-center justify-between select-none z-30 transition-all"
      style={{ backgroundColor: settings.accentColor || '#E10600' }}
    >
      <div className="flex items-center gap-2 mx-auto md:mx-0">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        {settings.announcementLink ? (
          <Link href={settings.announcementLink} className="hover:underline flex items-center gap-1">
            <span>{settings.announcementText}</span>
            <span className="opacity-80">↗</span>
          </Link>
        ) : (
          <span>{settings.announcementText}</span>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4 text-[9px] tracking-[1.5px] text-white/90">
        <span>{settings.announcementSubtext}</span>
      </div>
    </div>
  );
}
