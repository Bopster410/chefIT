import { InputField } from "@/shared/uikit/inputField";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { Chip } from "@/shared/uikit/chip";

export const NewRecipeModal: FunctionComponent<Props> = ({
  input,
  setInput,
  onAddIngredient,
  onDeleteIngredient,
  ingredients,
  query,
  setQuery,
  onCreateRecipe,
  loading,
}) => {
  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-500 text-lg">
        Идет создание вашего рецепта. Пожалуйста, подождите.
      </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <InputField
              value={input}
              onChange={setInput}
              placeholder="Введите ингредиент"
              className="flex-1 border border-gray-300 rounded-lg p-2 text-lg"
            />
            <Button onClick={onAddIngredient} className="whitespace-nowrap">
              Добавить
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {ingredients.map((ingredient, index) => (
              <Chip key={index} onClick={() => onDeleteIngredient(ingredient)}>
                {ingredient}
              </Chip>
            ))}
          </div>

          <div className="mb-6">
            <InputField
              value={query}
              onChange={setQuery}
              placeholder="Пожелания по рецепту (опционально)"
              className="w-full border border-gray-300 rounded-lg p-2 mt-10 text-base"
            />
          </div>

          <div className="flex justify-center">
            <Button onClick={onCreateRecipe}>Создать рецепт</Button>
          </div>
        </>
      )}
    </div>
  );
};
