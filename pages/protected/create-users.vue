<template>
  <div class="py-32">
    <button class="p-2 rounded-md bg-emerald-500 text-white" @click="auth.createUsers">Create Users</button>
    <h1>This route is protected</h1>
    <p>{{ createdUsers }}</p>
  </div>
</template>

<script setup lang="ts">

const auth = useAuthStore();
const { createdUsers } = storeToRefs(auth);

</script>

<style scoped></style>
