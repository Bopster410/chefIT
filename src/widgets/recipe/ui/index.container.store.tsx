'use client';

import { StepsContext } from '@/app/providers/steps';
import { FunctionComponent } from 'react';
import { useContext } from 'use-context-selector';
import { ContainerProps } from './index.types';
import { TimersContext } from '@/app/providers/timers';
import { RecipeWithCooking } from './index.component';
import { useUser } from '@/app/providers/userProvider';

export const RecipeWithCookingStoreContainer: FunctionComponent<
    ContainerProps
> = ({ id, steps, name, img, ...props }) => {
    const {
        currentStep,
        startCooking,
        prevStep,
        nextStep,
        endCooking,
        isCooking,
        recipeId,
    } = useContext(StepsContext);

    const { addTimer, timers, clearTimersLocally } = useContext(TimersContext);

    const user = useUser();

    if (currentStep === null) return;

    return (
        <RecipeWithCooking
            id={id}
            name={name}
            steps={steps}
            img={img}
            isLoggedIn={user !== undefined}
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
            currentStep={{
                number: currentStep.number ?? 0,
                step: currentStep.description ?? '',
                ingredients: steps[(currentStep.number ?? 1) - 1].ingredients,
                length: !!currentStep.time
                    ? { number: currentStep.time, unit: 's' }
                    : null,
            }}
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
