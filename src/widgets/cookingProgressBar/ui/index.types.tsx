export interface Props {
    name: string;
    id: number;
    currentStep: {
        number: number;
        step: string;
        length?: number;
    };
    timerSecondsLeft?: number;
    totalSteps: number;
    isGenerated?: boolean;
    nextStep: () => void;
    prevStep: () => void;
    endCooking: () => void;
    addTimer: () => void;
}
