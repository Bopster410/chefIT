import { RecipeCard } from "@/entities/recipe";
import { SearchBarContainer } from "@/widgets/searchBar";
import { Props } from "./index.types";
import { FunctionComponent } from "react";
import { SuggestionsContainer } from "@/widgets/searchSuggestions";

export const SearchPage: FunctionComponent<Props> = ({
  handleSearch,
  recipes,
  suggestions,
  handleClick,
}) => {
  return (
    <div>
      <SearchBarContainer
        haveSuggestions={suggestions.length !== 0}
        handleSearch={handleSearch}
      />
      {suggestions.length !== 0 && (
        <SuggestionsContainer handleClick={handleClick} suggestions={suggestions} />
      )}
      <div className="flex flex-col space-y-2">
        {recipes &&
          recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
      </div>
    </div>
  );
};
