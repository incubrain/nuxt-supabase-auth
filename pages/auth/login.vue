<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" name="email" id="email" />
      <input v-model="password" type="password" name="password" id="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  console.log("login");
  const credentials = { email: email.value, password: password.value };
  const data = await useFetch("/api/auth/login", {
    method: "POST",
    headers: useRequestHeaders(["cookie"]),
    body: JSON.stringify(credentials),
  });
  console.log(data);
};
</script>

<style scoped></style>
