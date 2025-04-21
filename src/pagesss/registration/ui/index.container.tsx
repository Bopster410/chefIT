"use client";
import { FunctionComponent, useState } from "react";
import useInput from "@/shared/uikit/inputField/api";
import { RegistrationPage } from "./index.component";

export const RegistrationPageContainer: FunctionComponent = () => {
  const [login, setLogin] = useInput("");
  const [password, setPassword] = useInput("");
  const [surname, setSurname] = useInput("");
  const [name, setName] = useInput("");

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", login, "Password:", password);
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
    />
  );
};
