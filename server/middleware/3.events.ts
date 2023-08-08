import { setAuth } from "../utils/setAuth";

export default defineEventHandler(async (event) => {
  console.log("supa events", event.path);
  if (!event.context.supabaseClient) return;
  const client = event.context.supabaseClient;
  console.log("supa events");
  // let isAuth: boolean | undefined;

  await client.auth.onAuthStateChange((supaEvent: string, session) => {
    if (supaEvent == "SIGNED_IN") {
      // context isn't passed up
      const isAuth = session?.user.aud === "authenticated" ? true : false;
      setAuth(event, isAuth);
      console.log("SIGNED_IN", event.context.auth);
    }
    if (supaEvent == "SIGNED_OUT") isAuth = false;
    if (supaEvent == "TOKEN_REFRESHED") console.log("TOKEN_REFRESHED", session);
    if (supaEvent == "USER_UPDATED") console.log("USER_UPDATED", session);
    if (supaEvent == "PASSWORD_RECOVERY") {
      console.log("PASSWORD_RECOVERY", session);
      // show screen to update user's password
    }
  });

  // console.log("Check isAuthenticated", isAuth);
  // event.context.auth = isAuth === undefined ? false : isAuth;
  // console.log("Check isAuthenticated", event.context.auth);

  if (!client) {
    throw createError({
      statusCode: 401,
      message: "Error creating supabase client",
    });
  }
});
