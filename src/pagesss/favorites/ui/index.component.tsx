import { Navbar } from "@/widgets/navbar";
import { RecipesFeed } from "@/widgets/recipesFeed";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Snackbar } from "@mui/material";
import { FavoriteWrapper } from "@/features/favoriteWrapper";
import Link from "next/link";
import { RecipeCard } from "@/entities/recipe";

export const FavoritesPage: FunctionComponent<Props> = ({
  recipes,
  onAddFavorite,
  onRemoveFavorite,
  action,
  isSnackbarOpened,
  setIsOpened,
  lastRecipeRef,
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
          <h3 className="mb-5">Избранное</h3>

          <div className="grid grid-cols-2 mobile:grid-cols-3 gap-3">
            {recipes &&
              recipes.map(({ id, name, description, img }, i) => (
                <FavoriteWrapper
                  onAddFavorite={onAddFavorite}
                  onRemoveFavorite={onRemoveFavorite}
                  isLiked
                  key={id}
                  id={id}
                >
                  <Link href={`recipe/${id}`}>
                    <RecipeCard
                      id={id}
                      name={name}
                      description={description}
                      image={img}
                    />
                  </Link>
                  {i === recipes.length - 1 && <div ref={lastRecipeRef}></div>}
                </FavoriteWrapper>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
