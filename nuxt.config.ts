// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxthq/ui"],
  pinia: {
    autoImports: ["storeToRefs", "defineStore"],
  },
  imports: {
    dirs: ["stores", "data"],
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      TESTING_USERNAME: process.env.TESTING_USERNAME,
      TESTING_PASSWORD: process.env.TESTING_PASSWORD,
      TEST_MODE: process.env.TEST_MODE,
    },
  },
});
