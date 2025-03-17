import { getRecipeData } from '@/entities/recipe/api';
import { RecipePage } from '@/pages/recipe/ui';

export default async function Recipe({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const recipe = (await getRecipeData(id)).data;
    return (
        <div className='bg-white rounded-t-4xl h-full pt-4 px-4'>
            <RecipePage
                recipe={recipe}
            />
        </div>
    );
}
