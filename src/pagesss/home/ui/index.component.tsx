import { Navbar } from '@/shared/uikit/navbar/ui';
import { RecipesFeedContainer } from '@/widgets/recipesFeed';
import { SearchBarContainer } from '@/widgets/searchBar';

export const HomePage = () => {
    return (
        <div className=' bg-white rounded-t-4xl h-full px-4 py-8'>
            <Navbar />
            <div className='w-[200px] ml-auto mr-auto'>
                <SearchBarContainer haveSuggestions={false} filters={undefined} query=''  />
            </div>
            <RecipesFeedContainer />
        </div>
    );
};
