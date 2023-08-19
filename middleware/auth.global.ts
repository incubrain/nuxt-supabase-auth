const excludedRoutes = ['/auth/*', '/']
const login = '/auth/login'

const isExcluded = (to: string): boolean => {
  return excludedRoutes?.some((path): boolean => {
    const regex = createRegExp(
      exactly('^')
        .and(oneOrMore(anyOf(path.replace(/\*/g, '.*'))))
        .and('$')
    )

    return regex.test(to)
  })
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const admin = useTestingStore()
  const { settings } = storeToRefs(admin)

  if (!settings.value.authOn) {
    console.log('auth is off')
    return
  }

  if (isExcluded(to.path)) return
  console.log('protected route')

  const user = useSupabaseUser()
  if (!user.value) {
    console.log('no user')
    return navigateTo(login)
  }
  console.log('have user:', user)
})
