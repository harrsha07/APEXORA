# APEXORA Admin Dashboard Setup

Open `/admin` to manage the online product catalogue. Admin features: add/edit/delete products, change titles, subtitles, descriptions, prices, colours and labels, upload product photos, and publish/hide items. Changes sync to the public store through Supabase.

## One-time configuration
1. Create a project at https://supabase.com/.
2. Run `supabase-admin-setup.sql` in Supabase Dashboard > SQL Editor. It creates the tables, security policies, image bucket and seeds the three Drop 001 products so you can edit them immediately.
3. In Authentication > Users, create your admin account using your email and a strong password. Disable public sign-ups after creating it.
4. Copy the user's UUID and run in SQL Editor:
   `insert into public.admin_users(user_id) values('YOUR_AUTH_USER_UUID');`
5. Copy `.env.local.example` to `.env.local`.
6. From Supabase Project Settings > API, add your Project URL and anon/publishable key to `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY`
7. Run `npm install` then `npm run dev`.
8. Visit `http://localhost:3000/admin` and sign in.

Never put the Supabase service_role key in browser code or any `NEXT_PUBLIC_` variable. Database Row Level Security limits product writes and image uploads to UUIDs listed in `admin_users`. The public site can read active products. For a live deployment, add the same environment variables to your hosting provider.

Without Supabase setup, the homepage still uses its sample products; the admin login will show setup instructions. This source code does not include live payment processing or shipping integrations.
