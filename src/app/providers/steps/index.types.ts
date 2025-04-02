export interface StepsStore {
    recipeId: number | null;
    recipeName: string | null;
    totalSteps: number | null;
    currentStep: {
        number: number | null;
        description: string | null;
        time: number | null;
    } | null;
    nextStep: (() => void) | null;
    prevStep: (() => void) | null;
    startCooking:
        | ((id: number, newTotalSteps: number, name: string) => void)
        | null;
    endCooking: (() => void) | null;
    isCooking: (() => boolean) | null;
    isFristStep: (() => boolean) | null;
    isLastStep: (() => boolean) | null;
}
