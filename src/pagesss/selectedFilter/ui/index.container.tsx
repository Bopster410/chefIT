"use client";

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Recipe } from "@/entities/recipe";
import { STATUS } from "@/shared/api";
import { SelectedFilterPage } from "./index.component";
import { Response } from "@/shared/api/index.types";
import { getRecipesByDiet, getRecipesByType } from "@/entities/recipe/api";

export const SelectedFilterPageContainer: FunctionComponent<{
  type: "diet" | "dishType";
  selectedFilter: string;
}> = ({ type, selectedFilter }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(2);
  const observer = useRef<IntersectionObserver | null>(null);

  const updateRecipes = useCallback(
    async (
      getRecipesFunction: (
        filter: string,
        page: number
      ) => Promise<Response<{"recipes":Recipe[]}>>
    ) => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);

      try {
        const res = await getRecipesFunction(selectedFilter, pageRef.current);
        if (res.Status !== STATUS.SUCCESS) {
          setHasMore(false);
        } else {
          setRecipes((prev) => [...prev, ...(res.Data?.recipes || [])]);
          pageRef.current += 1;
        }
      } catch (error) {
        console.error("Ошибка загрузки рецептов:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore, selectedFilter]
  );

  const lastRecipeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          updateRecipes(type === "diet" ? getRecipesByDiet : getRecipesByType);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, updateRecipes, type]
  );

  useEffect(() => {
    if (!selectedFilter) return;

    type==="diet"?
    getRecipesByDiet(selectedFilter, 1).then((res) =>
      setRecipes(res.Data?.recipes || [])
    ):
    getRecipesByType(selectedFilter, 1).then((res) =>
      setRecipes(res.Data?.recipes || [])
    );

  }, [selectedFilter]);

  return (
    <SelectedFilterPage
      label={selectedFilter}
      lastRecipeRef={lastRecipeRef}
      recipes={recipes}
    />
  );
};
