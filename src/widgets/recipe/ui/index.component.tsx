import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import { RecipeDescription } from '@/entities/recipe';
import { CookingRecipe } from '@/features/recipeSteps';

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
}) => {
    return (
        <div className='bg-white h-full '>
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
                                onClick={startCooking}
                                color='saffron'
                                className='w-full'
                            >
                                Готовить
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
