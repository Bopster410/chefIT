'use client';

import { RecipeDetailedChefbook } from '@/entities/recipe/api/index.types';
import { RecipeDescription } from '@/entities/recipe/ui';
import { Button } from '@/shared/uikit/button';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { InputField } from '@/shared/uikit/inputField';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface Props {
    versions: RecipeDetailedChefbook[];
    mainVersion: number;
    setMain: (id: number) => void;
    onNewVersion: () => void;
}

export const ChefbookRecipeHistory: FunctionComponent<Props> = ({
    versions,
    setMain,
    mainVersion,
}) => {
    const [currentVersionInd, setCurrentVersionInd] = useState(0);
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        ref.current?.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    });

    return (
        <div className='relative'>
            <RecipeDescription
                name={versions[currentVersionInd].name}
                description={versions[currentVersionInd].description}
                cookingTime={versions[currentVersionInd].cookingTime}
                prepTime={versions[currentVersionInd].prepTime}
                servings={versions[currentVersionInd].servingsNum}
                ingredients={versions[currentVersionInd].ingredients}
                steps={versions[currentVersionInd].steps}
            />
            <div className='flex gap-1'>
                {currentVersionInd > 0 && (
                    <Button
                        onClick={() => {
                            if (currentVersionInd === 0) return;
                            setCurrentVersionInd((value) => value - 1);
                        }}
                    >
                        Назад
                    </Button>
                )}
                {currentVersionInd < versions.length - 1 && (
                    <Button
                        onClick={() => {
                            if (currentVersionInd === versions.length - 1)
                                return;
                            setCurrentVersionInd((value) => value + 1);
                        }}
                    >
                        Далее
                    </Button>
                )}
                {versions[currentVersionInd].versionId !== mainVersion && (
                    <Button
                        color='white'
                        onClick={() => {
                            setMain(currentVersionInd);
                        }}
                    >
                        <StarBorderIcon />
                    </Button>
                )}
            </div>
            <div>версия: {versions[currentVersionInd].versionId}</div>
            <form ref={ref}>
                <div className='flex rounded-lg mb-3 p-2.5 bg-gray-100 '>
                    <InputField
                        className='w-full outline-0'
                        id='search-input'
                        placeholder=''
                    />
                    <Button
                        size='sm'
                        type='submit'
                    >
                        <KeyboardReturnIcon sx={{ height: '20px' }} />
                    </Button>
                </div>
            </form>
        </div>
    );
};
