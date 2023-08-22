// Define default options for cookies.
type SameSite = boolean | 'lax' | 'strict' | 'none' | undefined

export const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 8, // 8 hours in seconds
  sameSite: 'lax' as SameSite,
  secure: true,
}

// Define constant keys for the cookies we'll use.
export const COOKIE_KEYS = {
  accessToken: 'sb-access-token',
  refreshToken: 'sb-refresh-token',
  providerToken: 'sb-provider-token',
  providerRefreshToken: 'sb-provider-refresh-token',
}

// Define authentication-related event constants.
export const EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED',
  SIGNED_OUT: 'SIGNED_OUT',
}
