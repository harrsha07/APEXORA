'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { ContentPage } from '@/types';
import { Slashes, EditIcon, PlusIcon, TrashIcon, CheckIcon } from '@/components/icons';

export default function PagesCMSPage() {
  const { draftState, savePage, deletePage, showToast } = useStore();
  const pages = draftState.pages;

  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || 'about');
  const [form, setForm] = useState<ContentPage>(pages[0] || {
    id: 'page-new',
    slug: '',
    title: '',
    subtitle: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    updatedAt: new Date().toISOString(),
    published: true
  });

  const handleSelect = (page: ContentPage) => {
    setSelectedPageId(page.id);
    setForm({ ...page });
  };

  const handleNew = () => {
    const newPage: ContentPage = {
      id: `page-${Date.now()}`,
      slug: 'new-page',
      title: 'NEW CMS PAGE',
      subtitle: 'PAGE SUBTITLE',
      content: 'Write your page content here...',
      metaTitle: 'APEXORA',
      metaDescription: '',
      updatedAt: new Date().toISOString(),
      published: true
    };
    setSelectedPageId(newPage.id);
    setForm(newPage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      showToast('Title and URL slug are required');
      return;
    }
    savePage(form);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>CONTENT MANAGEMENT SYSTEM (CMS)</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            PAGE <span className="text-[#E10600]">MANAGER.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Full content control for About Us, Motorsport Culture, Policies, and custom editorial pages.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="px-4 py-2 bg-[#E10600] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2"
        >
          <PlusIcon size={14} />
          <span>Create New Page</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pages Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-[#111418] border border-[#252930] p-4 space-y-2">
          <span className="text-[10px] font-bold text-[#686D77] uppercase tracking-widest px-2 block mb-2">
            WEBSITE PAGES ({pages.length})
          </span>

          {pages.map(p => {
            const isSelected = p.id === selectedPageId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                className={`w-full p-3 text-left border rounded transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#181B22] border-[#E10600] text-white'
                    : 'bg-[#15171C] border-[#252930] text-[#A5A8AF] hover:text-white'
                }`}
              >
                <div>
                  <h4 className="font-['Barlow_Condensed',sans-serif] font-bold text-base uppercase leading-tight">
                    {p.title}
                  </h4>
                  <span className="text-[10px] text-[#6F747F] font-mono block mt-0.5">
                    /{p.slug}
                  </span>
                </div>
                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                  p.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {p.published ? 'LIVE' : 'DRAFT'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Page Content Editor (8 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#252930] pb-3">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] uppercase block">
                EDITING PAGE
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase mt-0.5">
                {form.title}
              </h2>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase">
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => setForm({ ...form, published: e.target.checked })}
                className="accent-[#E10600] w-4 h-4"
              />
              <span>Published Live</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                PAGE TITLE *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                URL SLUG *
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              PAGE SUBTITLE
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={e => setForm({ ...form, subtitle: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase tracking-wider"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              PAGE CONTENT (SUPPORTS PARAGRAPHS & BULLETS) *
            </label>
            <textarea
              rows={12}
              required
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1C1F26]">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                SEO META TITLE
              </label>
              <input
                type="text"
                value={form.metaTitle || ''}
                onChange={e => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                SEO META DESCRIPTION
              </label>
              <input
                type="text"
                value={form.metaDescription || ''}
                onChange={e => setForm({ ...form, metaDescription: e.target.value })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#1C1F26]">
            <button
              type="submit"
              className="px-8 py-3 bg-[#E10600] text-white text-xs font-black tracking-widest uppercase"
            >
              SAVE PAGE CONTENT
            </button>
            {pages.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete page "${form.title}"?`)) {
                    deletePage(form.id);
                  }
                }}
                className="px-4 py-3 border border-[#30353E] hover:border-[#E10600] text-[#ff6b70] text-xs font-bold uppercase"
              >
                Delete Page
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
