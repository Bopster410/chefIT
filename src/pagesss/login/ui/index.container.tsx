"use client";
import { FunctionComponent, useState } from "react";
import useInput from "@/shared/uikit/inputField/api";
import { LoginPage } from "./index.component";

export const LoginPageContainer: FunctionComponent = () => {
  const [login, setLogin] = useInput("");
  const [password, setPassword] = useInput("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", login, "Password:", password);
  };

  return (
    <LoginPage
      login={login}
      password={password}
      setLogin={setLogin}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};
