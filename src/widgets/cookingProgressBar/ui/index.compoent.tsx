import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import Link from 'next/link';

export const CookingProgressBar: FunctionComponent<Props> = ({
    id,
    name,
    currentStep: { number, step, length },
    nextStep,
    prevStep,
    totalSteps,
    endCooking,
}) => {
    return (
        <div className='fixed bottom-0 w-[inherit] p-4 bg-white shadow-status-bar flex justify-between'>
            {number > 1 && (
                <Button
                    color='gray'
                    onClick={prevStep}
                >
                    назад
                </Button>
            )}
            <div className='flex flex-col'>
                <Link
                    href={`/recipe/${id}`}
                    className='font-bold'
                >
                    {name}
                </Link>
                <div className='flex gap-2'>
                    <span>{number}</span>
                    <span className='flex-1'>{step}</span>
                </div>
            </div>
            <Button
                color='gray'
                onClick={number === totalSteps ? endCooking : nextStep}
            >
                {number === totalSteps ? 'завершить' : 'далее'}
            </Button>
        </div>
    );
};
