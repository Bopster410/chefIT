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
        <div className='bg-white h-full '>
            {cookingState === 'cooking' && currentStep ? (
                <div className='flex w-full gap-2 mt-6'>
                    <div className='flex gap-4 w-full flex-col mobile:flex-row'>
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

                            <div className='flex w-full justify-between gap-10 mt-6 flex-col-reverse mobile:flex-row'>
                                {currentStep.number !== totalSteps && (
                                    <Button
                                        onClick={endCooking}
                                        color='gray'
                                    >
                                        завершить
                                    </Button>
                                )}
                                <div className='flex gap-4 w-full mobile:justify-end'>
                                    {currentStep.number !== 1 && (
                                        <Button
                                            onClick={prevStep}
                                            color='gray'
                                            className='w-full mobile:w-auto'
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
                                        className={`w-full mobile:w-auto`}
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
