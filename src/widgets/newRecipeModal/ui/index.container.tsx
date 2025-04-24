'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NewRecipeModal } from './index.component';
import useInput from '@/shared/uikit/inputField/api';
import { useModalStore } from '@/app/providers/modalProvider/index.provider';
import { generateRecipe } from '@/entities/recipe/api';

export const NewRecipeModalContainer = () => {
    const router = useRouter();
    const [ingredients, setIngredients] = useState<string[]>([]);
    // TODO лучше перенести эти стейты с инпутами внутрь компонента
    const [input, setInput, clearInput] = useInput('');
    const [query, setQuery] = useInput('');
    const [loading, setLoading] = useState(false);
    const closeModal = useModalStore((state) => state.closeModal);

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
        generateRecipe(query, ingredients).then((recipe) => {
            if (closeModal) closeModal();
            router.push(`/chefbook/${recipe.Data.id.toString()}`);
        });
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
            clearInput={clearInput}
        />
    );
};
