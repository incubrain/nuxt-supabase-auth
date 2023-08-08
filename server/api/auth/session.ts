export default defineEventHandler(async (event) => {
  const { _supabaseClient } = event.context;
  console.log("get session server", _supabaseClient);
  const { data, error } = await _supabaseClient.auth.getSession();

  console.log("get session server", data, error);
  if (error) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }

  event.context.session = data.session;

  return {
    status: 200,
    user: data.user,
    session: data.session,
  };
});
