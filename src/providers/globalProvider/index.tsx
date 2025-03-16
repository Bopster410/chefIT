'use client';

import { createContext, useState } from 'react';

const GlobalContext = createContext<{
    timers: { number: number; description: string }[];
    currentStep: { number: number; description: string; time?: number } | null;
}>({ timers: [], currentStep: null });

import { FunctionComponent, PropsWithChildren } from 'react';
export const GlobalProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [timers, setTimers] = useState<
        { number: number; description: string }[]
    >([]);
    const [currentStep, setCurrentStep] = useState<{
        number: number;
        description: string;
        time?: number;
    } | null>(null);

    return (
        <GlobalContext.Provider
            value={{ timers: timers, currentStep: currentStep }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
