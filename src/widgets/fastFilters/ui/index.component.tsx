import { FunctionComponent } from "react";
import { FilterCard } from "@/features/filterCard";

export const FastFilters: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-2 mobile:grid-cols-2 gap-3 mb-3">
      <FilterCard filterType="diets" image="/diets.jpg" />
      <FilterCard filterType="dishTypes" image="/dish_types.jpg" />
    </div>
  );
};
