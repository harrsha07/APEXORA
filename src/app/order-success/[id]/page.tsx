'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import {
  Slashes,
  CheckIcon,
  PackageIcon,
  TruckIcon,
  ArrowRightIcon,
  WhatsAppIcon
} from '@/components/icons';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { orders } = useStore();

  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId) || orders[0];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Success Badge */}
      <div className="bg-[#111418] border border-[#252930] p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <CheckIcon size={32} />
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-2">
            <Slashes size={18} />
            <span>PADDOCK CONFIRMATION</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            ORDER CONFIRMED.
          </h1>
          <p className="text-xs sm:text-sm text-[#A5A8AF] max-w-md mx-auto mt-2 leading-relaxed">
            Thank you for joining the APEXORA motorsport movement. Your race gear is being prepared for dispatch.
          </p>
        </div>

        {/* Order Reference Badge */}
        <div className="inline-flex items-center gap-4 bg-[#15171C] border border-[#2B2F38] px-6 py-3 text-xs uppercase tracking-wider">
          <span className="text-[#8E939C]">ORDER NUMBER:</span>
          <strong className="text-white font-mono text-sm tracking-widest text-[#E10600]">
            {order ? order.orderNumber : 'APX-8921'}
          </strong>
        </div>

        {/* Dispatch Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left border-t border-[#1C1F26]">
          <div className="bg-[#15171C] p-4 border border-[#252930]">
            <span className="text-[10px] font-bold text-[#8E939C] uppercase block">STATUS</span>
            <span className="text-xs font-black text-emerald-400 uppercase mt-0.5 block">
              {order?.status || 'Confirmed & Queued'}
            </span>
          </div>
          <div className="bg-[#15171C] p-4 border border-[#252930]">
            <span className="text-[10px] font-bold text-[#8E939C] uppercase block">ESTIMATED DISPATCH</span>
            <span className="text-xs font-black text-white uppercase mt-0.5 block">
              Within 24-48 Hours
            </span>
          </div>
          <div className="bg-[#15171C] p-4 border border-[#252930]">
            <span className="text-[10px] font-bold text-[#8E939C] uppercase block">PAYMENT</span>
            <span className="text-xs font-black text-white uppercase mt-0.5 block">
              {order?.paymentMethod || 'Razorpay Verified'}
            </span>
          </div>
        </div>

        {/* Items Summary */}
        {order && (
          <div className="text-left border-t border-[#1C1F26] pt-6 space-y-3">
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
              ORDERED GARMENTS
            </h3>
            <div className="divide-y divide-[#1D2128]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white uppercase">{item.name}</span>
                    <span className="text-[#8E939C] ml-2">SIZE: {item.size} × {item.quantity}</span>
                  </div>
                  <span className="font-bold text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-[#252930]">
              <span className="font-['Barlow_Condensed',sans-serif] italic">TOTAL PAID</span>
              <span className="text-[#E10600] font-['Barlow_Condensed',sans-serif] text-xl">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#1C1F26]">
          <Link
            href="/track-order"
            className="px-6 py-3.5 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-[#E10600]/30 transition-transform active:scale-95"
          >
            <span>LIVE PACKAGE TRACKING</span>
            <ArrowRightIcon size={14} />
          </Link>

          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 border border-[#30353E] hover:border-white text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            PRINT INVOICE RECEIPT
          </button>

          <Link
            href="/shop"
            className="px-6 py-3.5 bg-[#15171C] hover:bg-[#1E2128] text-[#C6C8CC] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
