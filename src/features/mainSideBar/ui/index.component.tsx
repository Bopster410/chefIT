import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { SideBar } from "@/shared/uikit/sideBar";
import Link from "next/link";
import { Button } from "@/shared/uikit/button";
import PersonIcon from "@mui/icons-material/Person"; // MUI иконка пользователя

export const MainSideBar: FunctionComponent<Props> = ({
  OnCloseSideBar,
  sideBarOpened,
  user,
  userLogout,
}) => {
  return (
    <SideBar isOpen={sideBarOpened} onClose={OnCloseSideBar}>
      <div className="flex flex-col">
        {user && (
          <div className="flex items-center gap-2 mt-4 mb-2 px-2 text-gray-800">
            <Link href="/profile">
              <PersonIcon className="mr-2" />
              <span className="font-medium">
                {user.name} {user.surname}
              </span>
            </Link>
          </div>
        )}

        {user ? (
          <nav className="flex flex-col gap-2 mt-2">
            <Link href="/chefbook">Рецепты шефа</Link>
            <Link href="/profile">Избранное</Link>
            <Button className="mt-5" onClick={userLogout}>
              Выйти
            </Button>
          </nav>
        ) : (
          <nav className="flex flex-col gap-4 mt-4">
            <p className="text-gray-500">
              Для получения доступа ко всем функциям, пожалуйста, войдите:
            </p>
            <Link href="/login">
              <Button className="w-full">Войти</Button>
            </Link>
          </nav>
        )}
      </div>
    </SideBar>
  );
};
