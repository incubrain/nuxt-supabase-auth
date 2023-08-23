export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  console.log('workingUpload', form)
  if (!form?.length) return console.log('no form data')
  const supabaseService = serverSupabaseServiceRole(event)

  const { error } = await supabaseService.storage.from('test-bucket').upload(form[0].filename!, form[0].data, {
    cacheControl: '3600',
    upsert: true,
  })

  if (error) {
    console.log('error', error)
    throw createError({ statusMessage: error.message })
  }


  return {
    statusCode: 200,
    message: 'successfully uploaded file',
  }
})
