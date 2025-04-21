import { useUserWithFetch } from "@/entities/user";
import { MainSideBar } from "./index.component";
import { ContainerProps } from "./index.types";
import { useLogout } from "@/app/providers/userProvider";

export function MainSideBarContainer(props: ContainerProps) {
  const user = useUserWithFetch();
  const logout = useLogout();

  return <MainSideBar user={user} userLogout={logout} {...props} />;
}
