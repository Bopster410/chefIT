"use client";
import { FunctionComponent, useState } from "react";
import { LoginPage } from "./index.component";
import { getUser, userLogin } from "@/entities/user";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/providers/userProvider";
import { validateUserField } from "@/entities/user/api";

export const LoginPageContainer: FunctionComponent = () => {
  const setUser = useLogin();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleError = () => {
    setError("Произошла ошибка при авторизации. Пожалуйста, перезагрузите страницу и попробуйте еще раз.")
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    let error = validateUserField(login, "login");
    if (error) {
      setError(error);
      return;
    }

    error = validateUserField(password, "password");
    if (error) {
      setError(error);
      return;
    }

    userLogin(login, password).then((res) => {
      if (res.Status !== 200) {
        setError("Неправильный логин или пароль");
        return;
      }
      getUser().then((data) => {
        setUser(data.Data);
        router.push("./");
      });
    });
  };

  return <LoginPage handleError={handleError} error={error} handleLogin={handleLogin} />;
};
