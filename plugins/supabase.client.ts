import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js'

let supabase: SupabaseClient

// Define default options for cookies.
type SameSite = boolean | 'lax' | 'strict' | 'none' | undefined
const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 8, // 8 hours in seconds
  sameSite: 'lax' as SameSite,
  secure: true,
}

// Define constant keys for the cookies we'll use.
const COOKIE_KEYS = {
  accessToken: 'sb-access-token',
  refreshToken: 'sb-refresh-token',
  providerToken: 'sb-provider-token',
  providerRefreshToken: 'sb-provider-refresh-token',
}

// Define authentication-related event constants.
const EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED',
  SIGNED_OUT: 'SIGNED_OUT',
}

const setCookieValue = (key: string, value: string | null) => {
  useCookie(key, COOKIE_OPTIONS).value = value
}

const setCookiesNull = () => {
  Object.values(COOKIE_KEYS).forEach((key) => setCookieValue(key, null))
}

export default defineNuxtPlugin({
  name: 'supabase',
  enforce: 'pre', // Enforce the plugin to run before other plugins.
  async setup() {
    const env = useRuntimeConfig().public

    if (!supabase) {
      // Initialize Supabase client if it's not already done.
      supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
        db: { schema: 'public' },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          flowType: 'pkce',
          debug: true,
        },
      })
    }

    const user = useSupabaseUser()

    supabase.auth.onAuthStateChange(async (event, session) => {
      // Update the user value if the session's user differs from the current one.
      if (!session) {
        user.value = null
      } else if (JSON.stringify(user.value) !== JSON.stringify(session.user)) {
        user.value = session.user
      }

      if (event === EVENTS.SIGNED_OUT) {
        // If the user signed out, clear cookies.
        return setCookiesNull()
      }

      // Only proceed if the event is 'SIGNED_IN' or 'TOKEN_REFRESHED', and a session exists.
      if (![EVENTS.SIGNED_IN, EVENTS.TOKEN_REFRESHED].includes(event) || !session) return
      setCookieValue(COOKIE_KEYS.accessToken, session.access_token)
      setCookieValue(COOKIE_KEYS.refreshToken, session.refresh_token)

      // Update provider tokens if they exist.
      if (!session.provider_token && !session.provider_refresh_token) return
      setCookieValue(COOKIE_KEYS.providerToken, session.provider_token!)
      setCookieValue(COOKIE_KEYS.providerRefreshToken, session.provider_refresh_token!)
    })

    return { provide: { supabase } }
  },
})
