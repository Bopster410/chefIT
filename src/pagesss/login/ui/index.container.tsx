"use client";
import { FunctionComponent, useState } from "react";
import { LoginPage } from "./index.component";
import { getUser, userLogin } from "@/entities/user";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/providers/userProvider";

export const LoginPageContainer: FunctionComponent = () => {
  const setUser = useLogin();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleError = () => {
    setError(
      "Произошла ошибка при авторизации. Пожалуйста, перезагрузите страницу и попробуйте еще раз.",
    );
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    userLogin(login, password).then((res) => {
      if (res.Status !== 200) {
        setError("Неправильный логин или пароль");
        return;
      }
      getUser().then(({ Data }) => {
        if (!Data) return;

        setUser(Data);
        router.push("./");
      });
    });
  };

  return (
    <LoginPage
      handleError={handleError}
      error={error}
      handleLogin={handleLogin}
    />
  );
};
