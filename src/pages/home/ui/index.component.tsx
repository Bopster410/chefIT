import { Navbar } from '@/shared/uikit/navbar/ui';
import { RecipesFeedContainer } from '@/widgets/recipesFeed';
import { SearchBarContainer } from '@/widgets/searchBar';

export const HomePage = () => {
    return (
        <div className=' bg-white rounded-t-4xl h-full px-4 py-8'>
            <Navbar />
            <SearchBarContainer />
            <RecipesFeedContainer />
        </div>
    );
};
