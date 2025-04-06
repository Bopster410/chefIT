import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import { formatSeconds } from '@/entities/timer/lib';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import { TimerContainer } from '@/entities/timer/ui/index.container';
import Image from 'next/image';

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
}) => {
    const totalSteps = steps.length;

    return (
        <div className='bg-white rounded-t-4xl h-full pt-10 px-8'>
            {cookingState === 'cooking' && currentStep ? (
                <>
                    <div className='flex w-full gap-2 mt-6'>
                        <div className='flex gap-4 w-full pe-16'>
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
                                                        currentStep.length
                                                            ?.number
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

                                <div className='flex w-full justify-between gap-2 mt-6'>
                                    {currentStep.number !== totalSteps && (
                                        <Button
                                            onClick={endCooking}
                                            color='gray'
                                        >
                                            завершить
                                        </Button>
                                    )}
                                    <div className='flex gap-4 w-full justify-end'>
                                        {currentStep.number !== 1 && (
                                            <Button
                                                onClick={prevStep}
                                                color='gray'
                                            >
                                                назад
                                            </Button>
                                        )}
                                        <Button
                                            onClick={
                                                currentStep.number ===
                                                totalSteps
                                                    ? endCooking
                                                    : nextStep
                                            }
                                            color='gray'
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
                </>
            ) : (
                <>
                    <div className="relative w-full h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
                    <Image 
                        src={img}
                        alt="recipe"
                        fill
                        className="object-cover"
                    />
                    </div>
                    <div className='text-[32px] font-bold'>{name}</div>
                    <div className='text-[16px]'>{description}</div>
                    <div className='text-[20px] font-bold mt-4 mb-2'>
                        Подготовка
                    </div>
                    {ingredients.map(
                        ({ id, name, measures: { amount, unit } }) => (
                            <div
                                key={id}
                                className='flex justify-between relative'
                            >
                                <div className='bg-white pr-1 relative z-10'>
                                    {name}
                                </div>
                                <div className='bg-white pl-1 relative z-10'>{`${amount} ${unit}`}</div>
                                <div className='absolute left-0 right-0 border-b border-dotted border-gray-400 bottom-1 -z-0'></div>
                            </div>
                        )
                    )}
                    <div className='text-[20px] font-bold mt-4 mb-2'>
                        Приготовление
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        {steps.map(({ number, step, length }) => (
                            <div
                                key={number}
                                className='flex gap-4'
                            >
                                <div>
                                    <div className='font-bold border rounded-full size-6 flex justify-center items-center'>
                                        {number}
                                    </div>
                                </div>
                                <div>
                                    <div>{step}</div>
                                    {!!length && (
                                        <div className='flex items-end gap-2'>
                                            <AccessTimeFilledOutlinedIcon />
                                            {`${length.number} ${length.unit}`}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
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
