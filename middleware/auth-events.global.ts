import { SupabaseClient } from "@supabase/supabase-js";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $router, $supabase } = useNuxtApp();
  const { client } = $supabase
  const auth = useAuthStore();

  await client.auth.onAuthStateChange((event: string, session) => {
    if (event == "SIGNED_IN") {
      console.log("SIGNED_IN", session);
      auth.updateSession(session);
      $router.push("/protected/create-users"); // Redirect to a protected area
    }

    if (event == "SIGNED_OUT") {
      console.log('signed out', session);
      $router.push("/auth/login"); // Redirect to login page
    }

    if (event == "TOKEN_REFRESHED") {
      console.log("TOKEN_REFRESHED", session);
      auth.updateSession(session); // Update token in the store
    }

    if (event == "USER_UPDATED") {
      console.log("USER_UPDATED", session);
      auth.updateSession(session); // Update user data in the store
    }

    if (event == "PASSWORD_RECOVERY") {
      console.log("PASSWORD_RECOVERY", session);
      $router.push("/password-recovery"); // Redirect to password recovery page
    }
  });
});

