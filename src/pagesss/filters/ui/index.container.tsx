"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { FiltersPage } from "./index.component";
import { getSearchFilters } from "@/entities/recipe/api";
import { SelectedFilterPageContainer } from "@/pagesss/selectedFilter";

export const FiltersPageContainer: FunctionComponent<{
  type: "diet" | "dishType";
}> = ({ type }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    getSearchFilters().then((res) => {
      if (type === "diet") {
        setFilters(res.Data?.diets || []);
      } else if (type === "dishType") {
        setFilters(res.Data?.dishTypes || []);
      }
    });
  }, [type]);

  if (selectedFilter)
    return (
      <SelectedFilterPageContainer
        type={type}
        selectedFilter={selectedFilter}
      />
    );
  return (
    <FiltersPage
      onSelectFilter={(filter) => setSelectedFilter(filter)}
      filters={filters}
      type={type}
    />
  );
};
