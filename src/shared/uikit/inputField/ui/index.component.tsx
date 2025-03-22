import { FunctionComponent, PropsWithChildren } from "react";
import { Props } from "./index.types";

export const InputField: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  return (
    <input className="w-full outline-0" {...props}>
      {children}
    </input>
  );
};
