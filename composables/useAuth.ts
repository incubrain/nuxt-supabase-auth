import { SupabaseClient } from '@supabase/supabase-js'

export default function useAuth() {
  const router = useRouter()
  const user = useSupabaseUser()
  const env = useRuntimeConfig().public
  const client: SupabaseClient = useNuxtApp().$supabase

  const register = async ({ email, password }: { email: string; password: string }) => {
    console.log('register', email, password, `${env.BASE_URL}/auth/login`)
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${env.BASE_URL}/auth/login`,
      },
    })

    if (error) throw createError(`Error registering user: ${error}`)
    console.log('register', data)

    router.push('/auth/success')
  }

  const logout = async () => {
    const { error } = await client.auth.signOut()
    if (error) {
      throw createError({
        statusCode: 401,
        message: error.message,
      })
    }
  }

  const isLoggedIn = computed(() => user.value !== null)

  const login = async ({ email, password }: { email: string; password: string }) => {
    console.log('login', email, password)

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw createError(`Login Error: ${error}`)
    }

    if (!data) throw createError('Login Error: No data returned from supabase')

    router.push('/protected/create-users')
  }

  async function handleInvalidEmailLink(userEmail: string) {
    const { data, error } = await client.auth.resend({
      type: 'signup',
      email: userEmail,
    })

    if (error) {
      console.error('Error sending new verification email:', error)
    }

    console.log('New verification email sent!', data)
    // provide feedback to user
  }

  return {
    handleInvalidEmailLink,
    login,
    logout,
    register,
    isLoggedIn,
  }
}
