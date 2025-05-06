'use client';
import { useEffect, useState } from 'react';
import { getUserRecipes } from '@/entities/recipe/api';
import { ChefBookPage } from './index.component';
import { useModalStore } from '@/app/providers/modalProvider/index.provider';
import { NewRecipeModalContainer } from '@/widgets/newRecipeModal';
import { useUserOrToLogin } from '@/entities/user';
import { RecipeProps } from '@/entities/recipe/ui/recipeCard';

export const ChefBookPageContainer = () => {
    const user = useUserOrToLogin();
    const [recipes, setRecipes] = useState<RecipeProps[]>();
    const openModal = useModalStore((state) => state.openModal);

    const handleOpenModal = () => {
        if (!openModal) return;
        openModal(<NewRecipeModalContainer />);
    };

    useEffect(() => {
        getUserRecipes().then(({ Data }) =>
            setRecipes(
                Data?.map(({ cookingTimeMinutes, ...data }) => ({
                    cookingTime: cookingTimeMinutes,
                    ...data,
                }))
            )
        );
    }, []);

    if (!user) return;
    return (
        <ChefBookPage
            openModal={handleOpenModal}
            recipes={recipes}
        />
    );
};
