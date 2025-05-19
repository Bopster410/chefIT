import { RecipeWithFavorite } from "@/features/favoriteWrapper";
import { FunctionComponent } from "react";
import { Props } from "./index.types";

// TODO: separate recipe props from response json type
export const RecipesFeed: FunctionComponent<Props> = ({
  recipes,
  lastRecipeRef,
  onRemoveFavorite,
  likedByDefault,
}) => {
  return (
    <div className="grid grid-cols-2 mobile:grid-cols-3 gap-3">
      {recipes
        ? recipes.map(
            (
              { id, name, description, img, cookingTimeMinutes, isFavorite },
              index,
            ) => (
              <div key={id} className="h-full">
                <RecipeWithFavorite
                  id={id}
                  likedByDefault={likedByDefault || isFavorite}
                  link={`recipe/${id}`}
                  name={name}
                  cookingTime={cookingTimeMinutes}
                  description={description}
                  image={img}
                  onRemove={onRemoveFavorite}
                />
                {index === recipes.length - 1 && lastRecipeRef && (
                  <div ref={lastRecipeRef}></div>
                )}
              </div>
            ),
          )
        : lastRecipeRef && <div ref={lastRecipeRef}></div>}
    </div>
  );
};
