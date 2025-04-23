"use client";
import { FunctionComponent, useState } from "react";
import { RegistrationPage } from "./index.component";
import { userSignUp } from "@/entities/user";
import { useRouter } from "next/navigation";

export const RegistrationPageContainer: FunctionComponent = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;
    const surname = formData.get("surname") as string;
    const name = formData.get("name") as string;
    userSignUp(login, password, name, surname)
      .then((res) => {
        if (res.Status !== 200) throw new Error("Ошибка при регистрации");
        router.push("/login");
      })
      .catch(() => {
        setError("Ошибка при регистрации");
      });
  };

  return (
    <RegistrationPage
      handleRegistration={handleRegistration}
      error={error}
    />
  );
};
