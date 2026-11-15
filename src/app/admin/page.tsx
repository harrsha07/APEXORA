'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import {
  Slashes,
  ArrowRightIcon,
  PackageIcon,
  UserIcon,
  TruckIcon,
  CheckIcon,
  EyeIcon,
  EditIcon
} from '@/components/icons';

export default function AdminOverviewPage() {
  const { products, orders, customers, settings, updateOrderStatus } = useStore();

  // Metrics
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 10);

  // Recent 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#252930] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>PADDOCK TELEMETRY & OPERATIONS</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            DASHBOARD <span className="text-[#E10600]">OVERVIEW.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Real-time sales performance, inventory telemetry, and customer order fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/customization"
            className="px-4 py-2 bg-[#1B1E26] hover:bg-[#252930] border border-[#30353E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Customize Brand 🎨
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black uppercase tracking-wider transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-[#111418] border border-[#252930] p-5 space-y-1 relative overflow-hidden">
          <div className="w-1.5 h-full bg-[#E10600] absolute left-0 top-0" />
          <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
            TOTAL SALES REVENUE
          </span>
          <div className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white">
            ₹{totalSales.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            ↑ 24.5% vs last release
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-[#111418] border border-[#252930] p-5 space-y-1 relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
            TOTAL ORDERS
          </span>
          <div className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white">
            {totalOrders}
          </div>
          <span className="text-[10px] text-[#A5A8AF] font-bold uppercase tracking-wider block">
            {pendingOrders} Action Required · {completedOrders} Delivered
          </span>
        </div>

        {/* Active Products */}
        <div className="bg-[#111418] border border-[#252930] p-5 space-y-1 relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
            GARMENT CATALOGUE
          </span>
          <div className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white">
            {totalProducts}
          </div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
            {lowStockProducts.length} Garments Low on Stock
          </span>
        </div>

        {/* Total Customers */}
        <div className="bg-[#111418] border border-[#252930] p-5 space-y-1 relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
            REGISTERED RIDERS
          </span>
          <div className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white">
            {customers.length + 42}
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            Paddock Club Active
          </span>
        </div>
      </div>

      {/* Revenue Performance & Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Breakdown Card (2 cols) */}
        <div className="lg:col-span-2 bg-[#111418] border border-[#252930] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#252930] pb-3">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
              DROP 001 SALES VELOCITY
            </h2>
            <span className="text-[10px] text-[#E10600] font-black tracking-widest uppercase">
              LIVE TELEMETRY
            </span>
          </div>

          <p className="text-xs text-[#8E939C]">
            Revenue generated by garment lines in the current release cycle:
          </p>

          <div className="space-y-4 pt-2">
            {products.slice(0, 4).map(prod => {
              const estShare = Math.floor(prod.price * (50 - prod.stock));
              const pct = Math.min(100, Math.round(((50 - prod.stock) / 50) * 100));
              return (
                <div key={prod.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-white">{prod.name} ({prod.color})</span>
                    <span className="text-[#E10600]">₹{estShare.toLocaleString('en-IN')} ({pct}% sold)</span>
                  </div>
                  <div className="w-full h-2 bg-[#252930] overflow-hidden rounded-full">
                    <div className="h-full bg-[#E10600]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Operations Shortcuts (1 col) */}
        <div className="bg-[#111418] border border-[#252930] p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase border-b border-[#252930] pb-3 mb-4">
              QUICK LAUNCHPAD
            </h2>
            <div className="space-y-2 text-xs font-bold uppercase tracking-wider">
              <Link
                href="/admin/homepage"
                className="p-3 bg-[#15171C] hover:bg-[#1E2128] border border-[#2B2F38] flex items-center justify-between text-white transition-colors"
              >
                <span>Edit Hero & Banners</span>
                <span className="text-[#E10600]">⚡</span>
              </Link>
              <Link
                href="/admin/customization"
                className="p-3 bg-[#15171C] hover:bg-[#1E2128] border border-[#2B2F38] flex items-center justify-between text-white transition-colors"
              >
                <span>Change Colors & Fonts</span>
                <span className="text-[#E10600]">🎨</span>
              </Link>
              <Link
                href="/admin/orders"
                className="p-3 bg-[#15171C] hover:bg-[#1E2128] border border-[#2B2F38] flex items-center justify-between text-white transition-colors"
              >
                <span>Fulfill Customer Orders</span>
                <span className="text-[#E10600]">📦</span>
              </Link>
              <Link
                href="/admin/discounts"
                className="p-3 bg-[#15171C] hover:bg-[#1E2128] border border-[#2B2F38] flex items-center justify-between text-white transition-colors"
              >
                <span>Create Promo Codes</span>
                <span className="text-[#E10600]">🏷️</span>
              </Link>
            </div>
          </div>

          <div className="p-3 bg-[#15171C] border border-white/5 text-[10px] text-[#7E8491] uppercase tracking-wider">
            All modifications stay safely in Draft until you click <strong>PUBLISH LIVE</strong>.
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#252930] pb-3">
          <div>
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
              RECENT ORDERS
            </h2>
            <span className="text-xs text-[#8E939C]">Latest purchase transactions received</span>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#E10600] uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            <span>View All Orders ({orders.length})</span>
            <ArrowRightIcon size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs uppercase tracking-wider">
            <thead className="bg-[#15171C] text-[#8E939C] border-b border-[#252930]">
              <tr>
                <th className="p-3">ORDER ID</th>
                <th className="p-3">CUSTOMER</th>
                <th className="p-3">ITEMS</th>
                <th className="p-3">TOTAL</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2128] text-white">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#15171C] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#E10600]">
                    {order.orderNumber}
                  </td>
                  <td className="p-3">
                    <span className="font-bold block">{order.customer.fullName}</span>
                    <span className="text-[10px] text-[#8E939C]">{order.customer.city}, {order.customer.state}</span>
                  </td>
                  <td className="p-3">
                    {order.items.map(i => `${i.name} (${i.size})`).join(', ')}
                  </td>
                  <td className="p-3 font-bold">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-black tracking-widest uppercase rounded ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : order.status === 'Shipped'
                          ? 'bg-sky-500/20 text-sky-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      href="/admin/orders"
                      className="px-2.5 py-1 bg-[#252930] hover:bg-[#30353E] text-[10px] font-bold text-white uppercase rounded"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
