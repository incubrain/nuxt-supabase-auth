<template>
  <div>
    <h2 class="mb-6 text-2xl text-center">Register</h2>
    <FormDynamic
      :schema="schema"
      :validation-schema="RegisterForm"
      has-labels
      button-label="Register"
      class="w-full"
      @submit-form="auth.register"
    />
    <p class="mt-4 text-sm text-center">
      <NuxtLink to="/auth/login"> Already have an account? Sign In </NuxtLink>
    </p>
    <!-- <UButton
      class="flex items-center justify-center w-full gap-4 mt-6"
      color="white"
      @click="handleGoogleSignUp"
    >
      <NuxtImg
        src="/icons/google.svg"
        alt="Google Logo"
        width="28px"
      />
      Sign Up with Google
    </UButton> -->
  </div>
</template>

<script setup lang="ts">
import { RegisterForm, FormField } from '@/types/forms'

const auth = useAuth()

const schema = computed(() => {
  return [
    {
      name: 'email',
      props: {
        label: 'Email',
        type: 'email',
      },
    },
    {
      name: 'password',
      props: {
        label: 'Password',
        type: 'password',
      },
    },
    {
      name: 'confirmPassword',
      props: {
        label: 'Confirm Password',
        type: 'password',
      },
    },
  ] as FormField[]
})

definePageMeta({
  name: 'Register',
})
</script>
