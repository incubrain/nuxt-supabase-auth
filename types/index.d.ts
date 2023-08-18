import { SupabaseClient } from "@supabase/supabase-js";

declare module "#app" {
  interface NuxtApp {
    $supabase: SupabaseClient;
  }
}

export {};
