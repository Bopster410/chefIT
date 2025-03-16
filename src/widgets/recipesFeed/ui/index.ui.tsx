'use client';

import { RecipeCard } from '@/entities/recipe';
import { FunctionComponent } from 'react';

export const RecipesFeed: FunctionComponent<{
    recipes: { id: number; name: string; description: string; image: string }[];
}> = ({ recipes }) => {
    return (
        <div className='flex flex-col space-y-2'>
            {recipes.map(({ id, name, description, image }) => (
                <RecipeCard
                    key={id}
                    id={id}
                    name={name}
                    description={description}
                    image={image}
                />
            ))}
        </div>
    );
};
