"use client";

import { getHisroty, useUserOrToLogin } from "@/entities/user";
import { HistoryPage } from "./index.component";
import { useCallback, useEffect, useState } from "react";
import { Recipe } from "@/entities/recipe";
import { useInfiniteScroll } from "@/shared/hooks";

export function HistoryPageContainer() {
  const user = useUserOrToLogin();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const getRecipes = useCallback(() => {
    if (!user) return;
    setIsLoading(true);
    getHisroty(page).then((res) => {
      if (!res.Data) {
        setHasMore(false);
        return;
      }
      setPage((prev) => prev + 1);
      setRecipes((prev) => [...prev, ...(res.Data || [])]);
      setIsLoading(false);
    });
  }, [setIsLoading, setHasMore, page, setRecipes, user]);

  const infiniteScroll = useInfiniteScroll(getRecipes, !isLoading && hasMore);

  useEffect(() => {
    setIsLoading(true);
    getHisroty(1).then((res) => {
      if (!res.Data) {
        setHasMore(false);
        return;
      }
      setRecipes(res.Data || []);
      setIsLoading(false);
    });
  }, [setIsLoading, setHasMore, setRecipes]);

  if (!user) return;

  return <HistoryPage lastRecipeRef={infiniteScroll} recipes={recipes} />;
}
