import React, { PropsWithChildren } from "react";
import { Props } from "./index.types";

export const SideBar: React.FunctionComponent<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000030] z-50" onClick={onClose} />
      )}
      <aside
        className={`w-72 h-screen rounded-t-4xl rounded-r-2xl top-0 fixed z-50 overflow-y-auto
        bg-white p-4 shadow-lg ${isOpen ? "" : "hidden"}`}
      >
        {children}
      </aside>
    </>
  );
};
