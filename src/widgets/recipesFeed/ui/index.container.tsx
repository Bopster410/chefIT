'use client';

import { useEffect, useState } from 'react';
import { RecipesFeed } from './index.component';
import { getRecipesFeed, Recipe } from '@/entities/recipe';
import { STATUS } from '@/shared/api';

export function RecipesFeedContainer() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        getRecipesFeed(10).then(({ Status, Data }) => {
            if (Status === STATUS.SUCCESS && Data) setRecipes(Data);
        });
    }, []);

    return <RecipesFeed recipes={recipes} />;
}
