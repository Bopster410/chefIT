'use client';

import {
    endRecipe,
    setNextStep,
    setPrevStep,
    startRecipe,
    getCurrentCookingRecipe,
    // getRecipeData,
} from '@/entities/recipe';
import { useStep } from '@/features/recipeSteps';
import { STATUS } from '@/shared/api';
import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { FunctionComponent, PropsWithChildren } from 'react';
import { timeToSeconds } from '@/entities/timer';
import { StepsStore } from './index.types';

const StepsContext = createContext<StepsStore>({
    currentStep: null,
    nextStep: null,
    prevStep: null,
    startCooking: null,
    endCooking: null,
    isCooking: null,
    recipeId: null,
    recipeName: null,
    totalSteps: null,
    isFristStep: null,
    isLastStep: null,
});

export const StepsProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [id, setId] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);

    const {
        number,
        description,
        time,
        setStep,
        initStep,
        clear,
        setTotalSteps,
        totalSteps,
        isFrist,
        isLast,
    } = useStep();

    const init = async () => {
        const { Data, Status } = await getCurrentCookingRecipe();

        if (Status !== STATUS.SUCCESS || !Data) return;

        // const {
        //     Data: { steps },
        // } = await getRecipeData(Data.id);

        // setTotalSteps(steps.length);
        setTotalSteps(10);
        setStep(
            Data.currentStep.number,
            Data.currentStep.step,
            Data.currentStep.length
                ? timeToSeconds(
                      Data.currentStep.length.number,
                      Data.currentStep.length.unit
                  )
                : undefined
        );
        setId(Data.id);
        setName(Data.name);
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startCooking = useCallback(
        async (id: number, newTotalSteps: number, name: string) => {
            const { Status, Data } = await startRecipe(id);

            if (Status === STATUS.SUCCESS && Data) {
                initStep(Data.step, newTotalSteps, Data.length?.number);
                setId(id);
                setName(name);
            }
        },
        [initStep]
    );

    const endCooking = useCallback(async () => {
        const { Status } = await endRecipe();

        if (Status === STATUS.SUCCESS) {
            clear();
            setId(null);
            setName(null);
        }
    }, [clear]);

    const nextStep = useCallback(async () => {
        const { Status, Data } = await setNextStep();

        if (Status !== STATUS.SUCCESS || !Data) return;

        setStep(
            Data.number,
            Data.step,
            Data.length
                ? timeToSeconds(Data.length?.number, Data.length?.unit)
                : undefined
        );
    }, [setStep]);

    const prevStep = useCallback(async () => {
        const { Status, Data } = await setPrevStep();

        if (Status === STATUS.SUCCESS && Data)
            setStep(
                Data.number,
                Data.step,
                Data.length
                    ? timeToSeconds(Data.length?.number, Data.length?.unit)
                    : undefined
            );
    }, [setStep]);

    const isCooking = useCallback(() => number !== null, [number]);

    return (
        <StepsContext.Provider
            value={{
                currentStep: {
                    number,
                    description,
                    time,
                },
                nextStep,
                prevStep,
                startCooking,
                endCooking,
                isCooking,
                recipeId: id,
                recipeName: name,
                totalSteps,
                isFristStep: () => isFrist(),
                isLastStep: () => isLast(),
            }}
        >
            {children}
        </StepsContext.Provider>
    );
};

export { StepsContext };
