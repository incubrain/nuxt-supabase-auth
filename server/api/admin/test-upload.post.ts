// import { decode } from 'base64-arraybuffer'

export default defineEventHandler(async (event) => {
  console.log('workingUpload')
  const form = await readMultipartFormData(event)
  console.log('workingUpload', form)
  if (!form?.length) return console.log('no form data')
  const supabaseService = serverSupabaseServiceRole(event)
  if (!supabaseService) {
    throw createError({ statusMessage: 'Supabase client not found' })
  }

  const { data, error } = await supabaseService.storage.from('test-bucket').upload('test1.jpg', form[0].data, {
    cacheControl: '3600',
    upsert: true,
  })

  if (error) {
    console.log('error', error)
    throw createError({ statusMessage: error.message })
  }

  console.log('supabase uploade data', data)

  return data
})
