import { InputField } from "@/shared/uikit/inputField";
import { FunctionComponent } from "react";
import { Props } from "./index.types";

export const Suggestions: FunctionComponent<Props> = ({ suggestions }) => {
  return (
    <div>
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <div key={index} className="bg-gray-100 mb-3"></div>
        ))}
    </div>
  );
};
