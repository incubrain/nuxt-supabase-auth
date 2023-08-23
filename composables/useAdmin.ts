import { SupabaseClient } from '@supabase/supabase-js'
import { emailUnvalidatedUserSchema } from '@/types/auth'
// import users from '@/private-data/users.json'

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

  async function registerManyUsers() {
    const users = []
    for (const user of users) {
      // Extract the given name and surname
      const givenName = user.given_name.charAt(0).toUpperCase() + user.given_name.slice(1)
      const surname = user.surname.charAt(0).toUpperCase() + user.surname.slice(1)

      // Construct the password
      const password = `${givenName}${surname}12345$`

      // Register the user
      try {
        await register({ email: user.email, password })
        createdUsers.value.push({ email: user.email, password })
      } catch (error) {
        console.error(`Failed to register user with email ${user.email}:`, error)
      }
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
    registerManyUsers,
    createPublicUsers,
    uploadFile,
    createdUsers,
  }
}
