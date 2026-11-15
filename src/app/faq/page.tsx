'use client';

import React, { useState } from 'react';
import { Slashes, ChevronDownIcon } from '@/components/icons';

const FAQS = [
  {
    q: 'WHAT IS THE FIT OF APEXORA GARMENTS?',
    a: 'All APEXORA Drop 001 T-shirts feature an authentic boxy, drop-shoulder oversized streetwear fit. If you want a classic relaxed oversized look, choose your regular standard size (e.g. if you normally wear L in regular tees, order L in APEXORA). If you prefer a snug or athletic fit, order one size down.'
  },
  {
    q: 'WHAT FABRIC WEIGHT DO YOU USE?',
    a: 'We use 240+ GSM ultra-heavyweight combed ring-spun cotton. This heavy density ensures that the garment holds its boxy architectural shape, feels substantial on the body, and does not become clingy or translucent.'
  },
  {
    q: 'HOW FAST DO YOU SHIP ACROSS INDIA?',
    a: 'Orders are packed and dispatched within 24-48 business hours from our Bengaluru fulfillment center. Delivery takes 3 to 5 business days across major metro cities via Blue Dart and Delhivery Express. Real-time WhatsApp & SMS tracking is sent once your package is scanned.'
  },
  {
    q: 'CAN I EXCHANGE MY SIZE IF IT DOES NOT FIT?',
    a: 'Yes, absolutely. We provide a 7-day hassle-free doorstep exchange policy. If you need a different size, contact our team via WhatsApp or our Contact page, and we will schedule a reverse pickup from your address.'
  },
  {
    q: 'WHAT PAYMENT METHODS DO YOU ACCEPT?',
    a: 'We accept all major Indian payment methods through Razorpay: Google Pay, PhonePe, Paytm, all UPI apps, Visa, Mastercard, RuPay, NetBanking, and Cash on Delivery (COD).'
  },
  {
    q: 'HOW DO I CARE FOR HIGH-DENSITY PRINT GRAPHICS?',
    a: 'Always machine-wash cold inside-out on a delicate cycle. Never iron directly on top of the front or back printed artwork. Do not tumble dry on high heat; line dry in shade to maintain optimal oversized drape.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-[#0D0F14] border border-[#222733] p-8 sm:p-10 mb-8 text-center shadow-xl">
        <div className="inline-flex items-center justify-center gap-2 bg-[#161A22] border border-[#2B303C] px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-[2.5px] text-[#E2E4E9] uppercase mb-3">
          <Slashes size={20} className="text-[#E10600]" />
          <span>HELP & GUIDELINES</span>
        </div>
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl sm:text-6xl text-white uppercase leading-[1.12]">
          FREQUENTLY ASKED <span className="text-[#E10600]">QUESTIONS.</span>
        </h1>
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-2 font-medium">
          Everything you need to know about APEXORA sizing, shipping, fabrics, and care.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-[#0D0F14] border border-[#222733] transition-colors shadow-md">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase tracking-wide hover:text-[#E10600] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDownIcon
                  size={20}
                  className={`text-[#E10600] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-xs text-[#A5A8AF] leading-relaxed border-t border-[#1C1F26] pt-4">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
