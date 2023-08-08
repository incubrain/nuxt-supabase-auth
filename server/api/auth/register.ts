export default defineEventHandler(async (event) => {
  console.log("register", event);
  const { supabaseClient } = event.context;
  console.log("register client", supabaseClient);
  const body = readBody(event);
  const { email, password } = body;
  const { data, error } = await supabaseClient.auth.registerWithPassword({
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
