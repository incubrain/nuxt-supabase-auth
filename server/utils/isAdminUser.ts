import type { H3Event } from 'h3'

export default async function isAdminUser(event: H3Event): Promise<boolean> {
  const user = await serverSupabaseUser(event)
  if (!user) return false
  console.log('user', user.id, user.id !== '4640b591-9c7b-45d1-a64d-e133442f48bd')
  if (user.id !== '4640b591-9c7b-45d1-a64d-e133442f48bd') return false
  return true
}
