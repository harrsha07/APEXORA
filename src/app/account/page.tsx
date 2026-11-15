'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Slashes, UserIcon, PackageIcon, MapPinIcon, ArrowRightIcon } from '@/components/icons';

export default function AccountPage() {
  const { orders } = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in as demo customer
  const [email, setEmail] = useState('vikram.roy@example.com');
  const [password, setPassword] = useState('••••••••');
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  const customerOrders = orders.filter(
    o => o.customer.email.toLowerCase() === email.toLowerCase() || o.customer.fullName.toLowerCase().includes('vikram')
  );

  if (!isLoggedIn) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto">
        <div className="bg-[#111418] border border-[#252930] p-8 space-y-6">
          <div className="text-center">
            <Slashes size={28} className="text-[#E10600] mx-auto mb-2" />
            <span className="text-[10px] font-bold tracking-[2px] text-[#E10600] uppercase block">
              PADDOCK MEMBERSHIP
            </span>
            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mt-1">
              CUSTOMER LOGIN
            </h1>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2.5 outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2.5 outline-none tracking-wider"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase transition-colors"
            >
              SIGN IN TO ACCOUNT
            </button>
          </form>

          <p className="text-[10px] text-center text-[#7E8491] uppercase tracking-wider">
            Guest checkout is also available without creating an account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Account Header on Solid Dark Plate */}
      <div className="bg-[#0D0F14] border border-[#222733] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-xs font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-2">
            <Slashes size={18} className="text-[#E10600]" />
            <span>PADDOCK CLUB MEMBER</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-[1.12]">
            VIKRAMADITYA <span className="text-[#E10600]">ROY</span>
          </h1>
          <span className="text-xs text-[#9CA3AF] tracking-wider font-medium block mt-1">{email} · Member since Jan 2026</span>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="text-xs uppercase font-bold text-[#D1D5DB] hover:text-[#E10600] bg-[#14171E] border border-[#2B303C] hover:border-[#E10600] px-4 py-2 self-start sm:self-auto transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#252930] gap-6 text-xs font-black tracking-widest uppercase mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'orders' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#8E939C] hover:text-white'
          }`}
        >
          MY ORDERS ({customerOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'profile' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#8E939C] hover:text-white'
          }`}
        >
          PROFILE SETTINGS
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'addresses' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#8E939C] hover:text-white'
          }`}
        >
          SAVED ADDRESSES
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {customerOrders.length === 0 ? (
            <div className="bg-[#111418] border border-[#252930] p-12 text-center">
              <PackageIcon size={32} className="mx-auto text-[#6F747F] mb-3" />
              <p className="text-sm font-bold uppercase text-white">No previous orders found.</p>
              <Link
                href="/shop"
                className="mt-4 inline-block px-6 py-2.5 bg-[#E10600] text-white text-xs font-black uppercase tracking-wider"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            customerOrders.map(order => (
              <div key={order.id} className="bg-[#111418] border border-[#252930] p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#252930] gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#E10600] block">{order.orderNumber}</span>
                    <span className="text-xs text-[#8E939C]">
                      Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 text-[10px] font-black tracking-wider uppercase bg-[#181B22] border border-[#30353E] text-emerald-400">
                      {order.status}
                    </span>
                    <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#1D2128]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-12 object-contain bg-[#181B22] p-1" />
                        <div>
                          <span className="font-bold text-white uppercase block">{item.name}</span>
                          <span className="text-[11px] text-[#8E939C]">Size: {item.size} · Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Link
                    href={`/order-success/${order.id}`}
                    className="px-4 py-2 border border-[#30353E] hover:border-white text-xs font-bold uppercase tracking-wider text-[#C6C8CC] transition-colors"
                  >
                    View Invoice Receipt
                  </Link>
                  <Link
                    href="/track-order"
                    className="px-4 py-2 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    Track Package
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-[#111418] border border-[#252930] p-6 max-w-xl space-y-4">
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
            ACCOUNT DETAILS
          </h2>
          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">FULL NAME</label>
            <input type="text" readOnly value="Vikramaditya Roy" className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">EMAIL</label>
            <input type="email" readOnly value="vikram.roy@example.com" className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">PHONE NUMBER</label>
            <input type="text" readOnly value="+91 98201 12345" className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3" />
          </div>
        </div>
      )}

      {/* Tab 3: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111418] border border-[#E10600]/50 p-6 space-y-2 relative">
            <span className="text-[9px] font-bold bg-[#E10600] text-white px-2 py-0.5 uppercase tracking-wider">
              DEFAULT SHIPPING ADDRESS
            </span>
            <strong className="text-white block font-bold text-sm uppercase pt-2">Vikramaditya Roy</strong>
            <p className="text-xs text-[#8E939C] leading-relaxed">
              Penthouse 14, Circuit Towers, Outer Ring Road, Indiranagar, Bengaluru, Karnataka - 560103
            </p>
            <p className="text-xs text-[#8E939C]">Phone: +91 98201 12345</p>
          </div>
        </div>
      )}
    </div>
  );
}
