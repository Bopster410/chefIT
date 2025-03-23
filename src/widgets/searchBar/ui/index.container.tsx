"use client";
import { useEffect, useRef } from "react";
import useInput from "../api";
import { SearchBar } from "./index.component";
import { throttle } from "@/shared/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/routes/index.constants";

export function SearchBarContainer({
  handleSearch,
  haveSuggestions,
}: {
  handleSearch?: (query?: string) => void;
  haveSuggestions: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, handleQueryChange] = useInput("");

  if (handleSearch) {
    const throttledSearch = useRef(throttle(handleSearch, 1000));

    // Для предотвращения двойного вызова при рендере используем флаг
    const firstRender = useRef(true);
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      throttledSearch.current(query);
    }, [query]);
  }

  const handleFocus = () => {
    if (pathname === ROUTES.HOME) {
      router.replace(ROUTES.SEARCH);
    }
  };

  return (
    <SearchBar
      haveSuggestions={haveSuggestions}
      onChange={handleQueryChange}
      onFocus={handleFocus}
    />
  );
}
