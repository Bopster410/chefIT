import { RecipeCard, Recipe } from '@/entities/recipe';
import { FunctionComponent } from 'react';

// TODO: separate recipe props from response json type
export const RecipesFeed: FunctionComponent<{ recipes: Recipe[] }> = ({
    recipes,
}) => {
    return (
        <div className='grid grid-cols-2 mobile:grid-cols-3 gap-3'>
            {recipes &&
                recipes.map(({ id, name, description, img }) => (
                    <RecipeCard
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        image={img}
                    />
                ))}
        </div>
    );
};
