export const RECIPES_API = {
    getAll: 'recipe/all',
    getById: 'recipe',
    getCookingRecipe: 'recipe',
    search: 'search',
    getSuggestions: 'search/suggest',
    startRecipe: 'recipe/start',
    endRecipe: 'recipe/end',
    nextStep: 'recipe/next',
    prevStep: 'recipe/prev',
    getFilters: 'search/filters',

    getUserRecipes: 'generate/all',
    generateNewRecipe: 'generate/make',

    chefbookHistory: 'generate', // + '[id]/history'
    chefbookUpdate: 'generate', // + '[id]/modern/[versionID]
    chefbookSetMain: 'generate', // + '[id]/main/[versionID]
    chefbookItem: 'generate', // + '[id]'
    startChefbookRecipe: 'generate', // + '[id]/start'
};
