export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("protected", to, from);
  // const nuxtApp = useNuxtApp();
  const auth = useAuthStore();
  // const isAuthenticated = await auth.getSession()
  const { user } = storeToRefs(auth);
  const isAuthenticated = user.value?.aud === "authenticated" ? true : false;
  if (!isAuthenticated && to.path.includes("protected")) {
    console.log("isNotAuthenticated", isAuthenticated);
    return navigateTo("/auth/login");
  }
});
