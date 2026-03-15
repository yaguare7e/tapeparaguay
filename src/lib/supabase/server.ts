// ============================================================================
// Server-side Supabase Service Client — Tapé Paraguay
// Uses the service role key to bypass RLS — for API routes only.
// NEVER expose this client to the browser.
// ============================================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let serviceClient: SupabaseClient<Database> | null = null;

export function getServiceClient() {
  if (serviceClient) return serviceClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Check your .env.local file."
    );
  }

  serviceClient = createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return serviceClient;
}
