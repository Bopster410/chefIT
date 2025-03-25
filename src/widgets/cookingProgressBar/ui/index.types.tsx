export interface Props {
    name: string;
    id: number;
    currentStep: {
        number: number;
        step: string;
        length: number | null;
    };
    totalSteps: number;
    nextStep: () => void;
    prevStep: () => void;
    endCooking: () => void;
}
