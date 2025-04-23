import { getChefbookRecipeHistory } from '@/entities/recipe/api';
import { RecipeDetailedChefbook } from '@/entities/recipe/api/index.types';
import { FunctionComponent } from 'react';
import { ChefbookRecipeHistory } from './index.component';

export const ChefbookRecipeHistoryContainer: FunctionComponent<{
    onMainVersionChange: (newRecipeData: RecipeDetailedChefbook) => void;
    mainVersion: number;
}> = ({ onMainVersionChange, mainVersion }) => {
    const versions = getChefbookRecipeHistory(1).Data;
    return (
        <ChefbookRecipeHistory
            onNewVersion={() => {}}
            versions={versions.versions}
            setMain={(id: number) => onMainVersionChange(versions.versions[id])}
            mainVersion={mainVersion}
        />
    );
};
