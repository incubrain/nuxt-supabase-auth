export default defineEventHandler(async (event) => {
  const users = await readBody(event)
  console.log('working service', users)
  const supabaseService = serverSupabaseServiceRole(event)

  const { data, error } = await supabaseService.from('users').insert(users)

  if (error) {
    console.log('error', error)
    throw createError({ statusMessage: error.message })
  }

  console.log('supabase data', data)

  return data
})
