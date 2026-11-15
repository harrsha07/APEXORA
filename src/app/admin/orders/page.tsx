'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Order, OrderStatus } from '@/types';
import {
  Slashes,
  SearchIcon,
  TruckIcon,
  PackageIcon,
  CheckIcon,
  CloseIcon,
  EyeIcon,
  EditIcon
} from '@/components/icons';

const ALL_STATUSES: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Refunded'
];

export default function OrderManagerPage() {
  const { orders, updateOrderStatus, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Tracking edit states
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('Blue Dart Express');

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumberInput(order.trackingNumber || '');
    setCarrierInput(order.carrier || 'Blue Dart Express');
  };

  const handleUpdateStatus = (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, newStatus, {
      trackingNumber: trackingNumberInput,
      carrier: carrierInput
    });
    setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null));
  };

  const handleSaveTracking = () => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, selectedOrder.status, {
      trackingNumber: trackingNumberInput,
      carrier: carrierInput
    });
    setSelectedOrder(prev =>
      prev
        ? {
            ...prev,
            trackingNumber: trackingNumberInput,
            carrier: carrierInput
          }
        : null
    );
    showToast('Tracking details saved.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#252930] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-1">
            <Slashes size={18} />
            <span>CUSTOMER FULFILLMENT DESK</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-none">
            ORDER <span className="text-[#E10600]">MANAGEMENT.</span>
          </h1>
          <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
            Process incoming orders, assign dispatch tracking numbers, and update shipment statuses.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111418] border border-[#252930] p-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', ...ALL_STATUSES].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-colors ${
                statusFilter === st
                  ? 'bg-[#E10600] border-[#E10600] text-white'
                  : 'bg-[#15171C] border-[#2B2F38] text-[#8E939C] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="SEARCH ORDERS..."
            className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs px-3 py-2 pl-8 outline-none uppercase font-mono"
          />
          <SearchIcon size={14} className="absolute left-2.5 top-2.5 text-[#686D77]" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111418] border border-[#252930] overflow-x-auto">
        <table className="w-full text-left text-xs uppercase tracking-wider">
          <thead className="bg-[#15171C] text-[#8E939C] border-b border-[#252930]">
            <tr>
              <th className="p-3.5">ORDER NUMBER</th>
              <th className="p-3.5">DATE</th>
              <th className="p-3.5">CUSTOMER</th>
              <th className="p-3.5">DESTINATION</th>
              <th className="p-3.5">ITEMS</th>
              <th className="p-3.5">PAYMENT</th>
              <th className="p-3.5">TOTAL</th>
              <th className="p-3.5">STATUS</th>
              <th className="p-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2128] text-white">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-[#8E939C]">
                  No orders match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#15171C] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#E10600]">
                    {order.orderNumber}
                  </td>
                  <td className="p-3.5 text-[#8E939C] font-mono text-[11px]">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold block text-white">{order.customer.fullName}</span>
                    <span className="text-[10px] text-[#8E939C]">{order.customer.phone}</span>
                  </td>
                  <td className="p-3.5 text-[#C6C8CC]">
                    {order.customer.city}, {order.customer.state}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold">{order.items.reduce((s, i) => s + i.quantity, 0)} pcs</span>
                    <span className="text-[10px] text-[#8E939C] block truncate max-w-[140px]">
                      {order.items.map(i => i.name).join(', ')}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-mono text-[#A5A8AF]">{order.paymentMethod}</span>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : order.status === 'Shipped'
                          ? 'bg-sky-500/20 text-sky-400'
                          : order.status === 'Processing'
                          ? 'bg-amber-500/20 text-amber-400'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-[#252930] text-[#A5A8AF]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleOpenDetail(order)}
                      className="px-3 py-1 bg-[#252930] hover:bg-[#E10600] text-white text-[10px] font-bold uppercase transition-colors"
                    >
                      Inspect / Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-[#111418] border border-[#2B2F38] text-white w-full max-w-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-start border-b border-[#252930] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#E10600] uppercase tracking-widest">
                  ORDER FULFILLMENT DOSSIER
                </span>
                <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl uppercase mt-0.5">
                  {selectedOrder.orderNumber}
                </h3>
                <span className="text-xs text-[#8E939C]">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#8E939C] hover:text-white">
                <CloseIcon size={22} />
              </button>
            </div>

            {/* Quick Status Buttons */}
            <div className="bg-[#15171C] p-4 border border-[#252930] space-y-2">
              <span className="text-[10px] font-bold text-[#8E939C] uppercase block">
                UPDATE ORDER STATUS:
              </span>
              <div className="flex flex-wrap gap-2">
                {ALL_STATUSES.map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-3 py-1 text-xs font-black uppercase tracking-wider border transition-colors ${
                      selectedOrder.status === st
                        ? 'bg-[#E10600] border-[#E10600] text-white'
                        : 'bg-[#181B22] border-[#2B2F38] text-[#8E939C] hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Tracking Number Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#15171C] p-4 border border-[#252930]">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  COURIER PARTNER
                </label>
                <input
                  type="text"
                  value={carrierInput}
                  onChange={e => setCarrierInput(e.target.value)}
                  placeholder="Blue Dart Express"
                  className="w-full bg-[#111418] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-bold uppercase"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase block mb-1">
                  AWB TRACKING NUMBER
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={e => setTrackingNumberInput(e.target.value)}
                    placeholder="BLUEDART-88291041"
                    className="flex-1 bg-[#111418] border border-[#2B2F38] text-white text-xs p-2.5 outline-none font-mono uppercase"
                  />
                  <button
                    onClick={handleSaveTracking}
                    className="px-4 bg-[#252930] hover:bg-[#30353E] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Recipient & Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="bg-[#15171C] p-4 border border-[#252930] space-y-1">
                <span className="text-[10px] font-bold text-[#E10600] uppercase block mb-1">
                  CUSTOMER & ADDRESS
                </span>
                <strong className="text-white block uppercase text-sm">{selectedOrder.customer.fullName}</strong>
                <p className="text-[#8E939C]">{selectedOrder.customer.address}</p>
                <p className="text-[#8E939C]">{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pinCode}</p>
                <p className="text-[#8E939C]">Phone: {selectedOrder.customer.phone}</p>
                <p className="text-[#8E939C]">Email: {selectedOrder.customer.email}</p>
              </div>

              <div className="bg-[#15171C] p-4 border border-[#252930] space-y-2">
                <span className="text-[10px] font-bold text-[#E10600] uppercase block mb-1">
                  PAYMENT & TOTAL
                </span>
                <div className="flex justify-between">
                  <span className="text-[#8E939C]">Method:</span>
                  <strong className="text-white">{selectedOrder.paymentMethod}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E939C]">Subtotal:</span>
                  <span className="text-white">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#E10600]">
                    <span>Discount:</span>
                    <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8E939C]">Shipping Fee:</span>
                  <span className="text-white">₹{selectedOrder.shippingFee}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-2 border-t border-[#252930] text-sm">
                  <span>Grand Total:</span>
                  <span className="text-[#E10600]">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Line items list */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#8E939C] uppercase block">
                ITEMS PURCHASED:
              </span>
              <div className="divide-y divide-[#252930] bg-[#15171C] border border-[#252930] p-3">
                {selectedOrder.items.map((i, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <span className="text-white font-bold uppercase">{i.name} — Size {i.size} × {i.quantity}</span>
                    <span className="text-white font-mono">₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <a
                href={`/order-success/${selectedOrder.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#E10600] uppercase font-bold hover:underline"
              >
                Open Customer Invoice Receipt ↗
              </a>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
