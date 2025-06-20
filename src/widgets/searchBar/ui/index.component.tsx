import { InputField } from "@/shared/uikit/inputField";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import CloseIcon from "@mui/icons-material/Close";

export const SearchBar: FunctionComponent<Props> = ({
  onChange,
  value,
  onClear,
  ...props
}) => {
  return (
    <div className="h-15 flex rounded-lg mb-3 p-2.5 bg-gray-100">
      <InputField
        onChange={onChange ?? (() => {})}
        value={value ?? ""}
        id="search-input"
        {...props}
        placeholder="Поиск на chefIT"
      />
      {value && value !== "" && (
        <button onClick={onClear} color="gray">
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
