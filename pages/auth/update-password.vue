<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <h2 class="mb-6 text-2xl text-center"> Reset Password </h2>
    <FormDynamic
      :schema="schema"
      :validation-schema="UpdatePasswordForm"
      has-labels
      button-label="Reset Password"
      class="w-full"
      @submit-form="auth.updatePassword"
    />
  </div>
</template>

<script setup lang="ts">
import { UpdatePasswordForm, FormField } from '@/types/forms'

const auth = useAuth()
const router = useRouter()

const schema = computed(() => {
  return [
    {
      name: 'password',
      props: {
        label: 'Password',
        type: 'password'
      }
    },
    {
      name: 'confirmPassword',
      props: {
        label: 'Confirm Password',
        type: 'password'
      }
    }
  ] as FormField[]
})

definePageMeta({
  name: "ResetPassword",
});
</script>
