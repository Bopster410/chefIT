import { InputField } from "@/shared/uikit/inputField";
import { FunctionComponent, useState } from "react";
import { Props } from "./index.types";
import { LABELS } from "./index.constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const UserInfoField: FunctionComponent<Props> = ({
  type,
  required,
  error,
  name,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={type} className="block text-sm font-medium text-gray-700">
        {label || LABELS[type]}
      </label>
      <div className="relative flex flex-row">
        <InputField
          type={isPassword ? (showPassword ? "text" : "password") : "text"}
          id={name || type}
          name={name || type}
          {...(required ? { required } : {})}
          {...(isPassword ? { minLength: 8 } : {})}
          maxLength={64}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md ${
            error && `border-red-500 focus:ring-red-500`
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </button>
        )}
      </div>
    </div>
  );
};
