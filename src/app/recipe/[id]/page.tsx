import { getRecipeData } from '@/entities/recipe/api';
import { RecipePage } from '@/pages/recipe/ui';

export default async function Recipe({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const {
        name,
        description,
        img,
        prepTime,
        cookingTime,
        servingsNum,
        ingredients,
        steps,
    } = getRecipeData(id);
    return (
        <div className='bg-white rounded-t-4xl h-full pt-4 px-4'>
            <RecipePage
                header={name}
                description={description}
                img={img}
                prepTime={prepTime}
                cookingTime={cookingTime}
                servings={servingsNum}
                ingredients={ingredients}
                steps={steps}
            />
        </div>
    );
}
