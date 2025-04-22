"use client";
import { FunctionComponent } from "react";
import useInput from "@/shared/uikit/inputField/api";
import { LoginPage } from "./index.component";
import { getUser, userLogin } from "@/entities/user";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/providers/userProvider";

export const LoginPageContainer: FunctionComponent = () => {
  const [login, setLogin] = useInput("");
  const [password, setPassword] = useInput("");
  const setUser = useLogin();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    userLogin(login, password).then((res)=>{
      if(res.Status !== 200) return;
      getUser().then((data)=>{
        setUser(data.Data);
        router.push("./");
      })
    })
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
