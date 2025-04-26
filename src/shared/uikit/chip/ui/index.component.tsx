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
  onButtonClick,
  className,
  withClear,
}) => {
  return (
    <div
      className={`inline-flex items-center ${
        COLORS[color ?? "gray"]
      } text-sm font-medium px-3 py-1 rounded-full 
      ${className} ${!withClear ? "cursor-pointer" : ""}`}
      {...(!withClear ? { onClick } : {})}
    >
      {children}
      {withClear && (
        <button
          type="button"
          className="ml-2 cursor-pointer"
          aria-label="Удалить"
          onClick={onButtonClick}
        >
          &times;
        </button>
      )}
    </div>
  );
};
