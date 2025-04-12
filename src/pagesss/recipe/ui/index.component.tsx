import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import { formatSeconds } from '@/entities/timer/lib';
import { TimerContainer } from '@/entities/timer/ui/index.container';
import { RecipeDescription } from '@/entities/recipe/ui';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';

export const RecipePage: FunctionComponent<Props> = ({
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
    prepTime,
    servings,
}) => {
    const totalSteps = steps.length;

    return (
        <div className='bg-white rounded-t-4xl h-full pt-10 px-8'>
            {cookingState === 'cooking' && currentStep ? (
                <div className='flex w-full gap-2 mt-6'>
                    <div className='flex gap-4 w-full flex-col sm:flex-row'>
                        <div>
                            <div className='font-bold border-2 rounded-full size-16 flex justify-center items-center text-4xl'>
                                {currentStep.number}
                            </div>
                        </div>
                        <div className='w-full'>
                            {timerSecondsLeft ? (
                                <TimerContainer
                                    stepNum={currentStep.number}
                                    secondsTotal={timerSecondsLeft}
                                    description={currentStep.step}
                                />
                            ) : (
                                <>
                                    <div className='text-xl pt-3 min-h-16 mb-4'>
                                        {currentStep.step}
                                    </div>
                                    {currentStep.length && (
                                        <div className='text-lg flex gap-6'>
                                            <span className='flex gap-2 items-center'>
                                                <AccessTimeFilledOutlinedIcon />
                                                таймер на{' '}
                                                {formatSeconds(
                                                    currentStep.length?.number
                                                )}
                                            </span>
                                            <Button
                                                size='sm'
                                                color='gray'
                                                onClick={addTimer}
                                            >
                                                Добавить
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className='flex w-full justify-between gap-10 mt-6 flex-col-reverse sm:flex-row'>
                                {currentStep.number !== totalSteps && (
                                    <Button
                                        onClick={endCooking}
                                        color='gray'
                                    >
                                        завершить
                                    </Button>
                                )}
                                <div className='flex gap-4 w-full sm:justify-end'>
                                    {currentStep.number !== 1 && (
                                        <Button
                                            onClick={prevStep}
                                            color='gray'
                                            className='w-full sm:w-auto'
                                        >
                                            назад
                                        </Button>
                                    )}
                                    <Button
                                        onClick={
                                            currentStep.number === totalSteps
                                                ? endCooking
                                                : nextStep
                                        }
                                        color='gray'
                                        className={`w-full sm:w-auto`}
                                    >
                                        {currentStep.number === totalSteps
                                            ? 'завершить'
                                            : 'далее'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <RecipeDescription
                        img={img}
                        name={name}
                        description={description}
                        ingredients={ingredients}
                        healthScore={healthScore}
                        prepTime={prepTime}
                        cookingTime={cookingTime}
                        servings={servings}
                        steps={steps}
                    />
                    {cookingState === 'none' && (
                        <div className='bg-white shadow w-full flex justify-center items-center py-4'>
                            <Button
                                onClick={startCooking}
                                color='gray'
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
