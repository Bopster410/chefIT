import { User } from "@/entities/user";

export interface UserStates {
  user?: User;
  loginRequired?: boolean;

  login: (user: User) => void;
  logout: () => void;
  changeRequired: () => void;
}
