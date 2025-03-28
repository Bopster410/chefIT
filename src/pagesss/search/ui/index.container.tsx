'use client';
import { MouseEvent, useEffect, useState } from 'react';
import {
    getRecipesFeed,
    getRecipesSearch,
    getSearchSuggestions,
    Recipe,
} from '@/entities/recipe/api';
import { SearchPage } from './index.component';
import { SelectedFilters } from '@/entities/recipe/api/index.types';
import useInput from '@/widgets/searchBar/api';

export function SearchPageContainer() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [filters, setFilters] = useState<SelectedFilters>();
    const [query, handleQueryChange] = useInput('');

    useEffect(() => {
        const input = document.querySelector<HTMLInputElement>('#search-input');
        if (input) {
            input.focus();
        }
    }, []);

    function searchRecipes(query?: string, filters?: SelectedFilters) {
        if (query === undefined || query === '') {
            getRecipesFeed(10).then((recipes) => {
                setRecipes(recipes.Data);
            });
        } else {
            getRecipesSearch(query, filters ? filters : null)
                .then((recipes) => {
                    setRecipes(recipes.Data.recipes);
                })
                .catch(() => setRecipes([]));
        }
    }

    function getSuggestions(query?: string) {
        if (query === undefined || query === '') {
            setSuggestions([]);
        } else {
            getSearchSuggestions(query)
                .then((suggestions) => {
                    if (!suggestions.Data.suggestions)
                        throw new Error('no suggestions');
                    setSuggestions(suggestions.Data.suggestions);
                })
                .catch(() => {
                    setSuggestions([]);
                });
        }
    }

    function handleSearch(params?: {
        query?: string;
        filters?: SelectedFilters;
    }) {
        searchRecipes(params?.query, params?.filters);
        getSuggestions(params?.query);
    }

    function handleSuggestionClick(event: MouseEvent<HTMLDivElement>) {
        const chosenSuggestion = event?.currentTarget.textContent;
        if (chosenSuggestion) {
            handleQueryChange({
                target: { value: chosenSuggestion },
            } as React.ChangeEvent<HTMLInputElement>);
            setSuggestions([]);
        }
    }

    function handleApplyFilters(selectedFilters: SelectedFilters | undefined) {
        setFilters(selectedFilters);
    }

    return (
        <SearchPage
            filters={filters}
            suggestions={suggestions}
            handleSearch={handleSearch}
            recipes={recipes}
            handleClick={handleSuggestionClick}
            onApplyFilters={handleApplyFilters}
            query={query}
            handleQueryChange={handleQueryChange}
        />
    );
}
