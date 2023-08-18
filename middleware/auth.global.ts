export default defineNuxtRouteMiddleware(async (to, from) => {
  const admin = useTestingStore();
  const { settings } = storeToRefs(admin);

  if (!settings.value.authOn) {
    console.log("auth is off");
    return;
  }
  const auth = useAuthStore();
  console.log("auth is on", auth.isAuthenticated);

  // if the user is authenticated, don't do anything
  if (auth && auth.isAuthenticated) return;

  // if no tokens and protectd route, navigate to login
  if (!auth.hasTokens && auth.isProtectedRoute(to.fullPath)) {
    console.log("auth: navigate to login");
    return navigateTo("/auth/login");
  }

  // handle first time login
  if (auth.isFirstLogin) {
    console.log("auth: first login");
    await auth.setSession();
    return navigateTo("/protected/create-users");
  }

  // if the cookie session has NOT expired, set the session
  if (!auth.hasSessionExpired) {
    console.log("auth: setSession", auth.hasSessionExpired);
    const success = await auth.setSession();
    console.log("auth: setSession success", success);
    if (!success)
      throw createError({ statusCode: 401, message: "setSession Failed" });
    return;
  }

  console.log("auth: should not continue");

  // finally, if no session cookies exists, force user to login
  if (!auth.isAuthenticated && auth.isProtectedRoute(to.fullPath)) {
    console.log("auth: force login");
    return navigateTo("/auth/login");
  }
});
