import { FunctionComponent } from "react";
import { Props } from "./index.types";

export const Suggestions: FunctionComponent<Props> = ({ suggestions, handleClick }) => {
  return (
    <div className="mb-3 border-t-gray-200 border-t-2">
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-blue-50 p-3 cursor-pointer border-b-2 border-b-gray-200 last:border-b-0 last:rounded-b-lg"
            onClick={handleClick}
          >
            {suggestion}
          </div>
        ))}
    </div>
  );
};
