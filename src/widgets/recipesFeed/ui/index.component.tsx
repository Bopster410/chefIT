import { RecipeCard } from '@/entities/recipe';
import { Recipe } from '@/entities/recipe/api/index.types';
import { FunctionComponent } from 'react';

export const RecipesFeed: FunctionComponent<{recipes: Recipe[]}> = ({ recipes }) => {
    return (
        <div className='flex flex-col space-y-2'>
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    {...recipe}
                />
            ))}
        </div>
    );
};
