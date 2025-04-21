import { create } from "zustand";
import { UserStates } from "./index.types";

const useUserStore = create<UserStates>()((set) => ({
  user: undefined,
  loginRequired: false,

  login: (user) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: undefined })),
  changeRequired: () =>
    set((state) => ({ loginRequired: !state.loginRequired })),
}));

export const useLoginRequired = () =>
  useUserStore((state) => state.loginRequired);
export const useChangeRequired = () =>
  useUserStore((state) => state.changeRequired);
export const useUser = () => useUserStore((state) => state.user);
export const useLogin = () => useUserStore((state) => state.login);
export const useLogout = () => useUserStore((state) => state.logout);
