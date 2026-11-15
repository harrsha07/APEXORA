'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import {
  Slashes,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  LockIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@/components/icons';

const INDIAN_STATES = [
  'Karnataka',
  'Maharashtra',
  'Delhi',
  'Tamil Nadu',
  'Haryana',
  'Telangana',
  'Gujarat',
  'Kerala',
  'Uttar Pradesh',
  'West Bengal',
  'Rajasthan',
  'Punjab',
  'Goa',
  'Andhra Pradesh',
  'Madhya Pradesh',
  'Bihar',
  'Assam',
  'Odisha',
  'Other'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, discountAmount, shippingFee, cartTotal, appliedDiscount, createOrder } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Karnataka',
    pinCode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'COD'>('Razorpay');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 max-w-xl mx-auto text-center">
        <Slashes size={38} className="text-[#E10600] mx-auto mb-3" />
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mb-2">
          NO ITEMS IN CHECKOUT
        </h1>
        <p className="text-xs text-[#8E939C] mb-6">
          Your shopping bag is currently empty.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeftIcon size={14} />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pinCode.trim()) {
      setErrorMessage('Please fill in all required contact and shipping details.');
      return;
    }

    if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      setErrorMessage('Please enter a valid 6-digit Indian PIN Code.');
      return;
    }

    setSubmitting(true);

    try {
      // Create the order via the store
      const newOrder = await createOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode
        },
        items: cart.map(i => ({
          productId: i.productId,
          name: i.name,
          size: i.size,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        })),
        subtotal: cartSubtotal,
        shippingFee,
        discount: discountAmount,
        discountCode: appliedDiscount?.code,
        total: cartTotal,
        status: paymentMethod === 'COD' ? 'Pending' : 'Confirmed',
        paymentMethod,
        paymentId: paymentMethod === 'Razorpay' ? `pay_${Date.now()}` : undefined,
        notes: formData.notes
      });

      // Redirect to success page
      router.push(`/order-success/${newOrder.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header on Solid Dark Plate */}
      <div className="bg-[#0D0F14] border border-[#222733] p-6 sm:p-8 mb-8 flex items-center justify-between shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#2B303C] px-3 py-1 rounded-sm text-xs font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-2">
            <Slashes size={18} className="text-[#E10600]" />
            <span>SECURE CHECKOUT DISPATCH</span>
          </div>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white uppercase leading-[1.12]">
            APEXORA <span className="text-[#E10600]">CHECKOUT.</span>
          </h1>
        </div>
        <Link
          href="/cart"
          className="text-xs font-bold text-[#D1D5DB] hover:text-white uppercase tracking-wider hidden sm:flex items-center gap-1.5 bg-[#14171E] border border-[#252A36] px-4 py-2"
        >
          <ArrowLeftIcon size={12} />
          <span>Edit Bag</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {errorMessage && (
            <div className="bg-[#2B1115] border-l-4 border-[#E10600] text-[#ff8085] p-4 text-xs font-bold uppercase tracking-wider">
              {errorMessage}
            </div>
          )}

          {/* 1. Contact Info */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase tracking-wide flex items-center gap-2 border-b border-[#252930] pb-3">
              <span className="text-[#E10600]">01 /</span> CONTACT DETAILS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Harsha K."
                  className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider uppercase"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  PHONE NUMBER (10 DIGITS) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                EMAIL ADDRESS (FOR DISPATCH & INVOICE) *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="rider@example.com"
                className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider"
              />
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase tracking-wide flex items-center gap-2 border-b border-[#252930] pb-3">
              <span className="text-[#E10600]">02 /</span> DELIVERY ADDRESS (INDIA)
            </h2>

            <div>
              <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                STREET ADDRESS / FLAT / BUILDING *
              </label>
              <textarea
                rows={2}
                required
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Flat / House No., Apartment, Street, Landmark"
                className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  CITY *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Bengaluru"
                  className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider uppercase"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  STATE *
                </label>
                <select
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider uppercase"
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  PIN CODE *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={e => setFormData({ ...formData, pinCode: e.target.value })}
                  placeholder="560038"
                  className="w-full bg-[#15171C] border border-[#2B2F38] focus:border-[#E10600] text-white text-xs px-3 py-2.5 outline-none tracking-wider"
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase tracking-wide flex items-center gap-2 border-b border-[#252930] pb-3">
              <span className="text-[#E10600]">03 /</span> PAYMENT METHOD
            </h2>

            <div className="space-y-3">
              {/* Razorpay Online */}
              <label
                className={`p-4 border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'Razorpay'
                    ? 'border-[#E10600] bg-[#161922]'
                    : 'border-[#2B2F38] bg-[#15171C] hover:border-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Razorpay'}
                  onChange={() => setPaymentMethod('Razorpay')}
                  className="mt-1 accent-[#E10600]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      RAZORPAY SECURE (UPI / CARDS / NET BANKING)
                    </span>
                    <span className="text-[9px] bg-[#E10600] text-white font-black px-1.5 py-0.5 rounded uppercase">
                      FASTEST
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8E939C] mt-1 leading-relaxed">
                    Instant payment via Google Pay, PhonePe, Paytm, Any UPI app, Debit/Credit Card, or NetBanking.
                  </p>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-4 border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'COD'
                    ? 'border-[#E10600] bg-[#161922]'
                    : 'border-[#2B2F38] bg-[#15171C] hover:border-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-[#E10600]"
                />
                <div className="flex-1">
                  <span className="text-xs font-black uppercase tracking-wider text-white block">
                    CASH ON DELIVERY (COD)
                  </span>
                  <p className="text-[11px] text-[#8E939C] mt-1 leading-relaxed">
                    Pay in cash or via QR code directly to the courier upon doorstep delivery.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-6 sticky top-28">
            <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase tracking-wider border-b border-[#252930] pb-3">
              ORDER ITEMS ({cart.length})
            </h2>

            <div className="divide-y divide-[#1D2128] max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.key} className="py-3 first:pt-0 flex gap-3 items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-14 bg-[#181B22] border border-[#2B2F38] flex-shrink-0 p-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-['Barlow_Condensed',sans-serif] font-bold text-base text-white uppercase leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-[#8E939C] uppercase block">
                        SIZE {item.size} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-['Barlow_Condensed',sans-serif] font-bold text-base text-white">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs uppercase tracking-wider text-[#8E939C] border-t border-[#1C1F26] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E10600]">
                  <span>Discount ({appliedDiscount?.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping (India)</span>
                <span className="text-white font-bold">
                  {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-black text-white pt-4 border-t border-[#252930]">
                <span className="font-['Barlow_Condensed',sans-serif] italic tracking-wide">TOTAL PAYABLE</span>
                <span className="font-['Barlow_Condensed',sans-serif] text-3xl text-[#E10600]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#E10600] hover:bg-[#ff1e17] disabled:opacity-50 text-white text-xs font-black tracking-[2px] uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#E10600]/30 transition-transform active:scale-[0.99]"
            >
              <span>{submitting ? 'DISPATCHING ORDER...' : `PLACE ORDER — ₹${cartTotal.toLocaleString('en-IN')}`}</span>
              <ArrowRightIcon size={16} />
            </button>

            <div className="text-[10px] text-center text-[#6F747F] uppercase tracking-wider space-y-1">
              <p>7-Day Easy Doorstep Exchange Policy Guaranteed</p>
              <p>Razorpay 256-Bit SSL Encrypted Verification</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
