'use client';

import { useCallback, useState } from 'react';

export function useStep() {
    const [number, setNumber] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [time, setTime] = useState<number | null>(null);
    const [totalSteps, setTotalSteps] = useState<number | null>(null);

    const setStep = useCallback(
        (stepNumber: number, stepDescription: string, stepTime?: number) => {
            if (
                stepNumber !== null &&
                stepNumber > 0 &&
                stepNumber <= (totalSteps ?? stepNumber)
            )
                setNumber(stepNumber);

            if (stepDescription !== null) setDescription(stepDescription);

            if (stepTime) setTime(stepTime);
            if (!stepTime) setTime(null);
        },
        [totalSteps]
    );

    const clear = useCallback(() => {
        setTotalSteps(null);
        setNumber(null);
        setDescription(null);
        setTime(null);
    }, []);

    const initStep = useCallback(
        (initDescription: string, totalSteps: number, initTime?: number) => {
            if (totalSteps < 1) {
                clear();
                return;
            }

            setTotalSteps(totalSteps);
            setStep(1, initDescription, initTime);
        },
        [clear, setStep]
    );

    const isFrist = useCallback(() => number === 1, [number]);

    const isLast = useCallback(
        () => number === totalSteps,
        [number, totalSteps]
    );

    return {
        number,
        description,
        time,
        totalSteps,
        initStep,
        setStep,
        clear,
        isFrist,
        isLast,
        setTotalSteps: (newTotal: number) => setTotalSteps(newTotal),
    };
}

export { CookingRecipe } from './ui';
export type { CookingRecipeProps } from './ui';
