import { CollectionsSliderContainer } from '@/widgets/collectionsSlider/ui/index.container';
import { Navbar } from '@/widgets/navbar';
import { SearchBarContainer } from '@/widgets/searchBar';
import { FunctionComponent } from 'react';

export const HomePage: FunctionComponent = () => {
    return (
        <>
            <div className='sticky top-0 z-30 bg-white'>
                <Navbar />
            </div>
            <div className='w-full'>
                <SearchBarContainer query='' />
            </div>
            <div className='mb-3'>
                <CollectionsSliderContainer />
            </div>
        </>
    );
};
