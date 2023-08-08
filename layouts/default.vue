<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full bg-slate-100 py-3 px-6 gap-4 flex justify-center items-center"
    >
      <NuxtLink
        v-for="route in router.options.routes"
        :key="route.path"
        :to="route.path"
        class="p-2 rounded-md"
        :class="{
          'bg-emerald-500': route.path === router.currentRoute.value.path,
        }"
      >
        {{ route.path }}
      </NuxtLink>
      <button
        @click="auth.login"
        class="p-2 rounded-md bg-emerald-500 text-white"
      >
        login
      </button>
      <button
        @click="auth.logout"
        class="p-2 rounded-md bg-emerald-500 text-white"
      >
        logout
      </button>
      <button
        @click="auth.getSession"
        class="p-2 rounded-md bg-emerald-500 text-white"
      >
        session
      </button>
    </div>
    <div class="fixed bottom-2 left-2 rounded-md bg-emerald-500 px-4 py-2">
      <p class="text-white font-bold">user: {{ user }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const auth = useAuthStore();
const { user } = storeToRefs(auth);
</script>

<style scoped></style>
