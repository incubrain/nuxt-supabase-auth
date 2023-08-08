export default defineStore("auth", () => {
  const user = ref({});
  const session = ref(null);
  const createdUsers = ref([]);

  const createUsers = async () => {
    console.log("register");

    const { data } = await useFetch("/api/protected/register-many-users", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: JSON.stringify({}),
    });
    console.log(data);
    createdUsers.value = data.value.users;
  };

  const register = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("register");

    const data = await useFetch("/api/auth/register", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: JSON.stringify({ email, password }),
    });
    console.log(data);
    user.value = data;
  };

  const login = async ({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) => {
    console.log("login", email, password);
    const { data } = await useFetch("/api/auth/login", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: JSON.stringify({ email, password }),
    });
    console.log(data);
    user.value = data.value?.user;
    session.value = data.value?.session;
  };

  const logout = async () => {
    const data = await useFetch("/api/auth/logout");
    console.log("user logged out client", data);
    user.value = data;
  };

  const getSession = async () => {
    console.log("getSession", session.value);
    if (session.value) return session.value;
    console.log("getSessionProgress");
    const { data } = await useFetch("/api/auth/session", {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    });
    session.value = data.value?.session;
    user.value = data.value?.user;
  };

  return {
    user,
    login,
    logout,
    register,
    getSession,
    createUsers,
    createdUsers,
  };
});
