'use client';

import { FunctionComponent, useState } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import { RecipeDescription } from '@/entities/recipe';
import { CookingRecipe } from '@/features/recipeSteps';
import clsx from 'clsx';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';

export const RecipeWithCooking: FunctionComponent<Props> = ({
    name,
    img,
    description,
    ingredients,
    steps,
    cookingState,
    startCooking,
    nextStep,
    prevStep,
    endCooking,
    currentStep,
    timerSecondsLeft,
    addTimer,
    healthScore,
    cookingTime,
    servings,
    isLoggedIn,
}) => {
    const [alertOpened, setAlertOpened] = useState(false);

    const handleNotLoggedIn = () => {
        setAlertOpened(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpened(false);
    };

    return (
        <div className={clsx('bg-white', cookingState === 'cooking' && 'px-4')}>
            {cookingState === 'cooking' && currentStep ? (
                <CookingRecipe
                    steps={steps}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    endCooking={endCooking}
                    timerSecondsLeft={timerSecondsLeft}
                    addTimer={addTimer}
                    currentStep={currentStep}
                />
            ) : (
                <>
                    <RecipeDescription
                        img={img}
                        name={name}
                        description={description}
                        ingredients={ingredients}
                        healthScore={healthScore}
                        cookingTime={cookingTime}
                        servings={servings}
                        steps={steps}
                    />
                    {cookingState === 'none' && (
                        <div className='bg-white w-full px-4 py-6 sticky bottom-0 z-10'>
                            <Button
                                onClick={() => {
                                    if (isLoggedIn) startCooking();
                                    if (!isLoggedIn) handleNotLoggedIn();
                                }}
                                color='saffron'
                                className='w-full'
                            >
                                Готовить
                            </Button>
                        </div>
                    )}
                    <Snackbar
                        open={alertOpened}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity='error'
                            variant='filled'
                            sx={{ width: '100%' }}
                        >
                            Сначала необходимо войти в аккаунт!
                        </Alert>
                    </Snackbar>
                </>
            )}
        </div>
    );
};
