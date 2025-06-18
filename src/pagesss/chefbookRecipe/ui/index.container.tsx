'use client';

import { getChefbookRecipe, RecipeDetailedChefbook } from '@/entities/recipe';
import { FunctionComponent, useEffect, useState } from 'react';
import { ChefbookRecipe } from './index.component';
import { STATUS } from '@/shared/api';
import { CircularProgress } from '@mui/material';
export const ChefbookRecipeContainer: FunctionComponent<{
    id: number;
}> = ({ id }) => {
    const [response, setResponse] = useState<RecipeDetailedChefbook | null>();
    const [isCorrect, setIsCorrect] = useState(true);

    useEffect(() => {
        getChefbookRecipe(id).then(({ Status, Data }) => {
            if (Status !== STATUS.SUCCESS || !Data) {
                setIsCorrect(false);
                return;
            }

            setResponse(Data);
        });
    }, [id]);

    return response && isCorrect ? (
        <ChefbookRecipe
            recipeId={id}
            version={response.version}
            userIngredients={response.userIngredients}
            query={response.query}
            recipe={{
                description: response.description,
                name: response.name,
                cookingTime: response.cookingTimeMinutes,
                servingsNum: response.servingsNum,
                ingredients: response.ingredients,
                steps: response.steps,
            }}
        />
    ) : !isCorrect ? (
        <div>Что-топошло не так</div>
    ) : (
        <CircularProgress />
    );
};
