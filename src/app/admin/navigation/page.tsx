'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { NavigationItem } from '@/types';
import { Slashes, PlusIcon, EditIcon, TrashIcon } from '@/components/icons';

export default function NavigationManagerPage() {
  const { draftState, saveNavItem, deleteNavItem, updateDraft, showToast } = useStore();
  const navItems = draftState.navigation;

  const [form, setForm] = useState<NavigationItem>({
    id: `nav-${Date.now()}`,
    label: '',
    href: '',
    location: 'both',
    order: navItems.length + 1,
    visible: true,
    badge: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (item: NavigationItem) => {
    setForm({ ...item });
    setIsEditing(true);
  };

  const handleReset = () => {
    setForm({
      id: `nav-${Date.now()}`,
      label: '',
      href: '',
      location: 'both',
      order: navItems.length + 1,
      visible: true,
      badge: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label.trim() || !form.href.trim()) {
      showToast('Label and URL link are required');
      return;
    }
    saveNavItem(form);
    handleReset();
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navItems.length) return;

    const list = [...navItems];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    updateDraft('navigation', () => reordered);
    showToast(`Reordered "${moved.label}"`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>HEADER & FOOTER ROUTING</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            NAVIGATION <span className="text-[#E10600]">MANAGER.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Add, reorder, edit labels, destinations, and promotional badges for header and footer menus.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form (5 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            {isEditing ? 'EDIT MENU LINK' : 'ADD NEW MENU LINK'}
          </h2>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              MENU LABEL *
            </label>
            <input
              type="text"
              required
              value={form.label}
              onChange={e => setForm({ ...form, label: e.target.value })}
              placeholder="e.g. Lookbook"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase tracking-wider"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
              DESTINATION URL *
            </label>
            <input
              type="text"
              required
              value={form.href}
              onChange={e => setForm({ ...form, href: e.target.value })}
              placeholder="/lookbook or #section"
              className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                DISPLAY LOCATION
              </label>
              <select
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value as any })}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold"
              >
                <option value="both">Both Header & Footer</option>
                <option value="header">Header Only</option>
                <option value="footer">Footer Only</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                BADGE (OPTIONAL)
              </label>
              <input
                type="text"
                value={form.badge || ''}
                onChange={e => setForm({ ...form, badge: e.target.value.toUpperCase() })}
                placeholder="HOT, NEW"
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-2.5 outline-none uppercase font-bold font-mono"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white uppercase pt-2">
            <input
              type="checkbox"
              checked={form.visible}
              onChange={e => setForm({ ...form, visible: e.target.checked })}
              className="accent-[#E10600] w-4 h-4"
            />
            <span>Visible in Menu</span>
          </label>

          <div className="flex gap-2 pt-4 border-t border-[#1C1F26]">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E10600] text-white text-xs font-black tracking-widest uppercase"
            >
              {isEditing ? 'SAVE LINK EDITS' : 'ADD MENU LINK'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 border border-[#30353E] text-white text-xs font-bold uppercase"
              >
                CANCEL
              </button>
            )}
          </div>
        </form>

        {/* Menu Items List (7 cols) */}
        <div className="lg:col-span-7 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3">
            MENU ITEMS ({navItems.length})
          </h2>

          <div className="divide-y divide-[#1D2128]">
            {navItems.map((item, index) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] font-bold">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white uppercase text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="bg-[#E10600] text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8E939C] font-mono">
                      {item.href} · Location: {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={index === 0}
                    onClick={() => moveItem(index, 'up')}
                    className="p-1 hover:text-white disabled:opacity-20 text-xs"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    disabled={index === navItems.length - 1}
                    onClick={() => moveItem(index, 'down')}
                    className="p-1 hover:text-white disabled:opacity-20 text-xs"
                    title="Move Down"
                  >
                    ▼
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 border border-[#30353E] hover:border-white text-white rounded text-xs ml-1"
                    title="Edit"
                  >
                    <EditIcon size={12} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete menu item "${item.label}"?`)) {
                        deleteNavItem(item.id);
                      }
                    }}
                    className="p-1.5 border border-[#30353E] hover:border-[#E10600] text-[#ff6b70] rounded text-xs"
                    title="Delete"
                  >
                    <TrashIcon size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
