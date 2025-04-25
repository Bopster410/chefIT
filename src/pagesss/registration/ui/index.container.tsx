"use client";
import { FunctionComponent, useState } from "react";
import { RegistrationPage } from "./index.component";
import { getUser, userSignUp } from "@/entities/user";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/providers/userProvider";
import { validateUserField } from "@/entities/user/api";

export const RegistrationPageContainer: FunctionComponent = () => {
  const [error, setError] = useState("");
  const setUser = useLogin();
  const router = useRouter();

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;
    const surname = formData.get("surname") as string;
    const name = formData.get("name") as string;
    const passwordApproval = formData.get("password-approval") as string;

    let error = validateUserField(name, "name");
    if (error) {
      setError(error);
      return;
    }

    error = validateUserField(surname, "surname");
    if (error) {
      setError(error);
      return;
    }

    error = validateUserField(login, "login");
    if (error) {
      setError(error);
      return;
    }

    error = validateUserField(password, "password");
    if (error) {
      setError(error);
      return;
    }

    if (password !== passwordApproval) {
      setError("Пароли не совпадают!");
      return;
    }

    userSignUp(login, password, name, surname)
      .then((res) => {
        if (res.Status !== 200) throw new Error("Ошибка при регистрации");
        getUser().then((data) => {
          setUser(data.Data);
          router.push("./");
        });
      })
      .catch(() => {
        setError("Ошибка при регистрации");
      });
  };

  return (
    <RegistrationPage handleRegistration={handleRegistration} error={error} />
  );
};
