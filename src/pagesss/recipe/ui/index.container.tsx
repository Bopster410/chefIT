'use client';

import { GlobalContext } from '@/app/providers/globalProvider';
import { FunctionComponent, useContext } from 'react';
import { ContainerProps } from './index.types';
import { RecipePage } from './index.component';
import { TimersContext } from '@/app/providers/timers';

export const RecipePageContainer: FunctionComponent<ContainerProps> = ({
    id,
    steps,
    name,
    ...props
}) => {
    const {
        currentStep,
        startCooking,
        prevStep,
        nextStep,
        endCooking,
        isCooking,
        recipeId,
    } = useContext(GlobalContext);

    const { addTimer, timers, clearTimersLocally } = useContext(TimersContext);

    return (
        <RecipePage
            id={id}
            name={name}
            steps={steps}
            {...props}
            startCooking={() => {
                if (startCooking) startCooking(id, steps.length, name);
            }}
            nextStep={() => {
                if (nextStep) nextStep();
            }}
            prevStep={() => {
                if (prevStep) prevStep();
            }}
            endCooking={() => {
                if (endCooking && clearTimersLocally) {
                    endCooking();
                    clearTimersLocally();
                }
            }}
            timerSecondsLeft={
                currentStep?.number &&
                timers &&
                (currentStep?.number in timers
                    ? timers[currentStep.number].number
                    : undefined)
            }
            currentStep={
                !!currentStep
                    ? {
                          number: currentStep.number ?? 0,
                          step: currentStep.description ?? '',
                          length: !!currentStep.time
                              ? { number: currentStep.time, unit: 's' }
                              : null,
                      }
                    : null
            }
            cookingState={
                !!isCooking && isCooking()
                    ? recipeId === id
                        ? 'cooking'
                        : 'other'
                    : 'none'
            }
            addTimer={() => {
                if (
                    !currentStep?.number ||
                    !currentStep.description ||
                    !currentStep.time ||
                    !addTimer
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
