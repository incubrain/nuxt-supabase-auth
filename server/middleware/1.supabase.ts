import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  console.log("supa middleware", event.path);
  if (event.context._supabaseClient) return;
  await serverSupabaseClient(event);
  console.log("supa middleware client");
  if (!event.context._supabaseClient) {
    throw createError({
      statusCode: 401,
      message: "Error creating supabase client",
    });
  }
});
