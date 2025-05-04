'use client';

import { useEffect, useState } from 'react';
import { FiltersSideBar } from './index.component';
import { filtersMock, getSearchFilters } from '@/entities/recipe/api';
import {
    RecipeFilters,
    SelectedFilters,
} from '@/entities/recipe/api/index.types';
import { useSearchStore } from '@/app/providers/searchProvider/index.store';
import { STATUS } from '@/shared/api';

export function FiltersSideBarContainer({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const onApplyFilters = useSearchStore((state) => state.setFilters);
    const [filters, setFilters] = useState<RecipeFilters>(filtersMock.Data);
    const [selectedFilters, setSelectedFilters] = useState<
        SelectedFilters | undefined
    >(undefined);

    useEffect(() => {
        getSearchFilters().then(({ Data, Status }) => {
            if (Status === STATUS.SUCCESS && Data) setFilters(Data);
        });
    }, []);

    function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedFilters((prev) => ({
            ...(prev || { diet: '', dishType: '', time: filters.time.max }),
            [event.target.name]: event.target.value,
        }));
    }
    function handleChangeRange(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedFilters((prev) => ({
            ...(prev || { diet: '', dishType: '' }),
            time: Number(event.target.value),
        }));
    }
    function handleApplySelect(clear?: boolean) {
        onApplyFilters(clear ? undefined : selectedFilters);
    }

    function handleClear() {
        setSelectedFilters(undefined);
        handleApplySelect(true);
    }

    return (
        <FiltersSideBar
            isOpen={isOpen}
            onClose={onClose}
            filters={filters}
            selectedFilters={
                selectedFilters || {
                    diet: '',
                    dishType: '',
                    time: filters.time.max,
                }
            }
            onChangeSelect={handleChangeSelect}
            onChangeRange={handleChangeRange}
            onApllySelect={handleApplySelect}
            onClear={handleClear}
        />
    );
}
