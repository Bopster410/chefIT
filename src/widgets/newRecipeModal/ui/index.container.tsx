import { useState } from "react";
import { useRouter } from 'next/navigation';
import { NewRecipeModal } from "./index.component";
import useInput from "@/shared/uikit/inputField/api";

export const NewRecipeModalContainer = () => {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useInput("");
  const [query, setQuery] = useInput("");
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if (ingredients.includes(input)) {
      return;
    }
    setIngredients((prevIngredients) => [...prevIngredients, input]);
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => ing !== ingredient)
    );
  };

  const createRecept = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/chefbook/1`);
    }, 2000);
  };

  return (
    <NewRecipeModal
      input={input}
      setInput={setInput}
      onAddIngredient={addIngredient}
      onDeleteIngredient={removeIngredient}
      ingredients={ingredients}
      query={query}
      setQuery={setQuery}
      onCreateRecipe={createRecept}
      loading={loading}
    />
  );
};
