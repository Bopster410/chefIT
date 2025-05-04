import { getSearchFilters } from "@/entities/recipe/api";
import { FiltersPage } from "@/pagesss/filters";

export default async function Page() {
  const diets = (await getSearchFilters()).Data.diets;
  return <FiltersPage filters={diets} />;
}
