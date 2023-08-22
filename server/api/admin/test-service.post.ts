import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  console.log('working service')
  const users = await readBody(event)
  console.log('working service', users)
  const supabaseService = serverSupabaseServiceRole(event)
  if (!supabaseService) {
    throw createError({ statusMessage: 'Supabase client not found' })
  }

  const { data, error } = await supabaseService.from('users').insert(users)

  if (error) {
    console.log('error', error)
    throw createError({ statusMessage: error.message })
  }

  console.log('supabase data', data)

  return data
})
