import { SearchBarContainer } from '@/widgets/searchBar';
import { Props } from './index.types';
import { FunctionComponent, useState } from 'react';
import { Suggestions } from '@/widgets/searchSuggestions';
import { Navbar } from '@/widgets/navbar';
import { FiltersSideBarContainer } from '@/widgets/filtersSideBar/ui/index.container';
import { Button } from '@/shared/uikit/button';
import { CurrentFiltersChipsContainer } from '@/widgets/currentFiltersChips/ui/index.container';
import { RecipesFeed } from '@/widgets/recipesFeed';

export const SearchPage: FunctionComponent<Props> = ({
    handleSearch,
    recipes,
    suggestions,
    handleClick,
    query,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <FiltersSideBarContainer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <div className='bg-white rounded-t-4xl h-full px-4 py-8'>
                <Navbar />
                <Button
                    onClick={() => setIsOpen(true)}
                    color='gray'
                    className='mb-2'
                >
                    Открыть фильтры
                </Button>
                <CurrentFiltersChipsContainer />
                <SearchBarContainer
                    handleSearch={handleSearch}
                    query={query}
                />
                {suggestions.length !== 0 && (
                    <Suggestions
                        handleClick={handleClick}
                        suggestions={suggestions}
                    />
                )}

                <RecipesFeed recipes={recipes} />
            </div>
        </>
    );
};
