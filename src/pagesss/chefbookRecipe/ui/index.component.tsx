'use client';

import { Button } from '@/shared/uikit/button';
import { FunctionComponent, useState } from 'react';
import { Props } from './index.types';
import { RecipeDescription } from '@/entities/recipe/ui';
import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { ChefbookRecipeHistoryContainer } from '@/widgets/chefbookRecipeHistory';

export const ChefbookRecipe: FunctionComponent<Props> = ({
    recipe: {
        name,
        description,
        cookingTime,
        prepTime,
        servingsNum,
        ingredients,
        steps,
    },
    versionId,
    neededIngredients,
    query,
}) => {
    const [isHistoryOpened, setIsHistoryOpened] = useState(false);
    const [curname, setName] = useState(name);
    const [curdescription, setDescription] = useState(description);
    const [curcookingTime, setCookingTime] = useState(cookingTime);
    const [curprepTime, setPrepTime] = useState(prepTime);
    const [curservingsNum, setServingsNum] = useState(servingsNum);
    const [curingredients, setIngredients] = useState(ingredients);
    const [cursteps, setSteps] = useState(steps);
    const [curversion, setVersion] = useState(versionId);

    return (
        <div className='bg-white rounded-t-4xl h-full pt-10 px-8'>
            <div className='text-xl font-bold'>
                <div>Рецепт из {neededIngredients.map((value) => value)}</div>
                {query && <div>{`"${query}"`}</div>}
                <Button
                    color='gray'
                    onClick={() => setIsHistoryOpened(true)}
                >
                    История
                </Button>
            </div>
            <RecipeDescription
                name={curname}
                description={curdescription}
                cookingTime={curcookingTime}
                prepTime={curprepTime}
                servings={curservingsNum}
                ingredients={curingredients}
                steps={cursteps}
            />
            <BottomSheet
                onOuterClick={() => setIsHistoryOpened(false)}
                opened={isHistoryOpened}
            >
                <ChefbookRecipeHistoryContainer
                    mainVersion={curversion}
                    onMainVersionChange={({
                        name,
                        description,
                        cookingTime,
                        prepTime,
                        servingsNum,
                        ingredients,
                        steps,
                        versionId,
                    }) => {
                        setName(name);
                        setDescription(description);
                        setCookingTime(cookingTime);
                        setPrepTime(prepTime);
                        setServingsNum(servingsNum);
                        setIngredients(ingredients);
                        setSteps(steps);
                        setVersion(versionId);
                    }}
                />
            </BottomSheet>
        </div>
    );
};
