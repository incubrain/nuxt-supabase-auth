<template>
  <div class="py-32">
    <h1 class="text-xl font-semibold">Please Confirm Your Email:</h1>
    <div>
      <p>
        We’ve sent a message to
        <strong>{{ user?.email }}</strong>
        with a link to activate your account.
      </p>
      <div class="space-x-2 py-4 w-auto">
        <UBadge>
          <a target="_blank" href="https://mail.google.com/mail/u/0/" rel="noopener noreferrer">Open Gmail</a>
        </UBadge>
        <UBadge>
          <a target="_blank" href="https://outlook.live.com/mail/0/inbox" rel="noopener noreferrer">Open Outlook</a>
        </UBadge>
      </div>
      <div></div>
      <label>Didn’t get an email? Check your spam folder!</label>
      <div>
        <p>Still nothing? Try to register again</p>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const user = useSupabaseUser()

definePageMeta({
  name: 'Success',
})
</script>

<style scoped></style>
