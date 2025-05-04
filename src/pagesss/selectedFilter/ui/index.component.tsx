import { Navbar } from "@/widgets/navbar";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { FavoriteWrapper } from "@/features/favoriteWrapper";
import Link from "next/link";
import { RecipeCard } from "@/entities/recipe";

export const SelectedFilterPage: FunctionComponent<Props> = ({
  label,
  recipes,
  lastRecipeRef,
}) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <Navbar />
      <div className="w-full">
        <h4 className="mb-5">{label}</h4>

        <div className="grid grid-cols-2 mobile:grid-cols-3 gap-3">
          {recipes &&
            recipes.map(({ id, name, description, img }, i) => (
              <FavoriteWrapper key={id} id={id}>
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
  );
};
