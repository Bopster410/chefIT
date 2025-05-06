import { HomePage } from '@/pagesss/home';
import { CookingProgressBarContainer } from '@/widgets/cookingProgressBar/ui/index.container';
import { FastFilters } from '@/widgets/fastFilters';
import { RecipesFeedContainer } from '@/widgets/recipesFeed';

export const dynamic = 'force-dynamic'

export default async function Page() {
    return (
        <>
            <div className=' bg-white mobile:rounded-t-4xl h-full px-4 py-8'>
                <HomePage />
                <FastFilters />
                <RecipesFeedContainer />
            </div>
            <CookingProgressBarContainer />
        </>
    );
}
