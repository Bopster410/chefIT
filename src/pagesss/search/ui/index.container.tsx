"use client";
import { MouseEvent, useEffect, useState } from "react";
import {
  getRecipesFeed,
  getRecipesSearch,
  getSearchSuggestions,
  Recipe,
} from "@/entities/recipe/api";
import { SearchPage } from "./index.component";

export function SearchPageContainer() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>("#search-input");
    if (input) {
      input.focus();
    }
  }, []);

  function searchRecipes(query?: string){
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

  function getSuggestions(query?: string){
    if (query === undefined || query === "") {
      setSuggestions([]);
    }
    else{
      getSearchSuggestions(query)
      .then((suggestions) => {
        if (!suggestions.Data.suggestions) throw new Error("no suggestions");
        setSuggestions(suggestions.Data.suggestions);
      })
      .catch(() => {
        setSuggestions([]);
      });
    }
  }

  function handleSearch(query?: string) {
    searchRecipes(query);
    getSuggestions(query);
  }

  function handleSuggestionClick(event:MouseEvent<HTMLDivElement>){
    const input = document.querySelector<HTMLInputElement>("#search-input");
    const chosenSuggestion = event?.currentTarget.textContent;
    if (input && chosenSuggestion) {
      input.value = chosenSuggestion;
      searchRecipes(chosenSuggestion);
      setSuggestions([]);
    }
  }

  return (
    <SearchPage
      suggestions={suggestions}
      handleSearch={handleSearch}
      recipes={recipes}
      handleClick={handleSuggestionClick}
    />
  );
}
