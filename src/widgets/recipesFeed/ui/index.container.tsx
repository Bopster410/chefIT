'use client';

import { useEffect, useState } from 'react';
import { RecipesFeed } from './index.ui';
import { getRecipesFeed } from '@/entities/recipe/api';

export const RecipesFeedContainer = () => {
    const [recipes, setRecipes] = useState<
        {
            id: number;
            name: string;
            description: string;
            image: string;
        }[]
    >([]);

    useEffect(() => {
        getRecipesFeed(10).then(({ Data }) => {
            const newRecipes = Data.map(({ id, name, description, img }) => ({
                id,
                name,
                description,
                image: img,
            }));
            setRecipes(newRecipes);
        });
    }, []);

    return <RecipesFeed recipes={recipes} />;
};
