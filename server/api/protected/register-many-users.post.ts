import { simpleUserSchema, SimpleUserType } from "@/types/auth";

export default defineEventHandler(async (event) => {
  const { _supabaseClient, session, user } = event.context;
  const users = await import("@/data/users.json")!;
  // const isAuthenticated = await isAuth(event);
  console.log("register many isAuthenticated", event.context);
  console.log("register many", users.default);

  // Initialize an array to collect results
  const newUsers: SimpleUserType[] = [];

  // Iterate through the users
  for (const user of users.default) {
    const { email, given_name, surname } = user;
    const password = `${given_name}_${surname}12345#`;

    console.log("registering", email, password);

    try {
      const { data, error } = await _supabaseClient.auth.signUp({
        email,
        password,
      });

      console.log("register client", data, error);
      if (error) {
        throw createError({
          statusCode: 401,
          message: error.message,
        });
      }

      const validatedUser = simpleUserSchema.safeParse(data.user);
      if (!validatedUser.success) {
        throw createError(validatedUser.error);
      }

      newUsers.push(validatedUser.data);
    } catch (error: any) {
      throw createError(`Error registering user: ${error}`);
    }
  }

  return {
    status: 200,
    users: newUsers,
  };
});
