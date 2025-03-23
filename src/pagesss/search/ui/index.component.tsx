import { RecipeCard } from "@/entities/recipe";
import { SearchBarContainer } from "@/widgets/searchBar";
import { Props } from "./index.types";
import { FunctionComponent } from "react";

export const SearchPage: FunctionComponent<Props> = ({
  handleSearch,
  recipes,
  haveSuggestions,
}) => {
  return (
    <div>
      <SearchBarContainer haveSuggestions={haveSuggestions} handleSearch={handleSearch} />
      <div className="flex flex-col space-y-2">
        {recipes &&
          recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
      </div>
    </div>
  );
};
