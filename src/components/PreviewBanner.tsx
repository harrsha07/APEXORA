'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { EyeIcon, CheckIcon, CloseIcon } from './icons';

export default function PreviewBanner() {
  const { isDraftMode, setIsDraftMode, hasUnpublishedChanges, publishChanges } = useStore();

  if (!isDraftMode && !hasUnpublishedChanges) return null;

  return (
    <div className="bg-[#181A1F] border-b border-[#E10600]/40 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E10600]"></span>
        </span>
        <span className="font-bold text-[#E10600] tracking-wider uppercase text-[11px]">
          {isDraftMode ? 'ADMIN PREVIEW MODE' : 'DRAFT CHANGES PENDING'}
        </span>
        <span className="text-[#888E9B] hidden sm:inline text-[11px]">
          — You are reviewing draft modifications before publishing
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link
          href="/admin"
          className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#252930] hover:bg-[#30353E] border border-white/10 transition-colors"
        >
          Control Room
        </Link>
        <button
          onClick={() => publishChanges()}
          className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#E10600] hover:bg-[#ff1e17] text-white flex items-center gap-1.5 transition-colors"
        >
          <CheckIcon size={12} />
          Publish Live
        </button>
        {isDraftMode && (
          <button
            onClick={() => setIsDraftMode(false)}
            className="p-1 text-[#888E9B] hover:text-white transition-colors"
            title="Exit preview mode"
          >
            <CloseIcon size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
