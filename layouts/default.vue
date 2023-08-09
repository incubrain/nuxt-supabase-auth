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
        @click="auth.register"
        class="p-2 rounded-md bg-emerald-500 text-white"
      >
        register
      </button>
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
      <p class="p-2 rounded-md bg-emerald-500 text-white">
        Logged in: {{ session !== null }}
      </p>
    </div>
    <div
      class="fixed bottom-2 left-2 rounded-md bg-emerald-500 flex flex-col gap-8 px-4 py-2 max-w-[80vw]"
    >
      <p class="text-white font-bold">User: {{ user }}</p>
      <p class="text-white font-bold">Session: {{ session }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const auth = useAuthStore();
const { user, session } = storeToRefs(auth);
</script>

<style scoped></style>
