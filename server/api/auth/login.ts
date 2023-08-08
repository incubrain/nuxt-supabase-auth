export default defineEventHandler(async (event) => {
  console.log("login", event);
  const { supabaseClient } = event.context;
  console.log("login client", supabaseClient);
  const body = readBody(event);
  const { email, password } = body;
  const { data, error } = await supabaseClient.auth.signIn({
    email,
    password,
  });
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
