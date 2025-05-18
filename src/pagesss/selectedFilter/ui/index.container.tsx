"use client";

import {
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import { Recipe } from "@/entities/recipe";
import { SelectedFilterPage } from "./index.component";
import { getRecipesByDiet, getRecipesByType } from "@/entities/recipe/api";
import { useInfiniteScroll } from "@/shared/hooks";

export const SelectedFilterPageContainer: FunctionComponent<{
  type: "diet" | "dishType";
  selectedFilter: string;
}> = ({ type, selectedFilter }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getRecipes = useCallback(()=>{
      setIsLoading(true);
      if(type === "diet"){
        getRecipesByDiet(selectedFilter, page).then((res) =>{
          if(!res.Data) setHasMore(false);
          setPage((prev)=>prev+1);
          setRecipes((prev) => [...prev, ...(res.Data?.recipes || [])]);
          setIsLoading(false);
        })
      }
      else 
        getRecipesByType(selectedFilter, page).then((res) =>{
          if(!res.Data) setHasMore(false);
          setPage((prev)=>prev+1);
          setRecipes((prev) => [...prev, ...(res.Data?.recipes || [])]);
          setIsLoading(false);
        }
      );
  },[page,setIsLoading])

  const infiniteScroll = useInfiniteScroll(getRecipes,!isLoading && hasMore);

  return (
    <SelectedFilterPage
      label={selectedFilter}
      lastRecipeRef={infiniteScroll}
      recipes={recipes}
    />
  );
};
