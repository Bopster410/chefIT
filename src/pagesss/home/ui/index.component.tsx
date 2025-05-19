import { CollectionsSliderContainer } from '@/widgets/collectionsSlider/ui/index.container';
import { Navbar } from '@/widgets/navbar';
import { SearchBarContainer } from '@/widgets/searchBar';
import { FunctionComponent } from 'react';

export const HomePage: FunctionComponent = () => {
    return (
        <>
            <Navbar />
            <div className='w-full'>
                <SearchBarContainer query='' />
            </div>
            <CollectionsSliderContainer />
        </>
    );
};
