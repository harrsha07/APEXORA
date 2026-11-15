# APEXORA — MOTORSPORTS CULTURE
### Premium Motorsport Streetwear & Full-Stack E-Commerce Platform
**Tagline:** BUILT FOR SPEED. DEFINED BY CULTURE.  
**Founded by:** Harsha (Bengaluru, India)

---

## 🏁 Executive Overview

**APEXORA** is a full-stack, production-ready motorsport fashion e-commerce platform built with an international dark racing aesthetic (#08090B, #111418, #E10600 Racing Red, and #C0C0C0 Metallic Silver). It provides a high-converting storefront paired with an enterprise-grade **Admin Control Room** (`/admin`) giving the brand owner 100% control over the entire website without editing source code.

---

## ⚡ Tech Stack Architecture

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Pure Racing Utility CSS System (zero external CSS dependencies, sub-millisecond build), High-Performance Custom SVG Icons.
- **Backend:** Next.js Route Handlers (`/api/checkout`, `/api/verify-payment`, `/api/admin/publish`, `/api/track-order`).
- **Database & Auth:** Supabase PostgreSQL with 18 relational tables, Row Level Security (RLS) policies, and Supabase Storage buckets.
- **Client State & Draft Engine:** Persistent React Context store with Draft vs. Published dual-stage workflow, shopping cart persistence, and coupon deductions.
- **Payments:** Razorpay Indian payment gateway (UPI, Cards, NetBanking, COD) with server-side signature verification.
- **Deployment:** Vercel edge runtime ready.

---

## 🗺️ Complete Storefront Navigation (19 Pages)

1. **Home (`/`)** — Dynamic modular homepage (Hero, Featured Products, Manifesto, Collections Spotlight, Instagram Gallery, Newsletter).
2. **Shop All (`/shop`)** — Complete garment catalogue with category filters, color pickers, sorting (price/newest), and real-time search.
3. **New Arrivals (`/new-arrivals`)** — Fresh paddock drops and limited runs.
4. **Drop 001 (`/drop-001`)** — Dedicated *The Pursuit* collection page with master design board lookbook.
5. **Product Detail (`/product/[id]`)** — High-res front/back switcher, size selector (S–XXL), size chart guide, 240+ GSM cotton specs, and reviews.
6. **Collections (`/collections`)** — Series capsules (Drop 001, Rider Series, Track Essentials).
7. **Collection Detail (`/collections/[slug]`)** — Filtered products for specific series.
8. **About APEXORA (`/about`)** — Brand history, Harsha's racer origins, and garment craftsmanship (editable via CMS).
9. **Our Motorsport Culture (`/culture`)** — Racing philosophy and paddock mindset (editable via CMS).
10. **Contact Us (`/contact`)** — Pit crew transmission form, WhatsApp link, and Bengaluru address.
11. **Shopping Cart (`/cart`)** — Full bag page, free shipping meter, coupon code box, and shipping calculator.
12. **Checkout (`/checkout`)** — 3-step checkout with Indian state validation, 6-digit PIN code check, Razorpay & COD.
13. **Customer Account (`/account`)** — Profile management, past order history, and saved addresses.
14. **Order Tracking (`/track-order`)** — Live 4-stage logistics tracker with Blue Dart/Delhivery courier integration.
15. **Order Success (`/order-success/[id]`)** — Dispatch confirmation, printable invoice, and tracking button.
16. **FAQ (`/faq`)** — Interactive accordion for sizing, fabric weight, and doorstep exchanges.
17. **Privacy Policy (`/privacy`)** — RBI & PCI-DSS compliant customer privacy documentation.
18. **Terms & Conditions (`/terms`)** — Commercial and intellectual property guidelines.
19. **Shipping Policy (`/shipping`)** & **Returns Policy (`/returns`)** — 7-day doorstep exchange rules and ₹1,499 free shipping threshold.

---

## 🛠️ Complete Admin Control Room (`/admin`)

The `/admin` dashboard gives the website owner 100% control over the entire platform without touching code:

- **A. Overview:** Real-time revenue analytics, order counts, pending fulfillment, inventory alerts, and sales velocity meters.
- **B. Website Customization:** Visual customizer for brand name, tagline, logos, 4-color racing palette pickers, typography fonts, button shapes (skewed/sharp/rounded), header height, and top announcement bar ticker.
- **C. Homepage Editor:** Reorderable, toggleable sections (Hero, Featured, Brand Story, Collections Spotlight, Instagram, Newsletter). Edit copy, CTAs, links, and background photos.
- **D. Product Manager:** Add, edit, duplicate, and delete products. Configure front and back image visuals, sizes (S, M, L, XL, XXL), colors, tags, SKU, stock count, and live/hidden state.
- **E. Collection Manager:** Create and update curated release drops and assign garments.
- **F. Media Library:** Upload and organize photos (JPG, PNG, WebP, AVIF, MP4) with direct URL copying and alt-text editing.
- **G. Navigation Manager:** Add, reorder, and edit menu labels, destination URLs, badges (`HOT`, `NEW`), and header/footer placement.
- **H. Content CMS:** Edit About, Culture, Contact, FAQ, and all 4 Policy pages directly in rich text.
- **I. Order Management:** Filter orders by status (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Refunded), update statuses, assign courier carriers & AWB tracking numbers, and view customer invoices.
- **J. Customer Management:** Search customer records, view lifetime order histories and spend, and export data to CSV.
- **K. Discounts & Offers:** Create promo codes (e.g. `APEX10`, `PURSUIT20`, `FREESHIP`), percentage/fixed values, minimum spend requirements, and usage limits.
- **L. SEO Management:** Meta titles, meta descriptions, Open Graph preview cards, keywords, and Google indexability.
- **M. Website Settings:** Business email, phone, WhatsApp number, Instagram/YouTube URLs, free shipping threshold (₹1,499), standard shipping fee (₹99), and maintenance mode ("Pit Stop") switch.

---

## 🔒 Two-Stage Draft & Publish System

Edits made in the Admin Dashboard are saved to **Draft Mode** first:
- **Save as Draft:** Persists edits without making them immediately visible to live public customers.
- **Preview Store:** Allows the admin to browse the public website in Draft Preview Mode with a sticky preview bar.
- **Publish Live:** Atomically commits all changes to the public storefront and synchronizes with Supabase.
- **Discard Edits:** Reverts draft changes back to the currently published live version.
- **Restore Defaults:** Resets settings to factory APEXORA defaults.

---

## 🗄️ Database Architecture (`supabase-complete-setup.sql`)

The repository includes `supabase-complete-setup.sql` containing all 18 PostgreSQL tables:
1. `products`
2. `product_variants`
3. `product_images`
4. `categories`
5. `collections`
6. `collection_products`
7. `website_settings`
8. `homepage_sections`
9. `navigation_items`
10. `content_pages`
11. `media_library`
12. `customers`
13. `orders`
14. `order_items`
15. `payments`
16. `discount_codes`
17. `admin_profiles` / `admin_users`
18. `audit_logs`

With Row Level Security (RLS) policies, query indexes, storage bucket setup (`product-images`), and pre-seeded Drop 001 garments.

---

## 🚀 Local Development Setup

1. Open a terminal in the project directory:
   ```bash
   cd apexora-motorsport-store-v5
   ```

2. Copy the environment variables template:
   ```bash
   cp .env.local.example .env.local
   ```

3. Run the development server:
   ```bash
   npm.cmd run dev
   ```

4. Open your browser:
   - **Storefront:** [http://localhost:3000](http://localhost:3000)
   - **Admin Control Room:** [http://localhost:3000/admin](http://localhost:3000/admin)
     - Default Admin Email: `admin@apexora.store`
     - Default Admin Password: `admin` (or any password >= 4 characters)

5. Test Production Build:
   ```bash
   npm.cmd run build
   ```

---

## 💳 Razorpay Indian Payments Integration

1. Sign up at [https://razorpay.com](https://razorpay.com) and navigate to **Settings > API Keys**.
2. Copy your **Key ID** and **Key Secret** into `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
   ```
3. When keys are present, the checkout executes verified Razorpay payment modal with UPI, NetBanking, and card processing. When keys are omitted, the checkout executes in secure sandbox mode so you can test orders end-to-end immediately.

---

## ☁️ Vercel Deployment Instructions

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **Add New > Project** and import the repository.
3. Set the Root Directory to `apexora-motorsport-store-v5` if not already at the repository root.
4. Add the environment variables from `.env.local.example`.
5. Click **Deploy**. Vercel will build and launch the site globally with edge caching.

---

**APEXORA — BUILT FOR SPEED. DEFINED BY CULTURE.**
