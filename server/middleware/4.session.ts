export default defineEventHandler(async (event) => {
  const { _supabaseClient } = event.context;
  console.log("SESSION: ", event.context);
  if (event.context.session) return;
  const { data, error } = await _supabaseClient.auth.getSession();
  console.log("SESSION: ", data, error);

  if (error) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }

  event.context.session = data.session;
  event.context.user = data.user;
});
