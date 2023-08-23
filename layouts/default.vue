<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <NavTop />
    <div class="flex-grow flex relative p-4 lg:p-8">
      <UCard class="h-full flex justify-center items-center relative min-w-[480px] max-w-[540px] z-10">
        <slot />
      </UCard>
      <div class="absolute left-0 top-0 w-full h-full m-0">
        <NuxtImg src="/auth.jpg" alt="Authentication Image" fit="fill" class="w-full h-full" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts"></script>

<style scoped></style>
