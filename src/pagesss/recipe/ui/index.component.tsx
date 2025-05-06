import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { RecipeWithCookingApiContainer } from '@/widgets/recipe';
import { RecipeHeader } from '@/widgets/recipeHeader';

export const RecipePage: FunctionComponent<Props> = ({ id }) => {
    return (
        <div className='h-full bg-white'>
            <RecipeHeader id={id} />
            <RecipeWithCookingApiContainer id={id} />
        </div>
    );
};
