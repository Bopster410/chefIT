"use client";

import { useCallback, useEffect, useState } from "react";
import { RecipesFeed } from "./index.component";
import { getRecipesFeed, Recipe } from "@/entities/recipe";
import { STATUS } from "@/shared/api";
import { useInfiniteScroll } from "@/shared/hooks";

export function RecipesFeedContainer() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getRecipes = useCallback(() => {
    setIsLoading(true);
    getRecipesFeed(page * 12).then((res) => {
      if (!res.Data) {
        setHasMore(false);
        return;
      }
      setPage((prev) => prev + 1);
      setRecipes(() => [...(res.Data || [])]);
      setIsLoading(false);
    });
  }, [setIsLoading, setHasMore, page, setRecipes]);

  const infiniteScroll = useInfiniteScroll(getRecipes, !isLoading && hasMore);
  useEffect(() => {
    getRecipesFeed(12).then(({ Status, Data }) => {
      if (Status === STATUS.SUCCESS && Data) setRecipes(Data);
    });
  }, []);

  return <RecipesFeed lastRecipeRef={infiniteScroll} recipes={recipes} />;
}
