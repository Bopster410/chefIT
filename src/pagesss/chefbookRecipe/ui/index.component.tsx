'use client';

import { Button } from '@/shared/uikit/button';
import { FunctionComponent, useState } from 'react';
import { Props } from './index.types';
// import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { ChefbookRecipeHistoryContainer } from '@/widgets/chefbookRecipeHistory';
import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { Container } from '@/shared/uikit/container';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BackButton } from '@/features/backButton';
import { ErrorBoundary } from 'react-error-boundary';
import { RecipeWithCookingStoreGeneratedContainer } from '@/widgets/recipe/ui/index.container.store.generated';
import { Blockquote } from '@/shared/uikit/blockquote';

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
    // const [withError, setWithError] = useState(false);

    return (
        <div className='bg-white rounded-t-4xl h-full pb-4 px-4 mobile:px-8'>
            <BottomSheet.Root handleOnly>
                <div className='flex justify-between py-4 sticky top-0 bg-white'>
                    {/* TODO перенести в лэйаут как-то */}
                    <BackButton
                        color='white'
                        size='sm'
                    >
                        <ArrowBackIcon />
                    </BackButton>
                    <BottomSheet.Trigger asChild>
                        <Button
                            color='white'
                            size='sm'
                        >
                            <HistoryIcon />
                        </Button>
                    </BottomSheet.Trigger>
                </div>
                <div className='mb-8'>
                    <Blockquote>
                        {userIngredients && (
                            <div>Рецепт из: {userIngredients.join(', ')}</div>
                        )}
                        {query && <div>{`«${query}»`}</div>}
                    </Blockquote>
                </div>
                <ErrorBoundary
                    resetKeys={[recipeId, version]}
                    fallback={<div>Что-то пошло не так</div>}
                    // onError={() => {
                    //     setWithError(true);
                    // }}
                    // onReset={() => {
                    //     setWithError(false);
                    // }}
                >
                    <RecipeWithCookingStoreGeneratedContainer
                        id={recipeId}
                        name={curname}
                        description={curdescription}
                        cookingTime={curcookingTime}
                        servings={curservingsNum}
                        ingredients={curingredients}
                        steps={cursteps}
                    />
                </ErrorBoundary>

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
