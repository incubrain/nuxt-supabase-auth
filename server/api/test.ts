import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  console.log('working')
  const supabase = await serverSupabaseClient(event)
  if (!supabase) {
    throw createError({ statusMessage: 'Supabase client not found' })
  }

  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
