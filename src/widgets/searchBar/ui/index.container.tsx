"use client";
import { useEffect, useRef } from "react";
import useInput from "../api";
import { SearchBar } from "./index.component";
import { throttle } from "@/shared/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/routes/index.constants";
import { SelectedFilters } from "@/entities/recipe/api/index.types";

export function SearchBarContainer({
  handleSearch,
  haveSuggestions,
  filters,
  query,
  handleQueryChange,
}: {
  handleSearch?: (params?: { query?: string; filters?: SelectedFilters }) => void;
  haveSuggestions: boolean;
  filters: SelectedFilters | undefined;
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  if (handleSearch) {
    const throttledSearch = useRef(throttle(handleSearch, 1000));

    // Для предотвращения двойного вызова при рендере используем флаг
    const firstRender = useRef(true);
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      throttledSearch.current({query,filters});
    }, [query,filters]);
  }

  const handleFocus = () => {
    if (pathname === ROUTES.HOME) {
      router.replace(ROUTES.SEARCH);
    }
  };

  const clearInput = () =>
    handleQueryChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);

  return (
    <SearchBar
      haveSuggestions={haveSuggestions}
      onChange={handleQueryChange}
      onFocus={handleFocus}
      onClear={clearInput}
      value={query}
    />
  );
}
