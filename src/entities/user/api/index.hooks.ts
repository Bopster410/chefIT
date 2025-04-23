import { useLogin, useUser } from "@/app/providers/userProvider";
import { useEffect } from "react";
import { getUser } from ".";
import {
  useChangeRequired,
  useLoginRequired,
} from "@/app/providers/userProvider/index.store";

export const useUserWithFetch = () => {
  const user = useUser();
  const login = useLogin();
  const required = useLoginRequired();
  const changeRequired = useChangeRequired();

  useEffect(() => {
    if (required) return;
    if (!user) {
      getUser()
        .then((res) => {
          if (res.Status == 200) {
            login(res.Data);
            changeRequired(false);
          }
          else changeRequired(true);
        })
        .catch((err) => {
          console.error("Ошибка при получении профиля:", err);
        });
        changeRequired(true);
    }
  }, [user, required, changeRequired, login]);

  return user;
};
