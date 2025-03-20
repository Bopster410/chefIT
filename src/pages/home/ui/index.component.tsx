import { Navbar } from '@/shared/uikit/navbar/ui';
import { RecipesFeedContainer } from '@/widgets/recipesFeed';

export const HomePage = () => {
    return (
        <div className=' bg-white rounded-t-4xl h-full px-4 py-8'>
            <Navbar />
            <RecipesFeedContainer />
        </div>
    );
};
