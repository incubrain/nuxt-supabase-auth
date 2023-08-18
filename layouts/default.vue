<template>
  <div>
    <NavTop />
    <div
      class="fixed bottom-2 left-2 rounded-md bg-emerald-500 flex gap-8 px-4 py-2 max-w-[80vw]"
    >
      <p class="text-white font-bold">User: {{ user?.email || "no user" }}</p>
      <p class="text-white font-bold">Session: {{ auth.hasSession }}</p>
    </div>
    <div class="max-w-[600px] flex justify-start items-center h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const auth = useAuthStore();
const { user } = storeToRefs(auth);
</script>

<style scoped></style>
