<template>
  <div class="py-32">
    <form
      @submit.prevent="auth.login({ email, password })"
      class="flex flex-col max-w-3xl mx-auto p-4 rounded-md bg-slate-100 gap-4"
    >
      <h1 class="text-xl font-semibold">Login</h1>
      <input
        v-model="email"
        class="rounded-md p-2"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <input
        v-model="password"
        class="rounded-md p-2"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
// !TODO: add form validation
// !TODO: add feedback for login errors

const email = ref("");
const password = ref("");

const auth = useAuthStore();

const { hash } = useRoute();
const router = useRouter();

const extractFromHash = (paramName: string) => {
  const regex = new RegExp("(?:[&]|^)" + paramName + "=([^&]*)");
  const match = hash.substring(1).match(regex); // Remove the '#' at the beginning of the hash
  return match ? decodeURIComponent(match[1]) : null;
};

watch(
  () => hash,
  (newHash) => {
    if (newHash.startsWith("#access_token")) {
      console.log("newHash", newHash);
      const session = {
        access_token: String(extractFromHash("access_token")),
        refresh_token: String(extractFromHash("refresh_token")),
        expires_in: Number(extractFromHash("expires_in")),
        token_type: String(extractFromHash("token_type")),
        type: String(extractFromHash("type")),
      };
      console.log("session", session);
      auth.updateSession(session);
      router.push("/protected/create-users");
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
