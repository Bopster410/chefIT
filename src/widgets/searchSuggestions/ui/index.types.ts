import { MouseEventHandler } from "react";

export interface Props {
  suggestions: string[];
  handleClick: MouseEventHandler<HTMLDivElement>;
}
