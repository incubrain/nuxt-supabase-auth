import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  console.log("supa middleware", event.path, event.path.includes("protected"));
  const client = serverSupabaseClient(event);
  if (!client) {
    throw createError({
      statusCode: 401,
      message: "Error creating supabase client",
    });
  }

  event.context.supabaseClient = client;
});
