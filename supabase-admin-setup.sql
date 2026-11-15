-- Run in Supabase Dashboard > SQL Editor
create extension if not exists pgcrypto;
create table if not exists public.admin_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null, subtitle text not null default '',
 price numeric(10,2) not null check(price > 0), image_url text not null,
 color text not null default '', tag text not null default '',
 description text not null default '', active boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
-- Seed the three initial Drop 001 products so they can be edited in the admin panel.
insert into public.products(name,subtitle,price,image_url,color,tag,description,active)
select 'APEX ONE','Racing performance oversized tee',1099,'/images/apex-one.jpg','Jet black','01 / RACE DNA','A bold track-inspired graphic built around speed, precision and the apex mindset.',true
where not exists(select 1 from public.products where name='APEX ONE');
insert into public.products(name,subtitle,price,image_url,color,tag,description,active)
select 'REDLINE','Track series oversized tee',999,'/images/redline.jpg','Off white','02 / TRACK SERIES','A clean off-white base with high-contrast REDLINE graphics and racing details.',true
where not exists(select 1 from public.products where name='REDLINE');
insert into public.products(name,subtitle,price,image_url,color,tag,description,active)
select 'APEX AFTER DARK','Night ride oversized tee',1199,'/images/after-dark.jpg','Washed charcoal','03 / NIGHT EDITION','A darker night-ride graphic for the hours after the circuit lights go out.',true
where not exists(select 1 from public.products where name='APEX AFTER DARK');

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
create policy "Admin reads own allowlist row" on public.admin_users for select to authenticated using(user_id=auth.uid());
create policy "Public reads active products and admins read all" on public.products for select to anon,authenticated using(active=true or exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins insert products" on public.products for insert to authenticated with check(exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins update products" on public.products for update to authenticated using(exists(select 1 from public.admin_users a where a.user_id=auth.uid())) with check(exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins delete products" on public.products for delete to authenticated using(exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('product-images','product-images',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=8388608;
create policy "Public views product images" on storage.objects for select to anon,authenticated using(bucket_id='product-images');
create policy "Admins upload product images" on storage.objects for insert to authenticated with check(bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins update product images" on storage.objects for update to authenticated using(bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid())) with check(bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
create policy "Admins delete product images" on storage.objects for delete to authenticated using(bucket_id='product-images' and exists(select 1 from public.admin_users a where a.user_id=auth.uid()));
-- After creating your admin in Authentication > Users, authorize that UUID:
-- insert into public.admin_users(user_id) values('YOUR_AUTH_USER_UUID');
