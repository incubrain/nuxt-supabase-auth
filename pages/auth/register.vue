<template>
  <div class="py-32">
    <form
      @submit.prevent="auth.register({ email, password })"
      class="flex flex-col max-w-3xl mx-auto p-4 rounded-md bg-slate-100 gap-4"
    >
    <h1 class="text-xl font-semibold">Register</h1>
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
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");

const auth = useAuthStore();

</script>

<style scoped></style>
