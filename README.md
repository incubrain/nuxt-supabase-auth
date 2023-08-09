# Nuxt 3 Supabase Auth

## TODO:

- [ ] **Use HttpOnly Cookies**: If possible, set the `HttpOnly` flag on cookies that store sensitive information. This makes the cookie inaccessible to JavaScript running on the page, which can help prevent cross-site scripting (XSS) attacks.

- [ ] **Set Secure Cookies**: When setting cookies, use the `Secure` flag to ensure that cookies are only sent over HTTPS connections.

- [ ] **Implement CSRF Protection**: Cross-Site Request Forgery (CSRF) attacks can occur when handling cookies. Implementing CSRF tokens and checking them server-side can mitigate this risk.

- [ ] **Set Proper CORS Policy**: Make sure you have a proper Cross-Origin Resource Sharing (CORS) policy in place to control which domains are allowed to access your resources.

- [ ] **Use a Trusted Library**: If you are dealing with JWT or other token formats, consider using a well-maintained and trusted library to handle token parsing, validation, and storage.

- [ ] **Avoid Storing Tokens in LocalStorage**: While it might be tempting to store tokens in `localStorage`, it's not recommended due to potential access from XSS attacks. Cookies with proper flags (HttpOnly, Secure) are generally safer.

- [ ] **Implement Token Expiry**: Make sure that tokens have a short expiration time and implement refresh tokens if necessary. This minimizes the potential damage of a token if it's compromised.
- [ ] **Token Validation**: Always validate tokens server-side before processing the request. Client-side validation can be bypassed by an attacker.

- [ ] **Handle Redirection Securely**: If you're redirecting users after login, ensure that the redirection URLs are validated and don't allow open redirection, which can be used in phishing attacks.

- [ ]  **Monitor and Log**: Implement monitoring and logging to detect suspicious activities early. This includes failed login attempts, unexpected location changes, etc.

- [ ]  **Provide Clear Logout Functionality**: Implement proper logout functionality that not only removes the client-side session but also invalidates the token server-side.


## Of Note:

- Currently, onAuthStateChange() does not work across tabs. For instance, in the case of a password reset flow, the original tab which requested for the password reset link will not receive the SIGNED_IN and PASSWORD_RECOVERY event when the user clicks on the link. This will also impact how we handle email verification clicks [reference](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)