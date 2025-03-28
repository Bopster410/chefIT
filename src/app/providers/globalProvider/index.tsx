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
import { createContext, useCallback, useEffect, useState } from 'react';
import { FunctionComponent, PropsWithChildren } from 'react';
import { GlobalStore } from './index.types';
import { timeToSeconds } from '@/entities/timer';

const GlobalContext = createContext<GlobalStore>({
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

export const GlobalProvider: FunctionComponent<PropsWithChildren> = ({
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

        if (Status !== STATUS.SUCCESS) return;

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
            const {
                Status,
                Data: { step, length },
            } = await startRecipe(id);

            if (Status === STATUS.SUCCESS) {
                initStep(step, newTotalSteps, length?.number);
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
        const {
            Status,
            Data: { step, length, number },
        } = await setNextStep();

        if (Status !== STATUS.SUCCESS) return;

        setStep(
            number,
            step,
            length ? timeToSeconds(length?.number, length?.unit) : undefined
        );
    }, [setStep]);

    const prevStep = useCallback(async () => {
        const {
            Status,
            Data: { step, length, number },
        } = await setPrevStep();

        if (Status === STATUS.SUCCESS)
            setStep(
                number,
                step,
                length ? timeToSeconds(length?.number, length?.unit) : undefined
            );
    }, [setStep]);

    const isCooking = useCallback(() => number !== null, [number]);

    return (
        <GlobalContext.Provider
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
        </GlobalContext.Provider>
    );
};

export { GlobalContext };
