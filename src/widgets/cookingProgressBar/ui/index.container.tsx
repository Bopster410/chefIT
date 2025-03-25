'use client';

import { GlobalContext } from '@/app/providers/globalProvider';
import { useContext } from 'react';
import { CookingProgressBar } from './index.compoent';

export const CookingProgressBarContainer = () => {
    const {
        isCooking,
        nextStep,
        prevStep,
        recipeId,
        recipeName,
        currentStep,
        totalSteps,
        endCooking,
    } = useContext(GlobalContext);

    if (
        !nextStep ||
        !prevStep ||
        !recipeId ||
        !currentStep ||
        !recipeName ||
        !totalSteps ||
        !currentStep.description ||
        !endCooking ||
        !currentStep.number
    )
        return;

    if (!(isCooking && isCooking())) return;

    return (
        <CookingProgressBar
            name={recipeName}
            id={recipeId}
            totalSteps={totalSteps}
            currentStep={{
                number: currentStep.number,
                step: currentStep.description,
                length: currentStep.time,
            }}
            nextStep={nextStep}
            prevStep={prevStep}
            endCooking={endCooking}
        />
    );
};
