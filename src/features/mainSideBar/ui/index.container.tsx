import { userLogout, useUserWithFetch } from "@/entities/user";
import { MainSideBar } from "./index.component";
import { ContainerProps } from "./index.types";
import { useLogout } from "@/app/providers/userProvider";

export function MainSideBarContainer(props: ContainerProps) {
  const user = useUserWithFetch();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    userLogout();
  }

  return <MainSideBar user={user} userLogout={handleLogout} {...props} />;
}
