import { getAllCollections, getCollection } from '@/entities/recipe/api';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { RecipesFeed } from '@/widgets/recipesFeed';
import { STATUS } from '@/shared/api';
import { BackButton } from '@/features/backButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const CollectionPage: FunctionComponent<Props> = async ({ id }) => {
    const { Data: CollectionData, Status: CollectionStatus } =
        await getCollection(id, 1);

    const { Data: CollectionsData, Status: CollectionsStatus } =
        await getAllCollections();

    if (CollectionStatus !== STATUS.SUCCESS || !CollectionData)
        return <div>Что-то пошло не так</div>;

    return (
        <div>
            <div className='flex items-center justify-between gap-4 py-4 pe-4 bg-white'>
                <BackButton
                    color='white'
                    size='sm'
                >
                    <ArrowBackIcon />
                </BackButton>
                <div className='truncate font-bold text-lg'>
                    {CollectionsData &&
                        CollectionsStatus === STATUS.SUCCESS &&
                        CollectionsData.find((v) => v.id === id)?.name}
                </div>
            </div>
            <RecipesFeed recipes={CollectionData.recipes} />;
        </div>
    );
};
