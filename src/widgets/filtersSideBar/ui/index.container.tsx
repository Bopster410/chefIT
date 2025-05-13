"use client";

import { useEffect, useState } from "react";
import { FiltersSideBar } from "./index.component";
import { filtersMock, getSearchFilters } from "@/entities/recipe/api";
import {
  RecipeFilters,
  SelectedFilters,
} from "@/entities/recipe/api/index.types";
import { useSearchStore } from "@/app/providers/searchProvider/index.store";
import { STATUS } from "@/shared/api";

export function FiltersSideBarContainer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const onApplyFilters = useSearchStore((state) => state.setFilters);
  const [filters, setFilters] = useState<RecipeFilters>(filtersMock.Data);
  const [selectedFilters, setSelectedFilters] = useState<
    SelectedFilters | undefined
  >(undefined);

  useEffect(() => {
    getSearchFilters().then(({ Data, Status }) => {
      if (Status === STATUS.SUCCESS && Data) setFilters(Data);
    });
  }, []);

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFilters((prev) => ({
      ...(prev || { diet: "", dishType: "", time: filters.time.max }),
      [event.target.name]: event.target.value,
    }));
  }

  function handleChangeRange(event: React.ChangeEvent<HTMLInputElement>) {
    let newTime = Number(event.target.value);

    if (isNaN(newTime)) newTime = filters.time.min;
    if (newTime > filters.time.max) newTime = filters.time.max;

    setSelectedFilters((prev) => ({
      ...(prev || { diet: "", dishType: "" }),
      time: newTime,
    }));
  }

  function handleApplySelect(clear?: boolean) {
    if (!selectedFilters) return;

    if (selectedFilters.time < filters.time.min) {
      setSelectedFilters((prev) => ({
        ...(prev || { diet: "", dishType: "" }),
        time: filters.time.min,
      }));
      onApplyFilters(
        clear
          ? undefined
          : {
              diet: selectedFilters.diet,
              dishType: selectedFilters.dishType,
              time: filters.time.min,
            }
      );
      return;
    }

    onApplyFilters(clear ? undefined : selectedFilters);
  }

  function handleClear() {
    setSelectedFilters(undefined);
    handleApplySelect(true);
  }

  return (
    <FiltersSideBar
      isOpen={isOpen}
      onClose={onClose}
      filters={filters}
      selectedFilters={
        selectedFilters || {
          diet: "",
          dishType: "",
          time: filters.time.max,
        }
      }
      onChangeSelect={handleChangeSelect}
      onChangeRange={handleChangeRange}
      onApllySelect={handleApplySelect}
      onClear={handleClear}
    />
  );
}
