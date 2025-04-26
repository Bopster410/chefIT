'use client';

import { getChefbookRecipeHistory } from '@/entities/recipe/api';
import { RecipeDetailedChefbook } from '@/entities/recipe/api/index.types';
import { FunctionComponent, useState } from 'react';
import { ChefbookRecipeHistory } from './index.component';

export const ChefbookRecipeHistoryContainer: FunctionComponent<{
    onMainVersionChange: (newRecipeData: RecipeDetailedChefbook) => void;
    mainVersion: number;
    recipeId: number;
}> = ({ onMainVersionChange, mainVersion }) => {
    const [versions, setVersions] = useState<ReturnType<
        typeof getChefbookRecipeHistory
    > | null>(null);

    return (
        <ChefbookRecipeHistory
            onNewVersion={() => {}}
            versions={versions.versions}
            setMain={(id: number) => onMainVersionChange(versions.versions[id])}
            mainVersion={mainVersion}
        />
    );
};
