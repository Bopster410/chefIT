import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { RecipeWithCookingApiContainer } from '@/widgets/recipe';

export const RecipePage: FunctionComponent<Props> = ({ id }) => {
    return <RecipeWithCookingApiContainer id={id} />;
};
