import { InputField } from "@/shared/uikit/inputField";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { LABELS } from "./index.constants";

export const UserInfoField: FunctionComponent<Props> = ({
  type,
  required,
  error,
  name,
  label,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={type} className="block text-sm font-medium text-gray-700">
        {label || LABELS[type]}
      </label>
      <InputField
        type={type === "password" ? "password" : "text"}
        id={name || type}
        name={name || type}
        {...(required ? { required } : {})}
        {...(type === "password" ? { minLength: 8 } : {})}
        maxLength={64}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md ${
          error && `border-red-500 focus:ring-red-500`
        }`}
        {...props}
      />
    </div>
  );
};
