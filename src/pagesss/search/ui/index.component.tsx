import { RecipeCard } from "@/entities/recipe";
import { SearchBarContainer } from "@/widgets/searchBar";
import { Props } from "./index.types";
import { FunctionComponent, useState } from "react";
import { Suggestions } from "@/widgets/searchSuggestions";
import { Navbar } from "@/shared/uikit/navbar";
import { FiltersSideBarContainer } from "@/widgets/filtersSideBar/ui/index.container";

export const SearchPage: FunctionComponent<Props> = ({
  handleSearch,
  recipes,
  suggestions,
  handleClick,
  onApplyFilters,
  filters,
  query,
  handleQueryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`fixed inset-0 bg-[#00000030] z-50 ${
          isOpen ? `` : `hidden`
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <FiltersSideBarContainer
        onApplyFilters={onApplyFilters}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="bg-white rounded-t-4xl h-full px-4 py-8">
        <Navbar />
        {/* TODO: Вынести кнопку в UI kit Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="hover:cursor-pointer bg-gray-200 p-2 rounded mb-2"
        >
          Открыть фильтры
        </button>
        <SearchBarContainer
          haveSuggestions={suggestions.length !== 0}
          handleSearch={handleSearch}
          filters={filters}
          query={query}
          handleQueryChange={handleQueryChange}
        />
        {suggestions.length !== 0 && (
          <Suggestions handleClick={handleClick} suggestions={suggestions} />
        )}
        <div className="flex flex-col space-y-2">
          {recipes &&
            recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
        </div>
      </div>
    </>
  );
};
