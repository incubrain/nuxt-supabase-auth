import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  console.log("supa middleware", event.path, event.path.includes("protected"));

  if (event.path.includes("protected")) {
    console.log("supa middleware protected");
    const user = await serverSupabaseUser(event);

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  } else {
    console.log("supa middleware not protected");
  }
});
