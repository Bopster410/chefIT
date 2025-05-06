"use client";
import { useEffect, useRef } from "react";
import { SearchBar } from "./index.component";
import { throttle } from "@/shared/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/routes/index.constants";
import { SelectedFilters } from "@/entities/recipe/api/index.types";
import { useSearchStore } from "@/app/providers/searchProvider/index.store";

export function SearchBarContainer({
  handleSearch,
  query,
}: {
  handleSearch?: (params?: {
    query?: string;
    filters?: SelectedFilters;
  }) => void;
  query: string;
}) {
  const setQuery = useSearchStore((state) => state.setQuery);
  const clearQuery = useSearchStore((state) => state.clearQuery);
  const filters = useSearchStore((state) => state.filters);
  const router = useRouter();
  const pathname = usePathname();
  const throttledSearch = useRef(throttle(handleSearch || (() => {}), 1000));
  const firstRender = useRef(true);

  // Для предотвращения двойного вызова при рендере используем флаг
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    throttledSearch.current({ query, filters });
  }, [query, filters]);

  const handleFocus = () => {
    if (pathname === ROUTES.HOME) {
      router.replace(ROUTES.SEARCH);
    }
  };

  const clearInput = () => {
    clearQuery();
  };

  return (
    <SearchBar
      onChange={(e) => {
        setQuery(e.currentTarget.value);
      }}
      onFocus={handleFocus}
      onClear={clearInput}
      value={query}
    />
  );
}
