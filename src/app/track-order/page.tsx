'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Slashes, SearchIcon, CheckIcon, TruckIcon, PackageIcon } from '@/components/icons';

const TIMELINE_STEPS = [
  { key: 'Confirmed', label: 'Order Confirmed', desc: 'Order verified & sent to warehouse' },
  { key: 'Processing', label: 'Paddock Packed', desc: 'Inspected, folded & packaged with stickers' },
  { key: 'Shipped', label: 'Dispatched in Transit', desc: 'Handed to Blue Dart / Delhivery Express' },
  { key: 'Delivered', label: 'Delivered', desc: 'Successfully delivered to your doorstep' }
];

export default function TrackOrderPage() {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('APX-8921');
  const [searchedOrder, setSearchedOrder] = useState<any>(orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const term = searchTerm.trim().toUpperCase();
    if (!term) return;

    const found = orders.find(
      o => o.orderNumber.toUpperCase() === term || o.id === term || o.customer.phone.includes(term)
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMsg(`No active orders found matching "${searchTerm}". Check your order number (e.g. APX-8921).`);
    }
  };

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderIndex = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'].indexOf(currentStatus);
    const stepIndex = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'].indexOf(stepKey);
    if (orderIndex >= stepIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header Banner on Solid Dark Plate */}
      <div className="bg-[#0D0F14] border border-[#222733] p-6 sm:p-8 mb-8 text-center sm:text-left shadow-xl">
        <div className="inline-flex items-center justify-center sm:justify-start gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-xs font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-2">
          <Slashes size={18} className="text-[#E10600]" />
          <span>LOGISTICS & DISPATCH RADAR</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-[1.12]">
          TRACK YOUR <span className="text-[#E10600]">PACKAGE.</span>
        </h1>
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-2 font-medium">
          Enter your APEXORA Order ID (e.g. APX-8921) or 10-digit mobile number.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111418] border border-[#252930] p-6 mb-10">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ENTER ORDER ID (e.g. APX-8921)"
              required
              className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-4 py-3 pl-10 outline-none uppercase font-mono tracking-wider"
            />
            <SearchIcon size={16} className="absolute left-3 top-3.5 text-[#686D77]" />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase transition-colors"
          >
            LOCATE ORDER
          </button>
        </form>
        {errorMsg && <p className="text-xs text-[#ff575d] mt-3 font-semibold">{errorMsg}</p>}
      </div>

      {/* Order Status Display */}
      {searchedOrder && (
        <div className="bg-[#111418] border border-[#252930] p-6 sm:p-8 space-y-8">
          {/* Order Details Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#252930] gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#E10600] tracking-widest uppercase block">
                ACTIVE SHIPMENT
              </span>
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mt-0.5">
                {searchedOrder.orderNumber}
              </h2>
              <span className="text-xs text-[#8E939C]">
                Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#8E939C] uppercase tracking-wider block">CURRENT STATUS</span>
              <span className="text-base font-black text-emerald-400 uppercase">
                {searchedOrder.status.toUpperCase()}
              </span>
              {searchedOrder.carrier && (
                <span className="text-xs text-[#C6C8CC] block mt-0.5">
                  Courier: <strong>{searchedOrder.carrier}</strong>
                </span>
              )}
              {searchedOrder.trackingNumber && (
                <span className="text-xs font-mono text-[#E10600] block mt-0.5">
                  AWB: {searchedOrder.trackingNumber}
                </span>
              )}
            </div>
          </div>

          {/* Timeline Visual */}
          <div className="py-4">
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase mb-6">
              DISPATCH MILESTONES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {TIMELINE_STEPS.map((step, idx) => {
                const status = getStepStatus(step.key, searchedOrder.status);
                const isDone = status === 'completed';
                return (
                  <div key={step.key} className="flex flex-col items-start space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                          isDone
                            ? 'bg-[#E10600] border-[#E10600] text-white'
                            : 'bg-[#15171C] border-[#30353E] text-[#6F747F]'
                        }`}
                      >
                        {isDone ? <CheckIcon size={14} /> : `0${idx + 1}`}
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isDone ? 'text-white' : 'text-[#6F747F]'}`}>
                        {step.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8E939C] leading-snug pl-9">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recipient & Items info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#1C1F26] text-xs">
            <div className="bg-[#15171C] p-4 border border-[#252930] space-y-2">
              <span className="text-[10px] font-bold text-[#E10600] uppercase block">SHIPPING DESTINATION</span>
              <strong className="text-white block uppercase">{searchedOrder.customer.fullName}</strong>
              <p className="text-[#8E939C] leading-relaxed">
                {searchedOrder.customer.address}, {searchedOrder.customer.city}, {searchedOrder.customer.state} - {searchedOrder.customer.pinCode}
              </p>
              <p className="text-[#8E939C]">Mobile: {searchedOrder.customer.phone}</p>
            </div>

            <div className="bg-[#15171C] p-4 border border-[#252930] space-y-2">
              <span className="text-[10px] font-bold text-[#E10600] uppercase block">PACKAGE CONTENTS</span>
              <div className="divide-y divide-[#252930]">
                {searchedOrder.items.map((i: any, idx: number) => (
                  <div key={idx} className="py-1.5 flex justify-between items-center">
                    <span className="text-white font-semibold">{i.name} ({i.size}) × {i.quantity}</span>
                    <span className="text-white">₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-white pt-2 border-t border-[#252930]">
                <span>Total Amount</span>
                <span className="text-[#E10600]">₹{searchedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
