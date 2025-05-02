'use client';

import { RecipeDetailedChefbook } from '@/entities/recipe/api/index.types';
import { RecipeDescription } from '@/entities/recipe/ui';
import { Button } from '@/shared/uikit/button';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TextArea } from '@/shared/uikit/textArea';

interface Props {
    versions: RecipeDetailedChefbook[];
    mainVersion: number;
    setMain: (id: number) => void;
    onNewVersion: (id: number, query: string) => void;
}

export const ChefbookRecipeHistory: FunctionComponent<Props> = ({
    versions,
    setMain,
    mainVersion,
    onNewVersion,
}) => {
    const [currentVersionInd, setCurrentVersionInd] = useState(0);
    const ref = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const currentVersion = versions[currentVersionInd];

    useEffect(() => {
        ref.current?.addEventListener('submit', (event) => {
            event.preventDefault();
            const value = inputRef.current?.value;

            if (!value) return;
            onNewVersion(currentVersion.version, value);
        });
    });

    return !currentVersion ? (
        <div>Что-то пошло не так</div>
    ) : (
        <div className='relative'>
            <div className='border-2 border-gray-500 rounded-lg bg-gray-100 p-1.5 mobile:px-2.5 mobile:py-2 sticky top-0 z-10'>
                «{currentVersion.query}»
            </div>
            <div className='px-4 mobile:px-8'>
                <RecipeDescription
                    name={currentVersion.name}
                    description={currentVersion.description}
                    cookingTime={currentVersion.cookingTimeMinutes}
                    servings={currentVersion.servingsNum}
                    ingredients={currentVersion.ingredients}
                    steps={currentVersion.steps}
                />
            </div>
            <div className='sticky w-full bottom-0 bg-white mt-3'>
                <form
                    ref={ref}
                    className='flex-1'
                >
                    <div className='flex rounded-lg mb-3 p-2.5 bg-gray-100'>
                        <TextArea
                            className='w-full outline-0'
                            inputRef={inputRef}
                            placeholder='Добавь в рецепт...'
                            minRows={2}
                            maxRows={4}
                        />
                        <Button
                            size='sm'
                            type='submit'
                        >
                            <KeyboardReturnIcon sx={{ height: '20px' }} />
                        </Button>
                    </div>
                </form>
                <div className='flex gap-1'>
                    {currentVersionInd > 0 && (
                        <Button
                            onClick={() => {
                                if (currentVersionInd === 0) return;
                                setCurrentVersionInd((value) => value - 1);
                            }}
                        >
                            <ArrowBackIosNewIcon />
                        </Button>
                    )}
                    <Button
                        color='saffron'
                        className='w-full'
                        disabled={mainVersion === currentVersion.version}
                        onClick={() => {
                            setMain(currentVersionInd);
                        }}
                    >
                        Выбрать главной
                    </Button>
                    {currentVersionInd < versions.length - 1 && (
                        <Button
                            onClick={() => {
                                if (currentVersionInd === versions.length - 1)
                                    return;
                                setCurrentVersionInd((value) => value + 1);
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
