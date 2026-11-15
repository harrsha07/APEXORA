'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Customer } from '@/types';
import { Slashes, SearchIcon, UserIcon, DownloadIcon } from '@/components/icons';

export default function CustomerManagerPage() {
  const { draftState, showToast } = useStore();
  const customers = draftState.customers;

  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const exportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Orders,Total Spent (INR),Joined Date,Status\n';
    const rows = customers
      .map(
        c =>
          `"${c.id}","${c.name}","${c.email}","${c.phone}",${c.totalOrders},${c.totalSpent},"${c.joinedDate}","${c.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apexora-customers-${Date.now()}.csv`;
    a.click();
    showToast('Customer data exported to CSV.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>PADDOCK MEMBERSHIP REGISTER</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            CUSTOMER <span className="text-[#E10600]">MANAGEMENT.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            View customer order histories, total lifetime expenditure, and export records.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-[#252930] hover:bg-[#30353E] border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <span>Export Customer CSV 📥</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111418] border border-[#252930] p-4 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="SEARCH BY NAME, EMAIL, PHONE..."
            className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2.5 pl-9 outline-none uppercase font-mono"
          />
          <SearchIcon size={14} className="absolute left-3 top-3 text-[#686D77]" />
        </div>

        <span className="text-xs text-[#8E939C] uppercase font-bold hidden sm:inline">
          {filtered.length} Registered Customers
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-[#111418] border border-[#252930] overflow-x-auto">
        <table className="w-full text-left text-xs uppercase tracking-wider">
          <thead className="bg-[#15171C] text-[#8E939C] border-b border-[#252930]">
            <tr>
              <th className="p-3.5">CUSTOMER</th>
              <th className="p-3.5">CONTACT</th>
              <th className="p-3.5">TOTAL ORDERS</th>
              <th className="p-3.5">LIFETIME SPEND</th>
              <th className="p-3.5">JOINED DATE</th>
              <th className="p-3.5">DEFAULT ADDRESS</th>
              <th className="p-3.5 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2128] text-white">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-[#15171C] transition-colors">
                <td className="p-3.5 font-bold uppercase">
                  {c.name}
                </td>
                <td className="p-3.5">
                  <span className="block text-[#C6C8CC]">{c.email}</span>
                  <span className="text-[10px] text-[#8E939C] font-mono">{c.phone}</span>
                </td>
                <td className="p-3.5 font-bold">
                  {c.totalOrders} Orders
                </td>
                <td className="p-3.5 font-bold text-[#E10600]">
                  ₹{c.totalSpent.toLocaleString('en-IN')}
                </td>
                <td className="p-3.5 text-[#8E939C] font-mono text-[11px]">
                  {c.joinedDate}
                </td>
                <td className="p-3.5 text-[#A5A8AF] truncate max-w-[200px]">
                  {c.defaultAddress || 'Bengaluru, India'}
                </td>
                <td className="p-3.5 text-right">
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-emerald-500/20 text-emerald-400">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
