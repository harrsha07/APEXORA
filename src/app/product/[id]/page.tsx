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
      <div className="py-24 text-center max-w-2xl mx-auto px-4">
        <Slashes size={38} className="text-[#E10600]" />
        <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl text-white uppercase mt-4">
          PRODUCT NOT FOUND
        </h1>
        <p className="text-xs text-[#8E939C] mt-2 mb-6">
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
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-wider uppercase text-[#7E8491] mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <Link href="/drop-001" className="hover:text-white transition-colors">Drop 001</Link>
        <span>/</span>
        <span className="text-[#E10600]">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Gallery (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Visual Box */}
          <div className="relative aspect-square sm:aspect-[4/3] bg-[#15171B] border border-[#252930] p-6 flex items-center justify-center overflow-hidden">
            {product.tag && (
              <span className="absolute top-4 left-4 z-10 bg-[#E10600] text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase shadow-md">
                {product.tag}
              </span>
            )}
            {product.badge && (
              <span className="absolute top-4 right-4 z-10 bg-[#252930] border border-white/10 text-white text-[9px] font-bold tracking-wider px-2.5 py-1 uppercase">
                {product.badge}
              </span>
            )}
            <img
              src={currentDisplayImage}
              alt={`${product.name} garment`}
              className="w-full h-full object-contain max-h-[500px]"
            />
          </div>

          {/* Front / Back Switcher Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveImage('front')}
              className={`py-3 text-xs font-black tracking-widest uppercase border transition-all ${
                activeImage === 'front'
                  ? 'border-[#E10600] bg-[#E10600] text-white'
                  : 'border-[#2B2F38] bg-[#111418] text-[#A5A8AF] hover:text-white'
              }`}
            >
              FRONT VIEW (CHEST EMBLEM)
            </button>
            <button
              onClick={() => setActiveImage('back')}
              className={`py-3 text-xs font-black tracking-widest uppercase border transition-all ${
                activeImage === 'back'
                  ? 'border-[#E10600] bg-[#E10600] text-white'
                  : 'border-[#2B2F38] bg-[#111418] text-[#A5A8AF] hover:text-white'
              }`}
            >
              BACK VIEW (CIRCUIT ARTWORK)
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#111418] border border-[#252930] mt-4 text-center">
            <div className="space-y-1">
              <TruckIcon size={18} className="mx-auto text-[#E10600]" />
              <span className="text-[10px] font-bold text-white uppercase block">EXPRESS SHIPPING</span>
              <span className="text-[9px] text-[#7E8491] block">Dispatch in 24-48 hrs</span>
            </div>
            <div className="space-y-1 border-x border-[#252930]">
              <RefreshIcon size={18} className="mx-auto text-[#E10600]" />
              <span className="text-[10px] font-bold text-white uppercase block">7-DAY EXCHANGES</span>
              <span className="text-[9px] text-[#7E8491] block">Doorstep pickup</span>
            </div>
            <div className="space-y-1">
              <ShieldCheckIcon size={18} className="mx-auto text-[#E10600]" />
              <span className="text-[10px] font-bold text-white uppercase block">100% AUTHENTIC</span>
              <span className="text-[9px] text-[#7E8491] block">Original APEXORA design</span>
            </div>
          </div>
        </div>

        {/* Right Product Details & Buy Box (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold tracking-[3px] text-[#E10600] uppercase mb-2">
              APEXORA / DROP 001
            </div>

            <h1 className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl sm:text-5xl text-white tracking-tight uppercase leading-[0.92]">
              {product.name}
            </h1>

            <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-1.5">
              {product.subtitle}
            </p>

            {/* Price section */}
            <div className="flex items-baseline gap-3 my-5 pb-4 border-b border-[#252930]">
              <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-4xl text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#6F747F] line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="text-[10px] font-bold tracking-wider bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/40 px-2 py-0.5 uppercase">
                  SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Garment Highlights */}
            <div className="space-y-1.5 text-xs text-[#C6C8CC] mb-6">
              <p className="leading-relaxed">{product.description}</p>
              <div className="pt-2 text-[11px] text-[#8E939C] flex items-center gap-4">
                <span>COLOUR: <strong className="text-white">{product.color.toUpperCase()}</strong></span>
                <span>·</span>
                <span>FABRIC: <strong className="text-white">240 GSM COMBED COTTON</strong></span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-black tracking-widest text-white uppercase">
                  CHOOSE SIZE:
                </span>
                <button
                  onClick={() => setSizeChartOpen(true)}
                  className="text-[11px] font-bold text-[#E10600] hover:underline uppercase tracking-wider"
                >
                  Size Guide & Chart 📐
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3.5 text-xs font-black tracking-wider uppercase border transition-all ${
                      selectedSize === size
                        ? 'bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                        : 'border-[#30353E] bg-[#15171C] text-[#C6C8CC] hover:border-white hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#7E8491] tracking-wider uppercase mt-2">
                Unisex boxy streetwear cut. For a true oversized look, select your regular size.
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-black tracking-widest text-white uppercase">
                QUANTITY:
              </span>
              <div className="flex items-center border border-[#30353E] bg-[#15171C]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#A5A8AF] hover:text-white transition-colors"
                >
                  <MinusIcon size={14} />
                </button>
                <span className="w-10 text-center text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[#A5A8AF] hover:text-white transition-colors"
                >
                  <PlusIcon size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-black tracking-[2.5px] uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#E10600]/25 transition-transform active:scale-[0.99]"
              >
                <BagIcon size={16} />
                <span>ADD SIZE {selectedSize} TO BAG — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 border-2 border-white hover:border-[#E10600] hover:bg-[#E10600] text-white text-xs font-black tracking-[2.5px] uppercase transition-colors"
              >
                BUY NOW (INSTANT CHECKOUT) ↗
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#252930] text-[10px] text-[#6F747F] uppercase tracking-wider flex justify-between">
            <span>SKU: {product.sku}</span>
            <span>TAG: {product.tag}</span>
            <span>MADE IN INDIA</span>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications & Care */}
      <div className="mt-16 pt-12 border-t border-[#252930]">
        <div className="flex border-b border-[#252930] gap-8 text-xs font-black tracking-widest uppercase mb-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'details' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#8E939C] hover:text-white'
            }`}
          >
            GARMENT DETAILS
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'specs' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#8E939C] hover:text-white'
            }`}
          >
            TECHNICAL SPECIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-[#E10600] text-[#E10600]' : 'border-transparent text-[#8E939C] hover:text-white'
            }`}
          >
            PADDOCK REVIEWS (4.9 / 5)
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#C6C8CC] leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
                THE CONCEPT & HERITAGE
              </h3>
              <p>{product.description}</p>
              <p>
                Each piece in Drop 001 is hand-finished with custom neck branding tape, a heat-transfer sizing label (zero neck itch), and reinforced double-needle stitching along the sleeves and bottom hem for long-lasting track durability.
              </p>
            </div>
            <div className="space-y-4 bg-[#111418] border border-[#252930] p-6">
              <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-xl text-white uppercase">
                CARE & MAINTENANCE INSTRUCTIONS
              </h3>
              <ul className="space-y-2 text-[#8E939C]">
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
          <div className="bg-[#111418] border border-[#252930] overflow-x-auto">
            <table className="w-full text-left text-xs uppercase tracking-wider">
              <tbody className="divide-y divide-[#252930]">
                <tr>
                  <td className="p-4 font-bold text-[#E10600] bg-[#15171C] w-1/3">GARMENT FIT</td>
                  <td className="p-4 text-white">{product.specifications.fit}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#E10600] bg-[#15171C]">FABRIC COMPOSITION</td>
                  <td className="p-4 text-white">{product.specifications.fabric}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#E10600] bg-[#15171C]">FABRIC WEIGHT</td>
                  <td className="p-4 text-white">{product.specifications.weight}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#E10600] bg-[#15171C]">PRINT TECHNOLOGY</td>
                  <td className="p-4 text-white">{product.specifications.print}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#E10600] bg-[#15171C]">ORIGIN & TESTING</td>
                  <td className="p-4 text-white">{product.specifications.origin}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#E10600] bg-[#15171C]">COLLAR SPEC</td>
                  <td className="p-4 text-white">1.25" Heavy-duty 1x1 Lycra Rib (Anti-sag guarantee)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-[#111418] border border-[#252930] p-6">
              <span className="font-['Barlow_Condensed',sans-serif] font-black italic text-5xl text-[#E10600]">
                4.9
              </span>
              <div>
                <div className="flex text-[#E10600] text-sm">★★★★★</div>
                <p className="text-xs text-[#8E939C] uppercase tracking-wider mt-0.5">
                  Based on 38 verified track day riders across India
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#111418] border border-[#252930] p-6 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <strong className="text-white">Sameer K. — Bengaluru</strong>
                  <span className="text-[#E10600]">★★★★★</span>
                </div>
                <p className="text-xs text-[#A5A8AF] leading-relaxed">
                  "The weight of this tee is unbelievable. Truly 240+ GSM heavyweight cotton. Wore it over my Dainese under-suit at Kari Motor Speedway and got compliments all weekend."
                </p>
              </div>

              <div className="bg-[#111418] border border-[#252930] p-6 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <strong className="text-white">Aditya R. — Pune</strong>
                  <span className="text-[#E10600]">★★★★★</span>
                </div>
                <p className="text-xs text-[#A5A8AF] leading-relaxed">
                  "The back graphic is razor sharp. Doesn't crack after 4 washes. Clean oversized drop, not baggy in a sloppy way, but sharp motorsport streetwear."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sizing Chart Modal */}
      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSizeChartOpen(false)} />
          <div className="relative bg-[#111418] border border-[#2B2F38] text-white w-full max-w-2xl p-6 shadow-2xl z-10">
            <div className="flex justify-between items-center pb-4 border-b border-[#252930] mb-4">
              <h3 className="font-['Barlow_Condensed',sans-serif] font-black italic text-2xl uppercase">
                APEXORA OVERSIZED T-SHIRT SIZE CHART
              </h3>
              <button onClick={() => setSizeChartOpen(false)} className="text-[#8E939C] hover:text-white">
                <CloseIcon size={20} />
              </button>
            </div>
            <p className="text-xs text-[#8E939C] mb-4">
              All measurements are in inches. Garment has a boxy drop-shoulder streetwear fit.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs uppercase">
                <thead className="bg-[#15171C] text-[#E10600]">
                  <tr>
                    <th className="p-3">SIZE</th>
                    <th className="p-3">CHEST (IN)</th>
                    <th className="p-3">LENGTH (IN)</th>
                    <th className="p-3">SHOULDER (IN)</th>
                    <th className="p-3">SLEEVE (IN)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252930] text-[#C6C8CC]">
                  <tr><td className="p-3 font-bold text-white">S</td><td className="p-3">42</td><td className="p-3">28.5</td><td className="p-3">21</td><td className="p-3">9.5</td></tr>
                  <tr><td className="p-3 font-bold text-white">M</td><td className="p-3">44</td><td className="p-3">29.5</td><td className="p-3">22</td><td className="p-3">10.0</td></tr>
                  <tr><td className="p-3 font-bold text-white">L</td><td className="p-3">46</td><td className="p-3">30.5</td><td className="p-3">23</td><td className="p-3">10.5</td></tr>
                  <tr><td className="p-3 font-bold text-white">XL</td><td className="p-3">48</td><td className="p-3">31.5</td><td className="p-3">24</td><td className="p-3">11.0</td></tr>
                  <tr><td className="p-3 font-bold text-white">XXL</td><td className="p-3">50</td><td className="p-3">32.5</td><td className="p-3">25</td><td className="p-3">11.5</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setSizeChartOpen(false)}
              className="mt-6 w-full py-3 bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="mt-20 pt-12 border-t border-[#252930]">
        <h2 className="font-['Barlow_Condensed',sans-serif] font-black italic text-3xl sm:text-4xl text-white uppercase tracking-tight mb-8">
          COMPLETE YOUR <span className="text-[#E10600]">PADDOCK KIT</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
