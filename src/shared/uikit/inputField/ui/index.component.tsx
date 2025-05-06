import { FunctionComponent, InputHTMLAttributes, PropsWithChildren } from "react";

export const InputField: FunctionComponent<PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>> = ({
  children,
  ...props
}) => {
  return (
    <input className="w-full outline-0" {...props}>
      {children}
    </input>
  );
};
