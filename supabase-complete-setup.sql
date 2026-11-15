-- ==============================================================================
-- APEXORA — MOTORSPORTS CULTURE
-- COMPLETE DATABASE ARCHITECTURE & SUPABASE SETUP
-- ==============================================================================

-- 1. Enable Required Extensions
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- 2. Admin Users & Profiles
create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  email text not null unique,
  role text not null default 'Administrator' check (role in ('Owner', 'Administrator', 'Editor', 'Order Manager')),
  full_name text not null default 'APEXORA Administrator',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backward compatibility with existing admin_users table
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 3. Categories
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text default '',
  created_at timestamptz not null default now()
);

-- 4. Products Table
create table if not exists public.products (
  id text primary key,
  name text not null,
  subtitle text not null default '',
  price numeric(10,2) not null check (price > 0),
  compare_at_price numeric(10,2) check (compare_at_price is null or compare_at_price > price),
  image_url text not null,
  back_image_url text default '',
  color text not null default 'Jet Black',
  tag text not null default '01 / RACE DNA',
  category text not null default 'Oversized T-shirts',
  description text not null default '',
  specifications jsonb default '{"fit":"Oversized drop-shoulder","fabric":"100% Combed Cotton","weight":"240 GSM","print":"High-density screen print","origin":"Made in India","care":"Machine wash cold"}'::jsonb,
  sizes text[] default array['S', 'M', 'L', 'XL', 'XXL'],
  sku text not null unique,
  stock integer not null default 50 check (stock >= 0),
  active boolean not null default true,
  featured boolean not null default true,
  badge text default 'DROP 001',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. Product Variants
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products(id) on delete cascade,
  size text not null check (size in ('S', 'M', 'L', 'XL', 'XXL')),
  sku text not null unique,
  stock integer not null default 10 check (stock >= 0),
  created_at timestamptz not null default now()
);

-- 6. Product Images / Gallery
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products(id) on delete cascade,
  image_url text not null,
  view_type text default 'front' check (view_type in ('front', 'back', 'detail', 'lookbook')),
  alt_text text default '',
  sort_order integer default 0
);

-- 7. Collections Table
create table if not exists public.collections (
  id text primary key,
  slug text not null unique,
  title text not null,
  tagline text not null default '',
  description text not null default '',
  banner_image text not null,
  product_ids text[] not null default array[]::text[],
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. Website Settings Table (Singleton Row id=1)
create table if not exists public.website_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null default 'APEXORA',
  tagline text not null default 'BUILT FOR SPEED. DEFINED BY CULTURE.',
  logo_text text not null default '/// APEXORA',
  announcement_text text not null default 'DROP 001 — THE PURSUIT IS LIVE',
  announcement_subtext text not null default 'FREE EXPRESS SHIPPING ON ORDERS OVER ₹1,499 ACROSS INDIA',
  announcement_link text default '/drop-001',
  announcement_active boolean not null default true,
  primary_color text not null default '#08090B',
  secondary_color text not null default '#111418',
  accent_color text not null default '#E10600',
  background_color text not null default '#08090B',
  heading_font text not null default 'Barlow Condensed',
  body_font text not null default 'Rajdhani',
  button_style text not null default 'skewed' check (button_style in ('skewed', 'sharp', 'rounded')),
  currency text not null default 'INR',
  currency_symbol text not null default '₹',
  shipping_charge numeric(10,2) not null default 99.00,
  free_shipping_threshold numeric(10,2) not null default 1499.00,
  contact_email text not null default 'contact@apexora.store',
  business_phone text not null default '+91 98765 43210',
  whatsapp_number text not null default '+91 98765 43210',
  instagram_url text not null default 'https://www.instagram.com/harrsha.58/',
  youtube_url text not null default 'https://www.youtube.com/@harrsha.58',
  business_address text not null default 'APEXORA Motorsports Culture, 42 Circuit View, Indiranagar, Bengaluru, Karnataka 560038, India',
  maintenance_mode boolean not null default false,
  updated_at timestamptz not null default now()
);

