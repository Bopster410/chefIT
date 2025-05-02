'use client';

import { Button } from '@/shared/uikit/button';
import { FunctionComponent, useState } from 'react';
import { Props } from './index.types';
import { RecipeDescription } from '@/entities/recipe/ui';
// import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { ChefbookRecipeHistoryContainer } from '@/widgets/chefbookRecipeHistory';
import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { Container } from '@/shared/uikit/container';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BackButton } from '@/features/backButton';

export const ChefbookRecipe: FunctionComponent<Props> = ({
    recipe: { name, description, cookingTime, servingsNum, ingredients, steps },
    recipeId,
    version,
    userIngredients,
    query,
}) => {
    const [curname, setName] = useState(name);
    const [curdescription, setDescription] = useState(description);
    const [curcookingTime, setCookingTime] = useState(cookingTime);
    const [curservingsNum, setServingsNum] = useState(servingsNum);
    const [curingredients, setIngredients] = useState(ingredients);
    const [cursteps, setSteps] = useState(steps);
    const [curversion, setVersion] = useState(version);

    return (
        <div className='bg-white rounded-t-4xl h-full pb-4 px-4 mobile:px-8'>
            <div className='py-4'>
                <BackButton
                    color='white'
                    size='sm'
                >
                    <ArrowBackIcon />
                </BackButton>
            </div>
            <BottomSheet.Root handleOnly>
                <div className='text-xl font-bold'>
                    {userIngredients && (
                        <div>Рецепт из: {userIngredients.join(', ')}</div>
                    )}
                    {query && <div>{`«${query}»`}</div>}
                    <BottomSheet.Trigger>
                        <Button color='gray'>
                            <div className='flex items-center gap-0.5'>
                                История <HistoryIcon />
                            </div>
                        </Button>
                    </BottomSheet.Trigger>
                </div>
                <RecipeDescription
                    name={curname}
                    description={curdescription}
                    cookingTime={curcookingTime}
                    servings={curservingsNum}
                    ingredients={curingredients}
                    steps={cursteps}
                />

                <BottomSheet.Portal>
                    <BottomSheet.Overlay />
                    <BottomSheet.Content>
                        <div className='grid justify-center overflow-y-auto'>
                            <Container>
                                <ChefbookRecipeHistoryContainer
                                    recipeId={recipeId}
                                    mainVersion={curversion}
                                    onMainVersionChange={({
                                        name,
                                        description,
                                        cookingTimeMinutes: cookingTime,
                                        servingsNum,
                                        ingredients,
                                        steps,
                                        version,
                                    }) => {
                                        setName(name);
                                        setDescription(description);
                                        setCookingTime(cookingTime);
                                        setServingsNum(servingsNum);
                                        setIngredients(ingredients);
                                        setSteps(steps);
                                        setVersion(version);
                                    }}
                                />
                            </Container>
                        </div>
                    </BottomSheet.Content>
                </BottomSheet.Portal>
            </BottomSheet.Root>
        </div>
    );
};
