'use client';
import { MouseEvent, useEffect, useState } from 'react';
import {
    getRecipesFeed,
    getRecipesSearch,
    getSearchSuggestions,
    searchMock,
} from '@/entities/recipe/api';
import { SearchPage } from './index.component';
import { SelectedFilters } from '@/entities/recipe/api/index.types';
import { useSearchStore } from '@/app/providers/searchProvider/index.store';

export function SearchPageContainer() {
    const recipes = useSearchStore((state) => state.recipes);
    const setRecipes = useSearchStore((state) => state.setRecipes);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);

    useEffect(() => {
        const input = document.querySelector<HTMLInputElement>('#search-input');
        if (input) {
            input.focus();
        }
    }, []);

    function searchRecipes(query?: string, filters?: SelectedFilters) {
        if (query === undefined || query === '') {
            if (filters) setRecipes(searchMock.Data.recipes);
            else
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
            setQuery(chosenSuggestion);
            setSuggestions([]);
        }
    }

    return (
        <SearchPage
            suggestions={suggestions}
            handleSearch={handleSearch}
            recipes={recipes}
            handleClick={handleSuggestionClick}
            query={query}
        />
    );
}
