import { getRecipesFeed } from "@/entities/recipe";
import { HomePage } from "@/pagesss/home";
import { CookingProgressBarContainer } from "@/widgets/cookingProgressBar/ui/index.container";
import { RecipesFeed } from "@/widgets/recipesFeed";

export default async function Page() {
  const recipes = (await getRecipesFeed(10)).Data;
  return (
    <>
      <div className=" bg-white rounded-t-4xl h-full px-4 py-8">
        <HomePage />
        <RecipesFeed recipes={recipes} />
      </div>
      <CookingProgressBarContainer />
    </>
  );
}
