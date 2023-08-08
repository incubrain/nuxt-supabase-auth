import { H3Event } from "h3";

export const setAuth = (event: H3Event, isAuth: boolean) => {
  console.log("isAuth", event, isAuth);
  event.context.auth = isAuth;
};
