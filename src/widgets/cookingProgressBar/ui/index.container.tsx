'use client';

import { StepsContext } from '@/app/providers/steps';
import { useContext } from 'use-context-selector';
import { CookingProgressBar } from './index.compoent';
import { TimersContext } from '@/app/providers/timers';

export const CookingProgressBarContainer = () => {
    const {
        isCooking,
        nextStep,
        prevStep,
        recipeId,
        isGenerated,
        recipeName,
        currentStep,
        totalSteps,
        endCooking,
    } = useContext(StepsContext);

    const { timers, addTimer, clearTimersLocally, finishTimer } =
        useContext(TimersContext);

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
        !clearTimersLocally ||
        !finishTimer
    )
        return;

    if (!(isCooking && isCooking())) return;

    return (
        <CookingProgressBar
            name={recipeName}
            id={recipeId}
            totalSteps={totalSteps}
            isGenerated={isGenerated ?? false}
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
