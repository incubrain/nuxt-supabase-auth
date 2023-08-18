<template>
  <div
    class="w-full bg-slate-100 py-3 px-6 gap-4 flex justify-center items-center"
  >
    <NuxtLink
      v-for="route in router.options.routes"
      :key="route.path"
      :to="route.path"
      :class="
        route.path === router.currentRoute.value.path ? 'text-emerald-500' : ''
      "
    >
      {{ route.path }}
    </NuxtLink>
    <UButton to="/auth/register"> register </UButton>
    <UButton to="/auth/login"> login </UButton>
    <UButton @click="auth.logout"> logout </UButton>
    <p>Logged in: {{ session !== null }}</p>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const auth = useAuthStore();
const { user, session } = storeToRefs(auth);
</script>

<style scoped></style>
