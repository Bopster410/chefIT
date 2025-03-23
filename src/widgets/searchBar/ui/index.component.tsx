import { InputField } from "@/shared/uikit/inputField";
import { FunctionComponent } from "react";
import { Props } from "./index.types";

export const SearchBar: FunctionComponent<Props> = ({haveSuggestions, ...props}) => {
  return (
    <div
      className={`flex ${
        haveSuggestions ? `rounded-t-lg` : "rounded-lg"
      } p-2.5 bg-gray-100 mb-3`}
    >
      <InputField id="search-input" {...props} placeholder="Поиск на chefIT" />
    </div>
  );
};
