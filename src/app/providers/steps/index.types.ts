import { startRecipe } from '@/entities/recipe';

export interface StepsStore {
    recipeId: number | null;
    recipeName: string | null;
    totalSteps: number | null;
    isGenerated: boolean | null;
    currentStep: {
        number: number | null;
        description: string | null;
        time: number | null;
    } | null;
    nextStep: (() => void) | null;
    prevStep: (() => void) | null;
    startCooking:
        | ((
              id: number,
              newTotalSteps: number,
              name: string,
              isGenerated: boolean,
              request?: typeof startRecipe
          ) => void)
        | null;
    endCooking: (() => void) | null;
    isCooking: (() => boolean) | null;
    isFristStep: (() => boolean) | null;
    isLastStep: (() => boolean) | null;
}
