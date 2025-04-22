"use client";
import { FunctionComponent, useState } from "react";
import useInput from "@/shared/uikit/inputField/api";
import { RegistrationPage } from "./index.component";
import { userSignUp } from "@/entities/user";
import { useRouter } from "next/navigation";

export const RegistrationPageContainer: FunctionComponent = () => {
  const [login, setLogin] = useInput("");
  const [password, setPassword] = useInput("");
  const [surname, setSurname] = useInput("");
  const [name, setName] = useInput("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    userSignUp(login, password, name, surname)
      .then((res) => {
        if (res.Status !== 200) throw new Error("Ошибка при регистрации");
        router.push("/login");
      })
      .catch((err) => {
        setError("Ошибка при регистрации");
      });
  };

  return (
    <RegistrationPage
      name={name}
      surname={surname}
      login={login}
      password={password}
      setName={setName}
      setSurname={setSurname}
      setLogin={setLogin}
      setPassword={setPassword}
      handleRegistration={handleRegistration}
      error={error}
    />
  );
};
