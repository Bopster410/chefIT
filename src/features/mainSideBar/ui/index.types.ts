import { User } from "@/entities/user";

export interface ContainerProps {
  sideBarOpened: boolean;
  OnCloseSideBar: () => void;
}

export interface Props extends ContainerProps {
    user?: User;
    userLogout: () => void;
}
