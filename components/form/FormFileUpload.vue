<template>
  <div>
    <label>
      Select a file:
      <input type="file" @change="handleFileChange" />
      <UButton @click="admin.uploadFile(selectedFile)">Upload</UButton>
    </label>
    <p v-if="selectedFile">Selected: {{ selectedFile.name }}</p>
  </div>
</template>

<script setup lang="ts">
const selectedFile = ref<File | null>(null)
const admin = useAdmin()

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    selectedFile.value = input.files[0]
  }
}
</script>
