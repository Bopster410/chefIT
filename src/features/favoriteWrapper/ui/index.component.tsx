'use client';

import { HeartButton } from '@/shared/uikit/heartButton';
import { FunctionComponent, useState } from 'react';
import { Props } from './index.types';
import { addFavorite, removeFavorite } from '@/entities/recipe/api';
import { RecipeCard } from '@/entities/recipe';
import { STATUS } from '@/shared/api';

export const RecipeWithFavorite: FunctionComponent<Props> = (props) => {
    const [liked, setLiked] = useState(props.likedByDefault || false);

    const addOrRemove = () => {
        if (liked) {
            removeFavorite(props.id).then(({ Status }) => {
                if (Status !== STATUS.SUCCESS) return;
                setLiked(false);
                props.onRemove?.(props.id);
            });
        } else {
            addFavorite(props.id).then(({ Status }) => {
                if (Status !== STATUS.SUCCESS) return;
                setLiked(true);
            });
        }
        setLiked(!liked);
    };

    return (
        <RecipeCard
            slots={{
                favoriteButton: (
                    <>
                        <HeartButton
                            isLiked={liked}
                            onClick={addOrRemove}
                        />
                    </>
                ),
            }}
            {...props}
        />
    );
};
