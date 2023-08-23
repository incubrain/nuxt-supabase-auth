import type { H3Event } from 'h3'

const adminEmails = ['drewmacgibbon@gmail.com']

export default async function isAdminUser(event: H3Event): Promise<boolean> {
  const user = await serverSupabaseUser(event)
  if (!user) return false
  console.log('user', user.email, !adminEmails.includes(user.email!))
  if (!adminEmails.includes(user.email!)) return false
  return true
}
