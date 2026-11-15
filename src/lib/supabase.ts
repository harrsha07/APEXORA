import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key && url.startsWith('http')) {
    try {
      client = createClient(url, key);
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      client = null;
    }
  } else {
    client = null;
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return !!getSupabase();
}
