import { Navbar } from "@/widgets/navbar";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Snackbar } from "@mui/material";
import { RecipesFeed } from "@/widgets/recipesFeed";

export const FavoritesPage: FunctionComponent<Props> = ({
  recipes,
  action,
  isSnackbarOpened,
  setIsOpened,
  lastRecipeRef,
  onRemoveFavorite,
}) => {
  return (
    <>
      <Snackbar
        open={isSnackbarOpened}
        autoHideDuration={3000}
        onClose={() => setIsOpened(false)}
        message="Удалено из избранного"
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <div className="bg-white rounded-t-4xl h-full px-4 py-8">
        <Navbar />

        <div className="w-full">
          <h5 className="mb-4 mt-5">Избранное</h5>
          <RecipesFeed
            recipes={recipes}
            lastRecipeRef={lastRecipeRef}
            onRemoveFavorite={onRemoveFavorite}
            likedByDefault
          ></RecipesFeed>
        </div>
      </div>
    </>
  );
};
