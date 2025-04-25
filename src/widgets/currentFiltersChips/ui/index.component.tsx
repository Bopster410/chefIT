import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Chip } from "@/shared/uikit/chip";

export const CurrentFiltersChips: FunctionComponent<Props> = ({ filters, clearFilter }) => {
  if(!filters) return;
  return (
    <div className="flex mb-2 mt-4">
      {filters?.diet && <Chip withClear className="mr-2" onClick={()=> clearFilter("diet")}>{filters.diet}</Chip>}
      {filters?.dishType && <Chip withClear className="mr-2" onClick={()=> clearFilter("dishType")}>{filters.dishType}</Chip>}
      {filters.time > 0 && <Chip withClear onClick={()=> clearFilter("time")}>до {filters.time} мин</Chip>}
    </div>
  );
};
