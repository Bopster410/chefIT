'use client';

import {
    getChefbookRecipeHistory,
    setChefbookRecipeMain,
    updateChefbookRecipeWithQuery,
} from '@/entities/recipe/api';
import { RecipeDetailedChefbook } from '@/entities/recipe/api/index.types';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { ChefbookRecipeHistory } from './index.component';
import { STATUS } from '@/shared/api';

export const ChefbookRecipeHistoryContainer: FunctionComponent<{
    onMainVersionChange: (newRecipeData: RecipeDetailedChefbook) => void;
    mainVersion: number;
    recipeId: number;
}> = ({ onMainVersionChange, mainVersion, recipeId }) => {
    const [versions, setVersions] = useState<RecipeDetailedChefbook[] | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleNewVerion = useCallback(
        (version: number, query: string) => {
            setIsLoading(true);
            updateChefbookRecipeWithQuery(recipeId, version, query)
                .then(({ Status, Data }) => {
                    if (!Data || Status !== STATUS.SUCCESS) return;
                    setVersions((curVersions) => {
                        if (curVersions === null) return [Data];
                        return [...curVersions, Data];
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [recipeId]
    );

    const handleNewMain = useCallback(
        (versionId: number) => {
            setChefbookRecipeMain(recipeId, versionId).then(({ Status }) => {
                if (Status !== STATUS.SUCCESS) return;
                if (versions === null) return;

                const newMainVersion = versions.find(
                    ({ version }) => version === versionId
                );

                if (!newMainVersion) return;
                onMainVersionChange(newMainVersion);
            });
        },
        [onMainVersionChange, recipeId, versions]
    );

    useEffect(() => {
        getChefbookRecipeHistory(recipeId).then(({ Status, Data }) => {
            if (!Data || Status !== STATUS.SUCCESS) return;

            setVersions(Data);
        });
    }, [recipeId]);

    return (
        versions && (
            <ChefbookRecipeHistory
                onNewVersion={handleNewVerion}
                versions={versions}
                setMain={handleNewMain}
                mainVersion={mainVersion}
                isLoading={isLoading}
            />
        )
    );
};
