import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';

export const RecipePage: FunctionComponent<Props> = ({
    name,
    description,
    ingredients,
    steps,
    cookingState,
    startCooking,
    nextStep,
    prevStep,
    endCooking,
    currentStep,
}) => {
    const totalSteps = steps.length;

    return (
        <div className='bg-white rounded-t-4xl h-full pt-4 px-4'>
            {cookingState === 'cooking' && currentStep ? (
                <>
                    <div className='flex w-full gap-2'>
                        <span>{currentStep.number}</span>
                        <span className='flex-1'>{currentStep.step}</span>
                    </div>
                    <div className='flex w-full justify-evenly'>
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
                                currentStep.number === totalSteps
                                    ? endCooking
                                    : nextStep
                            }
                            color='gray'
                        >
                            {currentStep.number === totalSteps
                                ? 'завершить'
                                : 'далее'}
                        </Button>
                        <Button
                            onClick={endCooking}
                            color='gray'
                        >
                            X
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    {/* <Image
                src={img}
                alt='recipe'
                fill
            /> */}
                    <div className='text-[32px] font-bold'>{name}</div>
                    <div className='text-[16px]'>{description}</div>
                    <div className='text-[20px] font-bold'>Подготовка</div>
                    {ingredients.map(
                        ({ id, name, measures: { amount, unit } }) => (
                            <div
                                key={id}
                                className='flex justify-between'
                            >
                                <div>{name}</div>
                                <div>{`${amount} ${unit}`}</div>
                            </div>
                        )
                    )}
                    <div className='text-[20px] font-bold'>Приготовление</div>
                    {steps.map(({ number, step, length }) => (
                        <div key={number}>
                            <span className='me-8'>{number}</span>
                            <span>{step}</span>
                            {!!length && <div>{`${length.number} минут`}</div>}
                        </div>
                    ))}
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
