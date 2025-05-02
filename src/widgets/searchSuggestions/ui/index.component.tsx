import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Chip } from "@/shared/uikit/chip";

export const Suggestions: FunctionComponent<Props> = ({ suggestions, handleClick }) => {
  return (
    <div className="mb-3">
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <Chip className="ml-2 mb-2" key={index} onClick={handleClick}>{suggestion}</Chip>
        ))}
    </div>
  );
};
