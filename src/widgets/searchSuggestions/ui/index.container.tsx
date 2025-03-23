import { FunctionComponent } from "react";
import { Suggestions } from "./index.component";
import { Props } from "./index.types";

export const SuggestionsContainer: FunctionComponent<Props> = ({
  suggestions,
  handleClick,
}) => {
  return <Suggestions handleClick={handleClick} suggestions={suggestions} />;
};
