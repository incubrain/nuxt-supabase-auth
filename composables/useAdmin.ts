import { SupabaseClient } from '@supabase/supabase-js'
import { emailUnvalidatedUserSchema } from '@/types/auth'

interface User {
  email: string
  password: string
}

export default function useAdmin() {
  const client: SupabaseClient = useNuxtApp().$supabase
  const createdUsers = ref([] as User[])

  const register = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await client.auth.signUp({
      email,
      password,
    })
    if (error) {
      throw createError({
        statusCode: 401,
        message: error.message,
      })
    }

    const validatedUser = emailUnvalidatedUserSchema.safeParse(data.user)

    if (!validatedUser.success) {
      throw createError(validatedUser.error)
    }
  }

  async function createPublicUsers() {
    const users = [
      {
        body: 'created through service role',
      },
      {
        body: 'created through service role 2',
      },
    ]
    try {
      const { data, error } = await useFetch('/api/admin/test-service', {
        method: 'POST',
        body: JSON.stringify(users),
      })
      if (error.value) {
        console.log('throwing', error)
        throw createError(`error updating users: ${error.value}`)
      }
      console.log('updated users', data.value)
    } catch (error) {
      console.error(`createPublicUsers error: ${error}`)
    }
  }

  async function uploadFile(file: File | null) {
    if (!file) return console.log('no file selected')
    try {
      // Use FormData to send the file
      const formData = new FormData()
      formData.append('file', file)
      const { data, error } = await useFetch('/api/admin/test-upload', {
        method: 'POST',
        body: formData,
      })
      if (error.value) {
        throw createError(`error updating users: ${error.value}`)
      }
      console.log('updated users', data)
    } catch (error) {
      console.error(`error updating users: ${error}`)
    }
  }

  return {
    createPublicUsers,
    uploadFile,
    createdUsers,
  }
}
