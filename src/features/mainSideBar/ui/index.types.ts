import { User } from "@/entities/user";

export interface Props {
    sideBarOpened: boolean;
    onCloseSideBar: () => void;
    user?: User;
    logout: () => void;
}
