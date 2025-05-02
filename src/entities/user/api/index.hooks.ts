import { useLogin, useUser } from "@/app/providers/userProvider";
import { useEffect } from "react";
import { getUser } from ".";
import {
  useChangeRequired,
  useLoginRequired,
} from "@/app/providers/userProvider/index.store";
import { useRouter } from "next/navigation";

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

export const useUserOrToLogin = () => {
    const user = useUserWithFetch();
    const router = useRouter();
  
    useEffect(() => {
      if (!user) {
        router.replace("/login");
        return;
      }
    }, [user, router]);

    return user;
}