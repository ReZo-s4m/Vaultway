import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Server-side Supabase client using the service_role key. This key bypasses
 * Row Level Security, so it must NEVER be exposed to the browser. All Storage
 * access happens here, behind the API's own authorization checks.
 */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const STORAGE_BUCKET = env.SUPABASE_STORAGE_BUCKET;
