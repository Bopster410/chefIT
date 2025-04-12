export interface UserRecipe{
    id: number,
    name: string,
    time: number,
}

export interface Props{
    recipes?: UserRecipe[],
    openModal: () => void,
}