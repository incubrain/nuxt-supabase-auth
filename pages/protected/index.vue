<template>
  <div class="py-32">
    <button class="p-2 rounded-md bg-emerald-500 text-white" @click="admin.createPublicUsers">Create Users</button>
    <FormFileUpload />
    <h1>This route is protected</h1>
  </div>
</template>

<script setup lang="ts">
const admin = useAdmin()
</script>

<style scoped></style>
