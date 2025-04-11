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
<<<<<<< HEAD
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    filters={undefined}
=======
>>>>>>> ac90e4fe047067697a2ade3a4c57649c0d8dbc91
                    query=''
                />
            </div>
            <RecipesFeedContainer />
        </div>
    );
};
