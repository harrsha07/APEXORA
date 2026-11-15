'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Slashes, MailIcon, PhoneIcon, WhatsAppIcon, InstagramIcon, MapPinIcon, CheckIcon } from '@/components/icons';

export default function ContactPage() {
  const { settings } = useStore();
  const [form, setForm] = useState({ name: '', email: '', subject: 'Sizing & Drop 001 Inquiry', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: 'Sizing & Drop 001 Inquiry', message: '' });
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-[#252930] pb-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[2.5px] text-[#E10600] uppercase mb-2">
          <Slashes size={18} />
          <span>PIT CREW COMMUNICATIONS</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white uppercase leading-none">
          CONTACT <span className="text-[#E10600]">APEXORA.</span>
        </h1>
        <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-2">
          Have questions regarding garment sizing, custom corporate orders, or order status? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111418] border border-[#252930] p-6 space-y-4">
            <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
              DIRECT CHANNELS
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <WhatsAppIcon size={18} className="text-[#E10600] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block uppercase">WHATSAPP PIT DESK</span>
                  <a
                    href={`https://wa.me/${(settings.whatsappNumber || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8E939C] hover:text-white"
                  >
                    {settings.whatsappNumber || '+91 98765 43210'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MailIcon size={18} className="text-[#E10600] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block uppercase">EMAIL DISPATCH</span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-[#8E939C] hover:text-white">
                    {settings.contactEmail || 'contact@apexora.store'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <InstagramIcon size={18} className="text-[#E10600] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block uppercase">INSTAGRAM DIRECT MESSAGE</span>
                  <a
                    href={settings.instagramUrl || 'https://www.instagram.com/harrsha.58/'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8E939C] hover:text-white"
                  >
                    @harrsha.58
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[#1C1F26] pt-4">
                <MapPinIcon size={18} className="text-[#E10600] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block uppercase">DESIGN HUB & PADDOCK</span>
                  <p className="text-[#8E939C] leading-relaxed">
                    {settings.businessAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#111418] border border-[#252930] p-8">
          <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase mb-6">
            SEND A DIRECT TRANSMISSION
          </h3>

          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckIcon size={24} />
              </div>
              <h4 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
                MESSAGE RECEIVED
              </h4>
              <p className="text-xs text-[#8E939C] max-w-sm mx-auto">
                Our pit crew will review your transmission and reply to your email within 12 business hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-6 py-2.5 bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul S."
                    className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="rider@example.com"
                    className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1">
                  TRANSMISSION / MESSAGE *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full bg-[#15171C] border border-[#2B2F38] text-white text-xs p-3 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-widest uppercase transition-colors"
              >
                TRANSMIT MESSAGE ↗
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
