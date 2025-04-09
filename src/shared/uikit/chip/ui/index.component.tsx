import { FunctionComponent, PropsWithChildren } from "react";
import { Props } from "./index.types";

const COLORS = {
  saffron: "bg-saffron-500",
  violet: "bg-violet-500",
  gray: "bg-gray-100",
};

export const Chip: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  color,
  onClick,
  className,
}) => {
  return (
    <div
      className={`inline-flex items-center ${
        COLORS[color ?? "gray"]
      } text-sm font-medium px-3 py-1 rounded-full 
      ${className}`}
    >
      {children}
      <button
        type="button"
        className="ml-2 cursor-pointer"
        aria-label="Удалить"
        onClick={onClick}
      >
        &times;
      </button>
    </div>
  );
};
