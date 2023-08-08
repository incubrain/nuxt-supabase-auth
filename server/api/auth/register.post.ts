export default defineEventHandler(async (event) => {
  const { _supabaseClient } = event.context;
  console.log("register");
  const body = await readBody(event);
  const { email, password } = body;
  console.log("register", email, password, body);
  const { data, error } = await _supabaseClient.auth.signUp({
    email,
    password,
  });
  console.log("register", data, error);
  if (error) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }

  return {
    status: 200,
    user: data.user,
  };
});