-- 9. Homepage Sections
create table if not exists public.homepage_sections (
  id text primary key,
  type text not null,
  title text not null,
  subtitle text not null default '',
  eyebrow text default '',
  description text default '',
  cta_text text default '',
  cta_link text default '',
  background_image text default '',
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 10. Navigation Menu Items
create table if not exists public.navigation_items (
  id text primary key,
  label text not null,
  href text not null,
  location text not null default 'both' check (location in ('header', 'footer', 'both')),
  sort_order integer not null default 0,
  visible boolean not null default true,
  badge text default '',
  created_at timestamptz not null default now()
);

-- 11. Content CMS Pages
create table if not exists public.content_pages (
  id text primary key,
  slug text not null unique,
  title text not null,
  subtitle text not null default '',
  content text not null default '',
  meta_title text default '',
  meta_description text default '',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 12. Media Library Table
create table if not exists public.media_library (
  id text primary key,
  name text not null,
  url text not null,
  file_size text not null default '',
  format text not null default 'JPG',
  alt_text text not null default '',
  category text not null default 'general',
  uploaded_at timestamptz not null default now()
);

-- 13. Customers Table
create table if not exists public.customers (
  id text primary key,
  name text not null,
  email text not null unique,
  phone text not null,
  total_orders integer not null default 0,
  total_spent numeric(10,2) not null default 0.00,
  default_address text default '',
  status text not null default 'Active' check (status in ('Active', 'Blocked')),
  created_at timestamptz not null default now()
);

-- 14. Orders Table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address jsonb not null,
  items jsonb not null,
  subtotal numeric(10,2) not null check (subtotal >= 0),
  discount numeric(10,2) not null default 0.00 check (discount >= 0),
  discount_code text default '',
  shipping_fee numeric(10,2) not null default 0.00 check (shipping_fee >= 0),
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded')),
  payment_method text not null default 'Razorpay' check (payment_method in ('Razorpay', 'COD')),
  payment_id text default '',
  tracking_number text default '',
  carrier text default '',
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 15. Discount Codes Table
create table if not exists public.discount_codes (
  id text primary key,
  code text not null unique,
  type text not null default 'percentage' check (type in ('percentage', 'fixed')),
  value numeric(10,2) not null check (value > 0),
  min_order_value numeric(10,2) not null default 0 check (min_order_value >= 0),
  usage_limit integer,
  usage_count integer not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  description text default '',
  created_at timestamptz not null default now()
);

-- 16. Audit Logs Table
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  timestamp timestamptz not null default now(),
  action text not null,
  user_email text not null,
  details text default ''
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
create index if not exists idx_products_active on public.products(active);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_content_pages_slug on public.content_pages(slug);
create index if not exists idx_collections_slug on public.collections(slug);
create index if not exists idx_discount_codes_code on public.discount_codes(code);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.admin_profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.collections enable row level security;
alter table public.website_settings enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.navigation_items enable row level security;
alter table public.content_pages enable row level security;
alter table public.media_library enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.discount_codes enable row level security;
alter table public.audit_logs enable row level security;

-- Admin check helper
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.admin_users where user_id = auth.uid()
  ) or exists (
    select 1 from public.admin_profiles where user_id = auth.uid()
  );
end;
$$ language plpgsql;

-- Public can read active products; Admins can read all and write
create policy "Public reads active products" on public.products for select using (active = true or public.is_admin());
create policy "Admins write products" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Public can read collections, settings, sections, nav, pages
create policy "Public reads collections" on public.collections for select using (true);
create policy "Admins write collections" on public.collections for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads settings" on public.website_settings for select using (true);
create policy "Admins write settings" on public.website_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads sections" on public.homepage_sections for select using (true);
create policy "Admins write sections" on public.homepage_sections for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads navigation" on public.navigation_items for select using (true);
create policy "Admins write navigation" on public.navigation_items for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public reads pages" on public.content_pages for select using (published = true or public.is_admin());
create policy "Admins write pages" on public.content_pages for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Orders: Public can insert orders; Admins can read/update all
create policy "Public inserts orders" on public.orders for insert with check (true);
create policy "Customers read own orders" on public.orders for select using (customer_email = auth.jwt() ->> 'email' or public.is_admin());
create policy "Admins write orders" on public.orders for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Discounts: Public reads active discount codes
create policy "Public reads active discounts" on public.discount_codes for select using (active = true);
create policy "Admins write discounts" on public.discount_codes for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS CONFIGURATION
-- ==============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4'])
on conflict (id) do update set public = true, file_size_limit = 10485760;

create policy "Public reads product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin());
create policy "Admins delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());

-- ==============================================================================
-- SEED DATA: DROP 001 GARMENTS
-- ==============================================================================
insert into public.products (id, name, subtitle, price, compare_at_price, image_url, back_image_url, color, tag, category, description, sku, stock, active, featured, badge)
values 
  ('apex-one', 'APEX ONE', 'Racing performance oversized T-shirt', 1099, 1499, '/images/apex-one.jpg', '/images/apex-one.jpg', 'Jet Black', '01 / RACE DNA', 'Oversized T-shirts', 'The definitive APEXORA launch garment. Cut in 240+ GSM combed cotton with high-density racing typography on chest and aggressive angular APEX race-craft graphic across back.', 'APX-001-BLK', 45, true, true, 'DROP 001 EXCLUSIVE'),
  ('redline', 'REDLINE', 'Track series oversized T-shirt', 999, 1399, '/images/redline.jpg', '/images/redline.jpg', 'Off White', '02 / TRACK SERIES', 'Oversized T-shirts', 'Raw pit-lane aesthetic. An off-white vintage canvas adorned with technical checkered flag motifs, tachometer redline gradients, and aerodynamic speed strokes.', 'APX-002-WHT', 38, true, true, 'BEST SELLER'),
  ('after-dark', 'APEX AFTER DARK', 'Night ride oversized T-shirt', 1199, 1699, '/images/after-dark.jpg', '/images/after-dark.jpg', 'Washed Charcoal', '03 / NIGHT EDITION', 'Oversized T-shirts', 'Washed charcoal acid-wash finish with a stealth minimalist chest emblem and a photorealistic midnight superbike racer graphic across the rear.', 'APX-003-CHR', 24, true, true, 'LIMITED RUN'),
  ('circuit-series', 'CIRCUIT SERIES', 'Apex telemetry technical oversized T-shirt', 1299, 1799, '/images/redline.jpg', '/images/apex-one.jpg', 'Matte Asphalt', '04 / TELEMETRY', 'Oversized T-shirts', 'Inspired by sector splits, apex speeds and circuit telemetry. Features technical circuit blueprint maps and racing sector delta times printed in micro-silver metallic ink.', 'APX-004-ASP', 50, true, false, 'NEW ARRIVAL')
on conflict (id) do nothing;

-- Seed Settings Singleton
insert into public.website_settings (id, site_name, tagline, logo_text, announcement_text, accent_color)
values (1, 'APEXORA', 'BUILT FOR SPEED. DEFINED BY CULTURE.', '/// APEXORA', 'DROP 001 — THE PURSUIT IS LIVE', '#E10600')
on conflict (id) do nothing;
