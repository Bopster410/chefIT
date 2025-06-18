"use client";

import { useUserOrToLogin } from "@/entities/user";
import { FavoritesPage } from "./index.component";
import { useCallback, useEffect, useState } from "react";
import { Recipe } from "@/entities/recipe";
import { addFavorite, getFavorites } from "@/entities/recipe/api";
import { Button } from "@/shared/uikit/button";
import { useInfiniteScroll } from "@/shared/hooks";

export function FavoritesPageContainer() {
  const user = useUserOrToLogin();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isSnackbarOpened, setIsOpened] = useState(false);
  const [removedRecipe, setRemoved] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const getRecipes = useCallback(() => {
    if (!user) return;
    setIsLoading(true);
    getFavorites(page).then((res) => {
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

  const handleRemove = (id?: number) => {
    if (!id) return;

    const toRemove = recipes.find((recipe) => recipe.id === id);
    if (!toRemove) return;

    setRemoved(toRemove);
    setIsOpened(true);
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const handleUndo = () => {
    if (!removedRecipe) return;
    addFavorite(removedRecipe.id);

    setRemoved(undefined);
    setIsOpened(false);
    if (hasMore) return;
    else setRecipes((prev) => [...prev, removedRecipe]);
  };

  const action = <Button onClick={handleUndo}>Отменить</Button>;

  useEffect(() => {
    setIsLoading(true);
    getFavorites(1).then((res) => {
      if (!res.Data) {
        setHasMore(false);
        return;
      }
      setRecipes(res.Data || []);
      setIsLoading(false);
    });
  }, [setIsLoading, setHasMore, setRecipes]);
  if (!user) return;
  return (
    <FavoritesPage
      lastRecipeRef={infiniteScroll}
      action={action}
      isSnackbarOpened={isSnackbarOpened}
      setIsOpened={setIsOpened}
      onRemoveFavorite={handleRemove}
      recipes={recipes}
    />
  );
}
