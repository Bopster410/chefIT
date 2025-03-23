"use client";
import { useEffect, useState } from "react";
import { getRecipesFeed, getRecipesSearch, Recipe } from "@/entities/recipe/api";
import { SearchPage } from "./index.component";

export function SearchPageContainer() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>("#search-input");
    if (input) {
      input.focus();
    }
  }, []);

  function handleSearch(query?: string) {
    if (query === undefined || query === "") {
      getRecipesFeed(10).then((recipes) => {
        setRecipes(recipes.Data);
      });
    } else {
      getRecipesSearch(query)
        .then((recipes) => {
          setRecipes(recipes.Data.recipes);
        })
        .catch(() => {});
    }
  }

  return <SearchPage handleSearch={handleSearch} recipes={recipes} />;
}
