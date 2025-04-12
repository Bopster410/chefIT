import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { SideBar } from "@/shared/uikit/sideBar";
import Link from "next/link";

export const MainSideBar: FunctionComponent<Props> = ({
  OnCloseSideBar,
  sideBarOpened,
}) => {
  return (
    <SideBar isOpen={sideBarOpened} onClose={OnCloseSideBar}>
      <div className="flex flex-col gap-4">
        <nav className="flex flex-col gap-2 mt-4">
          <Link
            href="/chefbook"
            className="text-base text-gray-600 hover:text-primary transition-colors"
          >
            Мои рецепты
          </Link>
          <Link
            href="/"
            className="text-base text-gray-600 hover:text-primary transition-colors"
          >
            Избранное
          </Link>
          <Link
            href="/"
            className="text-base text-gray-600 hover:text-primary transition-colors"
          >
            Профиль
          </Link>
        </nav>
      </div>
    </SideBar>
  );
};
