import { ajaxGet, ajaxPost } from "@/shared/api";
import { User } from "./index.types";
import { USER_API } from "./index.constants";

export type { User } from "./index.types";

export async function getUser() {
  return await ajaxGet<User>({
    url: USER_API.getUser,
  });
}
export async function userLogin(login: string, password: string) {
  return await ajaxPost({
    url: USER_API.login,
    body: { login: login, password: password },
  });
}
export async function userLogout() {
  return await ajaxPost({
    url: USER_API.logout,
  });
}
export async function userSignUp(
  login: string,
  password: string,
  name: string,
  surname: string
) {
  return await ajaxPost({
    url: USER_API.signUp,
    body: { login: login, password: password, name: name, surname: surname },
  });
}

export { useUserWithFetch } from "./index.hooks";
