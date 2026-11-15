'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import {
  Slashes,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
  TruckIcon,
  RefreshIcon,
  ShieldCheckIcon,
  CheckIcon,
  CloseIcon,
  BagIcon
} from '@/components/icons';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const { products, addToCart } = useStore();

  const product = products.find(p => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<'front' | 'back'>('front');
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  if (!product) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto px-4 bg-[#080808]">
        <Slashes size={38} className="text-[#E10600]" />
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mt-4">
          PRODUCT NOT FOUND
        </h1>
        <p className="text-xs text-[#858585] mt-2 mb-6">
          The requested garment does not exist in the active catalogue.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeftIcon size={14} />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const currentDisplayImage =
    activeImage === 'back' && product.backImage ? product.backImage : product.image;

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.active)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation - Clear in Normal Flow */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-wider uppercase text-[#858585] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <Link
            href={
              ['apex-series-01', 'rider-core-03', 'rider-focus', 'apex-line-58', 'checker-evolution'].includes(product.id)
                ? '/collections/apex-series'
                : '/drop-001'
            }
            className="hover:text-white transition-colors"
          >
            {['apex-series-01', 'rider-core-03', 'rider-focus', 'apex-line-58', 'checker-evolution'].includes(product.id)
              ? 'Apex Series'
              : 'Drop 001'}
          </Link>
          <span>/</span>
          <span className="text-[#E10600]">{product.name}</span>
        </nav>

        {/* Main Product Layout: Desktop 2-Column Grid / Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Product Gallery (7 Columns on Desktop, First on Mobile) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Visual Box */}
            <div className="relative aspect-[4/3] bg-[#111111] border border-[#292929] p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-xl">
              {/* Product Badge */}
              {product.tag && (
                <span className="absolute top-4 left-4 z-10 bg-[#E10600] text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase shadow-md select-none">
                  {product.tag}
                </span>
              )}

              {/* Stock Status Badge */}
              <span className="absolute top-4 right-4 z-10 bg-[#151515] border border-[#292929] text-white text-[9px] font-bold tracking-wider px-2.5 py-1 uppercase select-none">
                {product.stock > 0 ? (
                  <span className="text-emerald-400 font-bold">● IN STOCK</span>
                ) : (
                  <span className="text-rose-400 font-bold">SOLD OUT</span>
                )}
              </span>

              {/* Product Image - strictly contained, never overflows */}
              <img
                src={currentDisplayImage}
                alt={`${product.name} garment`}
                className="w-full h-full object-contain max-h-[460px] transition-all duration-300"
              />
            </div>

            {/* Front / Back Switcher Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveImage('front')}
                className={`py-3 text-xs font-black tracking-widest uppercase border transition-all ${
                  activeImage === 'front'
                    ? 'border-[#E10600] bg-[#E10600] text-white shadow-md'
                    : 'border-[#292929] bg-[#111111] text-[#B8B8B8] hover:text-white hover:border-white'
                }`}
              >
                FRONT VIEW (CHEST EMBLEM)
              </button>
              <button
                type="button"
                onClick={() => setActiveImage('back')}
                className={`py-3 text-xs font-black tracking-widest uppercase border transition-all ${
                  activeImage === 'back'
                    ? 'border-[#E10600] bg-[#E10600] text-white shadow-md'
                    : 'border-[#292929] bg-[#111111] text-[#B8B8B8] hover:text-white hover:border-white'
                }`}
              >
                BACK VIEW (CIRCUIT ARTWORK)
              </button>
            </div>

            {/* Paddock Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#111111] border border-[#292929] mt-2 text-center">
              <div className="space-y-1">
                <TruckIcon size={18} className="mx-auto text-[#E10600]" />
                <span className="text-[10px] font-bold text-white uppercase block">EXPRESS DISPATCH</span>
                <span className="text-[9px] text-[#858585] block font-medium">Within 24-48 hrs</span>
              </div>
              <div className="space-y-1 border-x border-[#292929]">
                <RefreshIcon size={18} className="mx-auto text-[#E10600]" />
                <span className="text-[10px] font-bold text-white uppercase block">7-DAY EXCHANGES</span>
                <span className="text-[9px] text-[#858585] block font-medium">Doorstep pickup</span>
              </div>
              <div className="space-y-1">
                <ShieldCheckIcon size={18} className="mx-auto text-[#E10600]" />
                <span className="text-[10px] font-bold text-white uppercase block">100% AUTHENTIC</span>
                <span className="text-[9px] text-[#858585] block font-medium">Original APEXORA design</span>
              </div>
            </div>
          </div>

          {/* Right Side: Product Details & Buy Box (5 Columns on Desktop) */}
          <div className="lg:col-span-5 bg-[#151515] border border-[#292929] p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#292929] px-3 py-1 rounded-sm text-[10px] font-bold tracking-[2.5px] text-[#FFFFFF] uppercase mb-3">
                <span className="w-2.5 h-0.5 bg-[#E10600]" />
                <span>APEXORA / DROP 001</span>
              </div>

              {/* Product Name */}
              <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white tracking-normal uppercase leading-[1.12]">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs text-[#B8B8B8] uppercase tracking-wider mt-1.5 font-medium">
                {product.subtitle}
              </p>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 my-5 pb-4 border-b border-[#292929]">
                <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#858585] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-[10px] font-bold tracking-wider bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/40 px-2 py-0.5 uppercase">
                    SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Garment Description */}
              <div className="space-y-2 text-xs text-[#B8B8B8] mb-6">
                <p className="leading-relaxed font-normal">{product.description}</p>
                <div className="pt-2 text-[11px] text-[#858585] flex items-center gap-4 flex-wrap">
                  <span>COLOUR: <strong className="text-white">{product.color.toUpperCase()}</strong></span>
                  <span>·</span>
                  <span>FIT: <strong className="text-white">OVERSIZED BOXY</strong></span>
                  <span>·</span>
                  <span>FABRIC: <strong className="text-white">240 GSM COTTON</strong></span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-black tracking-widest text-white uppercase">
                    CHOOSE SIZE:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSizeChartOpen(true)}
                    className="text-[11px] font-bold text-[#E10600] hover:underline uppercase tracking-wider"
                  >
                    Size Guide & Chart 📐
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3.5 text-xs font-black tracking-wider uppercase border transition-all ${
                        selectedSize === size
                          ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                          : 'border-[#292929] bg-[#111111] text-white hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#858585] tracking-wider uppercase mt-2">
                  Unisex boxy streetwear cut. For standard fit, order one size down.
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-black tracking-widest text-white uppercase">
                  QUANTITY:
                </span>
                <div className="flex items-center border border-[#292929] bg-[#111111]">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#B8B8B8] hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#B8B8B8] hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#E10600] hover:bg-[#FF1E17] text-white text-xs font-black tracking-[2.5px] uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#E10600]/25 transition-transform active:scale-[0.99]"
                >
                  <BagIcon size={16} />
                  <span>ADD SIZE {selectedSize} TO BAG — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#111111] border-2 border-white hover:border-[#E10600] hover:bg-[#E10600] text-white text-xs font-black tracking-[2.5px] uppercase transition-colors"
                >
                  BUY NOW (INSTANT CHECKOUT) ↗
                </button>
              </div>
            </div>

            {/* Product Meta Details */}
            <div className="mt-8 pt-6 border-t border-[#292929] text-[10px] text-[#858585] uppercase tracking-wider flex justify-between flex-wrap gap-2">
              <span>SKU: <strong className="text-white">{product.sku}</strong></span>
              <span>TAG: <strong className="text-white">{product.tag}</strong></span>
              <span>ORIGIN: <strong className="text-white">INDIA · TRACK TESTED</strong></span>
            </div>
          </div>
        </div>

        {/* Technical Tabs Section: Garment Details & Specs */}
        <div className="mt-16 pt-12 border-t border-[#292929]">
          <div className="flex border-b border-[#292929] gap-6 text-xs font-black tracking-widest uppercase mb-8 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'details' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#858585] hover:text-white'
              }`}
            >
              GARMENT DETAILS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'specs' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#858585] hover:text-white'
              }`}
            >
              TECHNICAL SPECIFICATIONS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#858585] hover:text-white'
              }`}
            >
              PADDOCK REVIEWS (4.9 / 5)
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#B8B8B8] leading-relaxed">
              <div className="space-y-4 bg-[#111111] border border-[#292929] p-6 sm:p-8">
                <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
                  THE CONCEPT & HERITAGE
                </h3>
                <p>{product.description}</p>
                <p>
                  Each piece in Drop 001 is hand-finished with custom neck branding tape, a heat-transfer sizing label (zero neck itch), and reinforced double-needle stitching along the sleeves and bottom hem for long-lasting track durability.
                </p>
              </div>
              <div className="space-y-4 bg-[#111111] border border-[#292929] p-6 sm:p-8">
                <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
                  CARE & MAINTENANCE INSTRUCTIONS
                </h3>
                <ul className="space-y-2 text-[#858585]">
                  <li>• Machine wash cold on gentle cycle with similar dark colors</li>
                  <li>• Always turn the garment inside-out before washing</li>
                  <li>• Do not iron directly on the high-density print graphic</li>
                  <li>• Avoid bleach or harsh chemical detergents</li>
                  <li>• Dry flat or line dry in shade to maintain optimal oversized drape</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-[#111111] border border-[#292929] overflow-x-auto">
              <table className="w-full text-left text-xs uppercase tracking-wider">
                <tbody className="divide-y divide-[#292929]">
                  <tr>
                    <td className="p-4 font-bold text-[#E10600] bg-[#151515] w-1/3">GARMENT FIT</td>
                    <td className="p-4 text-white">{product.specifications.fit}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#E10600] bg-[#151515]">FABRIC COMPOSITION</td>
                    <td className="p-4 text-white">{product.specifications.fabric}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#E10600] bg-[#151515]">FABRIC WEIGHT</td>
                    <td className="p-4 text-white">{product.specifications.weight}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#E10600] bg-[#151515]">PRINT TECHNOLOGY</td>
                    <td className="p-4 text-white">{product.specifications.print}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#E10600] bg-[#151515]">ORIGIN & TESTING</td>
                    <td className="p-4 text-white">{product.specifications.origin}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#E10600] bg-[#151515]">COLLAR SPEC</td>
                    <td className="p-4 text-white">1.25" Heavy-duty 1x1 Lycra Rib (Anti-sag guarantee)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-[#111111] border border-[#292929] p-6">
                <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl text-[#E10600]">
                  4.9
                </span>
                <div>
                  <div className="flex text-[#E10600] text-sm">★★★★★</div>
                  <p className="text-xs text-[#858585] uppercase tracking-wider mt-0.5">
                    Based on 38 verified track day riders across India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#111111] border border-[#292929] p-6 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-white">Sameer K. — Bengaluru</strong>
                    <span className="text-[#E10600]">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#B8B8B8] leading-relaxed">
                    "The weight of this T-shirt is unbelievable. Truly 240+ GSM heavyweight cotton. Wore it over my Dainese under-suit at Kari Motor Speedway and got compliments all weekend."
                  </p>
                </div>

                <div className="bg-[#111111] border border-[#292929] p-6 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-white">Aditya R. — Pune</strong>
                    <span className="text-[#E10600]">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#B8B8B8] leading-relaxed">
                    "The back graphic is razor sharp. Doesn't crack after 4 washes. Clean oversized drop, not baggy in a sloppy way, but sharp motorsport streetwear."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#292929]">
            <div className="bg-[#151515] border border-[#292929] p-6 mb-8 flex items-center justify-between">
              <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white tracking-normal uppercase">
                COMPLETE YOUR <span className="text-[#E10600]">PADDOCK LOOK</span>
              </h2>
              <Link
                href="/shop"
                className="text-xs font-black tracking-widest text-white bg-[#E10600] hover:bg-[#FF1E17] px-4 py-2 uppercase transition-all"
              >
                VIEW CATALOGUE →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Chart Modal */}
      {sizeChartOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setSizeChartOpen(false)}
          />
          <div className="relative bg-[#111111] border border-[#292929] text-white p-6 sm:p-8 max-w-lg w-full z-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] font-bold text-[#E10600] tracking-widest uppercase block">
                  TECHNICAL MEASUREMENTS
                </span>
                <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl text-white uppercase">
                  OVERSIZED T-SHIRT SIZE GUIDE
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSizeChartOpen(false)}
                className="p-1.5 text-[#858585] hover:text-white"
                aria-label="Close size guide"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <table className="w-full text-xs text-left uppercase tracking-wider mb-6">
              <thead>
                <tr className="border-b border-[#292929] text-[#E10600]">
                  <th className="py-2.5 font-black">SIZE</th>
                  <th className="py-2.5 font-black">CHEST (INCH)</th>
                  <th className="py-2.5 font-black">LENGTH (INCH)</th>
                  <th className="py-2.5 font-black">SHOULDER (INCH)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929] text-[#B8B8B8]">
                <tr>
                  <td className="py-2.5 font-bold text-white">S</td>
                  <td className="py-2.5">42"</td>
                  <td className="py-2.5">28.5"</td>
                  <td className="py-2.5">21"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">M</td>
                  <td className="py-2.5">44"</td>
                  <td className="py-2.5">29.5"</td>
                  <td className="py-2.5">22"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">L</td>
                  <td className="py-2.5">46"</td>
                  <td className="py-2.5">30.5"</td>
                  <td className="py-2.5">23"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">XL</td>
                  <td className="py-2.5">48"</td>
                  <td className="py-2.5">31.5"</td>
                  <td className="py-2.5">24"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">XXL</td>
                  <td className="py-2.5">50"</td>
                  <td className="py-2.5">32.5"</td>
                  <td className="py-2.5">25"</td>
                </tr>
              </tbody>
            </table>

            <p className="text-[11px] text-[#858585] leading-relaxed mb-6 font-normal">
              Measurements reflect garment dimensions. Our cut is drop-shoulder boxy oversized. If you prefer a regular tailored fit, order one size down.
            </p>

            <button
              type="button"
              onClick={() => setSizeChartOpen(false)}
              className="w-full py-3 bg-[#E10600] text-white text-xs font-black uppercase tracking-widest"
            >
              GOT IT, RETURN TO GARMENT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
