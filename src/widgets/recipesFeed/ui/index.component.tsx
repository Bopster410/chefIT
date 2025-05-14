import { RecipeWithFavorite } from '@/features/favoriteWrapper';
import { FunctionComponent } from 'react';
import { Props } from './index.types';

// TODO: separate recipe props from response json type
export const RecipesFeed: FunctionComponent<Props> = ({ recipes }) => {
    return (
        <div className='grid grid-cols-2 mobile:grid-cols-3 gap-3 auto-rows-[1fr]'>
            {recipes &&
                recipes.map(
                    ({
                        id,
                        name,
                        description,
                        img,
                        cookingTimeMinutes,
                        isFavorite,
                    }) => (
                        <RecipeWithFavorite
                            id={id}
                            key={id}
                            likedByDefault={isFavorite}
                            link={`recipe/${id}`}
                            name={name}
                            cookingTime={cookingTimeMinutes}
                            description={description}
                            image={img}
                        />
                    )
                )}
        </div>
    );
};
