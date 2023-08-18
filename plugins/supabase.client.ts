import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient;

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  const env = useRuntimeConfig().public;
  if (!supabase) {
    supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
      db: {
        schema: "public",
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }

  return {
    provide: {
      supabase,
    },
  };
});
