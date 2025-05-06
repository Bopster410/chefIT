'use client';

import { FunctionComponent } from 'react';
import { StepsContext } from '@/app/providers/steps';
import { useContext } from 'use-context-selector';
import { BackButton } from '@/features/backButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

export const RecipeHeader: FunctionComponent<{ id: number }> = ({ id }) => {
    const { recipeName, isCooking, recipeId } = useContext(StepsContext);

    const cookingState =
        !!isCooking && isCooking()
            ? recipeId === id
                ? 'cooking'
                : 'other'
            : 'none';
    return cookingState === 'cooking' ? (
        <div className='flex items-center justify-between gap-4 py-4 pe-4 sticky top-0 bg-white'>
            {/* TODO перенести в лэйаут как-то */}
            <BackButton
                color='white'
                size='sm'
            >
                <ArrowBackIcon />
            </BackButton>
            <div className='line-clamp-1 font-bold'>{recipeName}</div>
        </div>
    ) : (
        <div className='absolute top-4 right-4 z-10'>
            <BackButton
                circle
                color='white'
                className='shadow-2xl shadow-black'
            >
                <CloseIcon />
            </BackButton>
        </div>
    );
};
