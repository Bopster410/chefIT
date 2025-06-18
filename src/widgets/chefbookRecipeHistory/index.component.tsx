'use client';

import { RecipeDetailedChefbook } from '@/entities/recipe/api/index.types';
import { RecipeDescription } from '@/entities/recipe/ui';
import { Button } from '@/shared/uikit/button';
import {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { ErrorBoundary } from 'react-error-boundary';
import { WithLoader } from '@/shared/uikit/withLoader/ui/index.component';
import { QueryTextArea } from './queryTextArea';
import { Blockquote } from '@/shared/uikit/blockquote';
import { useDrag } from '@use-gesture/react';

interface Props {
    versions: RecipeDetailedChefbook[];
    mainVersion: number;
    setMain: (id: number) => void;
    onNewVersion: (id: number, query: string) => void;
    isLoading?: boolean;
}

export const ChefbookRecipeHistory: FunctionComponent<Props> = ({
    versions,
    setMain,
    mainVersion,
    onNewVersion,
    isLoading,
}) => {
    const [currentVersionInd, setCurrentVersionInd] = useState(0);
    const [withError, setWithError] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const currentVersion = versions[currentVersionInd];

    useEffect(() => {
        const handleSubmit = (event: Event) => {
            event.preventDefault();
            const value = inputRef.current?.value;

            if (!value) return;
            onNewVersion(currentVersion.version, value);
        };
        const formCurrent = ref.current;

        formCurrent?.addEventListener('submit', handleSubmit);

        return () => formCurrent?.removeEventListener('submit', handleSubmit);
    }, [currentVersion.version, onNewVersion]);

    const setNext = useCallback(() => {
        if (currentVersionInd === versions.length - 1) return;
        setCurrentVersionInd((value) => value + 1);
    }, [currentVersionInd, versions.length]);

    const setPrev = useCallback(() => {
        if (currentVersionInd === 0) return;
        setCurrentVersionInd((value) => value - 1);
    }, [currentVersionInd]);

    const bind = useDrag(({ swipe: [xSwipe] }) => {
        if (xSwipe > 0) setPrev();
        if (xSwipe < 0) setNext();
    });

    return !currentVersion ? (
        <div>Что-то пошло не так</div>
    ) : (
        <div className='relative px-2.5'>
            <div className='mb-8 relative'>
                {currentVersionInd > 0 && (
                    <div className='absolute not-mobile:hidden left-0 top-0 bottom-0 w-8 z-10'>
                        <div
                            onClick={setPrev}
                            className='h-full hover:bg-radial-[at_0%_50%] from-gray-200 to-[#FFFFFF00] to-50% flex items-center justify-end text-gray-500 hover:text-gray-600 hover:cursor-pointer'
                        >
                            <ArrowBackIosNewIcon fontSize='small' />
                        </div>
                    </div>
                )}
                {currentVersionInd < versions.length - 1 && (
                    <div className='absolute not-mobile:hidden right-0 top-0 bottom-0 z-10 w-8'>
                        <div
                            onClick={setNext}
                            className='h-full hover:bg-radial-[at_100%_50%] from-gray-200 to-[#FFFFFF00] to-50% flex items-center text-gray-500 hover:text-gray-600 hover:cursor-pointer'
                        >
                            <ArrowForwardIosIcon fontSize='small' />
                        </div>
                    </div>
                )}
                <div
                    className='px-2 mobile:px-10'
                    // style={{ touchAction: 'none' }}
                    {...bind()}
                >
                    <ErrorBoundary
                        resetKeys={[currentVersionInd]}
                        fallback={<div>Что-то пошло не так</div>}
                        onError={() => {
                            setWithError(true);
                        }}
                        onReset={() => {
                            setWithError(false);
                        }}
                    >
                        <RecipeDescription
                            name={currentVersion.name}
                            description={currentVersion.description}
                            cookingTime={currentVersion.cookingTimeMinutes}
                            servings={currentVersion.servingsNum}
                            ingredients={currentVersion.ingredients}
                            steps={currentVersion.steps}
                        />
                    </ErrorBoundary>
                </div>
            </div>
            <div className='px-2.5'>
                {currentVersion.query && (
                    <Blockquote>«{currentVersion.query}»</Blockquote>
                )}
                <Button
                    size='sm'
                    type='submit'
                    variant={
                        mainVersion === currentVersion.version
                            ? 'normal'
                            : 'outline'
                    }
                    color={
                        mainVersion === currentVersion.version
                            ? 'saffron'
                            : 'gray'
                    }
                    disabled={
                        mainVersion === currentVersion.version || withError
                    }
                    onClick={() => {
                        setMain(currentVersion.version);
                    }}
                >
                    <div className='flex gap-0.5 text-sm items-center'>
                        {mainVersion === currentVersion.version ? (
                            <>
                                <StarOutlineOutlinedIcon fontSize='small' />{' '}
                                Основная версия
                            </>
                        ) : (
                            <>
                                <StarOutlineOutlinedIcon fontSize='small' />{' '}
                                Сделать основной
                            </>
                        )}
                    </div>
                </Button>
            </div>
            <div className='sticky w-full bottom-0 bg-white mt-3 p-2.5'>
                <form
                    ref={ref}
                    className='flex-1 mb-0.5'
                >
                    {!withError && (
                        <div className='flex rounded-lg'>
                            <WithLoader
                                isLoading={isLoading ?? false}
                                loader={
                                    <QueryTextArea
                                        className='w-full'
                                        value={inputRef.current?.value}
                                        disabled
                                        isLoading
                                        maxRows={4}
                                    />
                                }
                            >
                                <QueryTextArea
                                    className='w-full outline-0'
                                    inputRef={inputRef}
                                    placeholder='Добавь в рецепт...'
                                    maxRows={4}
                                />
                            </WithLoader>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
