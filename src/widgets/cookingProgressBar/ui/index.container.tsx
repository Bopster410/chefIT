'use client';

import { GlobalContext } from '@/app/providers/globalProvider';
import { useContext } from 'react';
import { CookingProgressBar } from './index.compoent';
import { TimersContext } from '@/app/providers/timers';

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

    const { timers, addTimer, clearTimersLocally } = useContext(TimersContext);

    if (
        !nextStep ||
        !prevStep ||
        !recipeId ||
        !currentStep ||
        !recipeName ||
        !totalSteps ||
        !currentStep.description ||
        !currentStep.number ||
        !endCooking ||
        !addTimer ||
        !timers ||
        !clearTimersLocally
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
                length: currentStep.time ?? undefined,
            }}
            timerSecondsLeft={
                currentStep.number in timers
                    ? timers[currentStep.number].number
                    : undefined
            }
            nextStep={nextStep}
            prevStep={prevStep}
            endCooking={() => {
                endCooking();
                clearTimersLocally();
            }}
            addTimer={() => {
                if (
                    !currentStep.number ||
                    !currentStep.description ||
                    !currentStep.time
                )
                    return;

                addTimer(
                    currentStep.number,
                    currentStep.description,
                    currentStep.time
                );
            }}
        />
    );
};
