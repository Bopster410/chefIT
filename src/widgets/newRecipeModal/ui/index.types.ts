export interface Props {
    input: string;
    setInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddIngredient: () => void;
    ingredients: string[];
    onDeleteIngredient: (ingredient: string) => void;
    query: string;
    setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateRecipe: () => void;
    loading: boolean;
    clearInput: () => void;
}
