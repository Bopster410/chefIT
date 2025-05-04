"use client";

import { useUserOrToLogin } from "@/entities/user";
import { FavoritesPage } from "./index.component";
import { useCallback, useEffect, useRef, useState } from "react";
import { Recipe } from "@/entities/recipe";
import { addFavorite, getFavorites } from "@/entities/recipe/api";
import { Button } from "@/shared/uikit/button";
import { STATUS } from "@/shared/api";

export function FavoritesPageContainer() {
  const user = useUserOrToLogin();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isSnackbarOpened, setIsOpened] = useState(false);
  const [removedRecipe, setRemoved] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(2);
  const observer = useRef<IntersectionObserver | null>(null);

  const updateRecipes = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await getFavorites(pageRef.current);
      if (res.Status !== STATUS.SUCCESS) {
        setHasMore(false);
      } else {
        setRecipes((prev) => [...prev, ...res.Data]);
        pageRef.current += 1;
      }
    } catch (error) {
      console.error("Ошибка загрузки рецептов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const lastRecipeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          updateRecipes();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, updateRecipes]
  );

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
    if (user) {
      getFavorites(1).then((res) => {
        setRecipes(res.Data);
      });
    }
  }, [user]);

  if (!user) return;
  return (
    <FavoritesPage
      lastRecipeRef={lastRecipeRef}
      action={action}
      isSnackbarOpened={isSnackbarOpened}
      setIsOpened={setIsOpened}
      onRemoveFavorite={handleRemove}
      recipes={recipes}
    />
  );
}
