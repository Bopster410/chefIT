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
  surname: string,
) {
  return await ajaxPost<string>({
    url: USER_API.signUp,
    body: { login: login, password: password, name: name, surname: surname },
  });
}
export async function userEditLogin(newLogin: string) {
  return await ajaxPost({
    url: USER_API.editLogin,
    body: { newLogin: newLogin },
  });
}
export async function userEditName(newName: string) {
  return await ajaxPost({
    url: USER_API.editName,
    body: { newName: newName },
  });
}
export async function userEditSurname(newSurname: string) {
  return await ajaxPost({
    url: USER_API.editSurname,
    body: { newSurname: newSurname },
  });
}
export async function userEditPassword(
  oldPassword: string,
  newPassword: string,
) {
  return await ajaxPost({
    url: USER_API.editPassword,
    body: { newPassword: newPassword, password: oldPassword },
  });
}

export async function userLoginVK(
  code: string,
  deviceId: string,
  state: string,
) {
  return await ajaxPost({
    url: USER_API.loginVK,
    body: {
      code: code,
      deviceId: deviceId,
      state: state,
    },
  });
}

export function validateUserField(
  input: string,
  type: "name" | "surname" | "password" | "login",
): string | null {
  const trimmedInput = input.trim();
  if (trimmedInput == "") return null;

  if (type === "name" || type === "surname") {
    if (trimmedInput.length < 2) {
      return "Имя и фамилия должны содержать хотя бы две буквы";
    }
  }

  if (type === "login") {
    if (trimmedInput.length < 2) {
      return "Логин должен содержать хотя бы две буквы";
    }
  }

  if (type === "name" || type === "surname") {
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    if (!nameRegex.test(trimmedInput)) {
      return "Имя и фамилия могут содержать только буквы (русские или латинские)";
    }
  }

  if (type === "login") {
    const loginRegex = /^[A-Za-z0-9_-]+$/;
    if (!loginRegex.test(trimmedInput)) {
      return "Логин может содержать латинские буквы, цифры, а также символы _ и -";
    }
  }

  if (type === "password") {
    const specialChars = /[!@#$&*]/g;
    const specialMatches = trimmedInput.match(specialChars) || [];

    if (
      !/[A-Za-zА-Яа-яЁё]/.test(trimmedInput) ||
      !/\d/.test(trimmedInput) ||
      specialMatches.length < 2
    ) {
      return "Пароль должен содержать хотя бы одну букву и одну цифру, а также не менее двух спецсимволов (!@#$&*)";
    }
  }

  return null;
}

export { useUserWithFetch, useUserOrToLogin } from "./index.hooks";
