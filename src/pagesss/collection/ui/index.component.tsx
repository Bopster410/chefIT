import { getCollection } from '@/entities/recipe/api';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { RecipesFeed } from '@/widgets/recipesFeed';
import { STATUS } from '@/shared/api';

export const CollectionPage: FunctionComponent<Props> = async ({ id }) => {
    const { Data, Status } = await getCollection(id, 1);
    console.log(Data);

    if (Status !== STATUS.SUCCESS || !Data)
        return <div>Что-то пошло не так</div>;

    return <RecipesFeed recipes={Data.recipes} />;
};
