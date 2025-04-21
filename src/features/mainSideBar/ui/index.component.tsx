import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { SideBar } from "@/shared/uikit/sideBar";
import Link from "next/link";
import { Button } from "@/shared/uikit/button";

export const MainSideBar: FunctionComponent<Props> = ({
  OnCloseSideBar,
  sideBarOpened,
  user,
  userLogout,
}) => {
  return (
    <SideBar isOpen={sideBarOpened} onClose={OnCloseSideBar}>
      <div className="flex flex-col gap-4">
        {user ? (
          <nav className="flex flex-col gap-2 mt-4">
            <Link href="/chefbook">Мои рецепты</Link>
            <Link href="/">Избранное</Link>
            <Link href="/">Профиль</Link>
          </nav>
        ) : (
          <nav className="flex flex-col gap-2 mt-4">
            <p className="text-gray-500">
              Для получения доступа ко всем функциям, пожалуйста, войдите:
            </p>
            <Button>
              <Link href="/login">Войти</Link>
            </Button>
          </nav>
        )}
      </div>
    </SideBar>
  );
};
