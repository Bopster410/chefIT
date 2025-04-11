import { Navbar } from '@/widgets/navbar';
import { RecipesFeedContainer } from '@/widgets/recipesFeed';
import { SearchBarContainer } from '@/widgets/searchBar';

export const HomePage = () => {
    return (
        <div className=' bg-white rounded-t-4xl h-full px-4 py-8'>
            <Navbar />
            <div className='w-full'>
                <SearchBarContainer
                    haveSuggestions={false}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    filters={undefined}
                    query=''
                />
            </div>
            <RecipesFeedContainer />
        </div>
    );
};
