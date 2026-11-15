'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Slashes, ArrowLeftIcon } from '@/components/icons';

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { collections, products } = useStore();

  const collection = collections.find(c => c.slug === slug || c.id === slug);

  if (!collection) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto px-4">
        <Slashes size={38} className="text-[#E10600]" />
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mt-4">
          COLLECTION NOT FOUND
        </h1>
        <p className="text-xs text-[#8E939C] mt-2 mb-6">
          The requested collection does not exist or may have been unlisted.
        </p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeftIcon size={14} />
          <span>Back to Collections</span>
        </Link>
      </div>
    );
  }

  const collectionProducts = products.filter(
    p => collection.productIds.includes(p.id) && p.active
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link
        href="/collections"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#8E939C] hover:text-white uppercase tracking-wider mb-6 transition-colors"
      >
        <ArrowLeftIcon size={14} />
        <span>Back to all collections</span>
      </Link>

      {/* Collection Hero Banner */}
      <div className="relative bg-[#111418] border border-[#252930] p-8 md:p-12 mb-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: `url(${collection.bannerImage})` }}
        />
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-bold tracking-[2.5px] text-[#E10600] uppercase block mb-1">
            {collection.tagline}
          </span>
          <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-none">
            {collection.title}
          </h1>
          <p className="text-xs md:text-sm text-[#C6C8CC] mt-3 leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products in Collection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
}
