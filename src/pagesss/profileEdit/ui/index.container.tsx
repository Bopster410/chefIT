"use client";
import { useUserWithFetch } from "@/entities/user";
import { ProfileEditPage } from "./index.component";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  userEditLogin,
  userEditName,
  userEditPassword,
  userEditSurname,
  validateUserField,
} from "@/entities/user/api";
import { EditError } from "./index.types";
import { useLogin, useLogout } from "@/app/providers/userProvider";

export function ProfileEditPageContainer() {
  const user = useUserWithFetch();
  const changeUser = useLogin();
  const logout = useLogout();
  const router = useRouter();
  const [errors, setErrors] = useState<EditError[] | undefined>(undefined);

  const addError = (newError: EditError) => {
    setErrors((prev) => [...(prev ?? []), newError]);
  };

  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
  
    const formData = new FormData(e.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;
    const oldPassword = formData.get("old-password") as string;
    const passwordApproval = formData.get("password-approval") as string;
    const surname = formData.get("surname") as string;
    const name = formData.get("name") as string;
  
    const newErrors: EditError[] = [];
  
    let error = validateUserField(name, "name");
    if (error) newErrors.push({ type: "name", msg: error });
  
    error = validateUserField(surname, "surname");
    if (error) newErrors.push({ type: "surname", msg: error });
  
    error = validateUserField(login, "login");
    if (error) newErrors.push({ type: "login", msg: error });
  
    error = validateUserField(oldPassword, "password");
    if (error) newErrors.push({ type: "oldPassword", msg: error });
  
    error = validateUserField(password, "password");
    if (error) newErrors.push({ type: "password", msg: error });
  
    if (password !== passwordApproval) {
      newErrors.push({ type: "passwordApproval", msg: "Пароли не совпадают" });
    }
  
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors([]);
    }

    const updatedFields: Partial<typeof user> = {};
    const requests: Promise<void>[] = [];

    if (user.login !== login) {
      requests.push(
        userEditLogin(login)
          .then((res) => {
            if (res.Status !== 200)
              throw new Error("Ошибка при изменении логина");
            updatedFields.login = login;
          })
          .catch((err) => {
            addError({ type: "login", msg: err });
          })
      );
    }

    if (user.name !== name) {
      requests.push(
        userEditName(name)
          .then((res) => {
            if (res.Status !== 200)
              throw new Error("Ошибка при изменении имени");
            updatedFields.name = name;
          })
          .catch((err) => {
            addError({ type: "name", msg: err });
          })
      );
    }

    if (user.surname !== surname) {
      requests.push(
        userEditSurname(surname)
          .then((res) => {
            if (res.Status !== 200)
              throw new Error("Ошибка при изменении фамилии");
            updatedFields.surname = surname;
          })
          .catch((err) => {
            addError({ type: "surname", msg: err });
          })
      );
    }

    if (password !== "" && oldPassword !== "") {
      requests.push(
        userEditPassword(oldPassword, password)
          .then((res) => {
            if (res.Status !== 200)
              throw new Error("Ошибка при изменении пароля");
            logout();
            router.push("/login");
          })
          .catch((err) => {
            addError({ type: "password", msg: err });
          })
      );
    }

    await Promise.allSettled(requests);

    if (Object.keys(updatedFields).length > 0) {
      changeUser({ ...user, ...updatedFields });
    }
  };

  useEffect(() => {
    if (!user) {
      router.back();
      return;
    }
  }, [user, router]);

  if (!user) return;

  return (
    <ProfileEditPage errors={errors} handleChange={handleChange} user={user} />
  );
}
