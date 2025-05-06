'use client';

import { FunctionComponent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Props } from './index.types';
import { Button } from '../../button';

export const HeartButton: FunctionComponent<Props> = ({ isLiked, onClick }) => {
    return (
        <Button
            onClick={onClick}
            size='sm'
            color='gray'
            circle
            className='text-lg z-50'
        >
            {isLiked ? (
                <FavoriteIcon
                    fontSize='inherit'
                    className='text-saffron-500'
                />
            ) : (
                <FavoriteBorderIcon
                    fontSize='inherit'
                    className='text-gray-500'
                />
            )}
        </Button>
    );
};
