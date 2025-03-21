import { RecipeCard, Recipe } from '@/entities/recipe';
import { FunctionComponent } from 'react';

// TODO: separate recipe props from response json type
export const RecipesFeed: FunctionComponent<{ recipes: Recipe[] }> = ({
    recipes,
}) => {
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
