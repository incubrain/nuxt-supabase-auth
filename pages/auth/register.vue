<template>
  <div>
    <form @submit.prevent="handleRegister">
      <input
        v-model="email"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <input
        v-model="password"
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

const handleRegister = async () => {
  console.log("register");
  const user = {
    email: email.value,
    password: password.value,
  };
  const data = await useFetch("/api/auth/register", {
    method: "POST",
    headers: useRequestHeaders(["cookie"]),
    body: JSON.stringify(user),
  });
  console.log(data);
};
</script>

<style scoped></style>
