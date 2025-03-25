import { useState } from 'react';

export function useStep() {
    const [number, setNumber] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [time, setTime] = useState<number | null>(null);
    const [totalSteps, setTotalSteps] = useState<number | null>(null);

    const setStep = (
        stepNumber: number,
        stepDescription: string,
        stepTime?: number
    ) => {
        if (
            stepNumber !== null &&
            stepNumber > 0 &&
            stepNumber <= (totalSteps ?? stepNumber)
        )
            setNumber(stepNumber);

        if (stepDescription !== null) setDescription(stepDescription);

        if (stepTime) setTime(stepTime);
        if (!stepTime) setTime(null);
    };

    const initStep = (
        initDescription: string,
        totalSteps: number,
        initTime?: number
    ) => {
        if (totalSteps < 1) {
            clear();
            return;
        }

        setTotalSteps(totalSteps);
        setStep(1, initDescription, initTime);
    };

    const clear = () => {
        setTotalSteps(null);
        setNumber(null);
        setDescription(null);
        setTime(null);
    };

    const isFrist = () => number === 1;

    const isLast = () => number === totalSteps;

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
