import { ChefbookRecipeContainer } from '@/pagesss/chefbookRecipe';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    return <ChefbookRecipeContainer id={id} />;
}
