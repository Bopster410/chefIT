import { Step } from '@/entities/recipe';

export interface Props {
    timerSecondsLeft?: number | null;
    steps: Step[];
    currentStep: Step;
    endCooking: () => void;
    nextStep: () => void;
    prevStep: () => void;
    addTimer: () => void;
}
