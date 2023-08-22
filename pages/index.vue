<template>
  <div>
    <h1>Hello world</h1>
    <NuxtLink to="/protected">Test Protected</NuxtLink>
    <UButton @click="test" > Test </UButton>
    {{ testData }}
  </div>
</template>

<script setup lang="ts">
const testData = ref({})

const test = async () => {
  const { data, error } = await useFetch('/api/test')
  if (error.value) {
    console.error(error.value)
  }
  console.log(data)
  testData.value = data
}
</script>

<style scoped></style>
