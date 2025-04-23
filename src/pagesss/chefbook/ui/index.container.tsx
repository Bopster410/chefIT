"use client";
import { useEffect, useState } from "react";
import { getUserRecipes, UserRecipe } from "@/entities/recipe/api";
import { ChefBookPage } from "./index.component";
import { useModalStore } from "@/app/providers/modalProvider/index.provider";
import { NewRecipeModalContainer } from "@/widgets/newRecipeModal";

export const ChefBookPageContainer = () => {
  const [recipes, setRecipes] = useState<UserRecipe[]>();
  const openModal = useModalStore(state => state.openModal);

  const handleOpenModal = () => {
      if(!openModal) return;
      openModal(<NewRecipeModalContainer />);
  };

  useEffect(()=>{
    getUserRecipes().then((data)=>setRecipes(data.Data))
  },[])

  return (
    <ChefBookPage openModal={handleOpenModal} recipes={recipes} />
  );
};
