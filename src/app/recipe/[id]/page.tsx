import { getRecipeData } from '@/entities/recipe/api';
import { RecipePage } from '@/pages/recipe/ui';

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const recipe = (await getRecipeData(id)).data;
    return <RecipePage recipe={recipe} />;
}
