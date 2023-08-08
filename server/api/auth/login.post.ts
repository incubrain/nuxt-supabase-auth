export default defineEventHandler(async (event) => {
  const { _supabaseClient } = event.context;
  // console.log("login client", _supabaseClient);
  const body = await readBody(event);
  let { email, password } = body;
  const env = useRuntimeConfig();
  if (env.public.NODE_ENV === "development") {
    email = String(env.TESTING_USERNAME);
    password = String(env.TESTING_PASSWORD);
  }
  console.log("login client", email, password);
  const { data, error } = await _supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }

  console.log("login client", data);
  return {
    status: 200,
    user: data.user,
    session: data.session,
  };
});
