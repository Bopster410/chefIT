import {
    RecipeFilters,
    SelectedFilters,
} from '@/entities/recipe/api/index.types';

export interface Props {
    isOpen: boolean;
    onClose: () => void;
    filters: RecipeFilters;
    selectedFilters: SelectedFilters;
    onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeRange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onApllySelect: () => void;
    onClear: () => void;
}
