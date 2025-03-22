"use client";
import { useEffect, useRef } from "react";
import useInput from "../api";
import { SearchBar } from "./index.component";
import { throttle } from "@/shared/api";

export function SearchBarContainer() {
  const [query, handleQueryChange] = useInput("");
  const throttledLog = useRef(
    throttle((msg) => console.log(msg), 1000) 
  );

  useEffect(() => {
    throttledLog.current(query); 
  }, [query]);

  return <SearchBar onChange = { handleQueryChange } />;
}
