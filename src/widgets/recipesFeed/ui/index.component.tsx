import { RecipeCard } from "@/entities/recipe";
import { FavoriteWrapper } from "@/features/favoriteWrapper";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Props } from "./index.types";

// TODO: separate recipe props from response json type
export const RecipesFeed: FunctionComponent<Props> = ({
  recipes,
  onAddFavorite,
  onRemoveFavorite,
  isLiked,
}) => {
  return (
    <div className="grid grid-cols-2 mobile:grid-cols-3 gap-3">
      {recipes &&
        recipes.map(({ id, name, description, img }) => (
          <FavoriteWrapper
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            isLiked={isLiked}
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
          </FavoriteWrapper>
        ))}
    </div>
  );
};
