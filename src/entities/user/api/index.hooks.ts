import { useLogin, useUser } from "@/app/providers/userProvider";
import { useEffect, useState } from "react";
import { getUser } from ".";
import {
    useChangeRequired,
    useLoginRequired,
} from '@/app/providers/userProvider/index.store';
import { useRouter } from 'next/navigation';
import { STATUS } from '@/shared/api';

export const useUserWithFetch = () => {
  const user = useUser();
  const login = useLogin();
  const required = useLoginRequired();
  const changeRequired = useChangeRequired();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (required || user) {
      setIsFetching(false);
      return;
    }

    getUser()
      .then(({ Status, Data }) => {
        if (Status === STATUS.SUCCESS && Data) {
          login(Data);
          changeRequired(false);
        } else {
          changeRequired(true);
        }
      })
      .catch((err) => {
        console.error("Ошибка при получении профиля:", err);
        changeRequired(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [user, required, changeRequired, login]);

  return { user, isFetching };
};

export const useUserOrToLogin = () => {
  const { user, isFetching } = useUserWithFetch();
  const router = useRouter();

  useEffect(() => {
    if (isFetching) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, isFetching, router]);

  return user;
};
