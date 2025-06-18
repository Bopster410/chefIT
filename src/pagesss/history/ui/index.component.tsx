import { Navbar } from "@/widgets/navbar";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { RecipesFeed } from "@/widgets/recipesFeed";

export const HistoryPage: FunctionComponent<Props> = ({
  recipes,
  lastRecipeRef,
}) => {
  return (
    <>
      <div className="bg-white rounded-t-4xl h-full px-4 py-8">
        <Navbar />
        <div className="w-full">
          <h5 className="mb-4 mt-5">История</h5>
          <RecipesFeed
            recipes={recipes}
            lastRecipeRef={lastRecipeRef}
          ></RecipesFeed>
        </div>
      </div>
    </>
  );
};
