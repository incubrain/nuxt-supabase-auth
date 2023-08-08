// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  pinia: {
    autoImports: ["storeToRefs", "defineStore"],
  },
  imports: {
    dirs: ["stores", "data"],
  },
  runtimeConfig: {
    public: {
      NODE_ENV: "development"
    },
    TESTING_USERNAME: process.env.TESTING_USERNAME,
    TESTING_PASSWORD: process.env.TESTING_PASSWORD,
  },
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/protected/create-users",
      exclude: ["/auth/**"],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: true,
    },
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
});
