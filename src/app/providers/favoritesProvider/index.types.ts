// import { Response } from '@/shared/api';

export type FavoritesState = {
    favoriteIds: { [id: string]: boolean };
    // loadingData: Record<string, Promise<Response<unknown>>> | null;
};

export type FavoritesActions = {
    addFavorite: ((id: number) => void) | null;
    removeFavorite: ((id: number) => void) | null;
    updateFavorites: ((page: number) => void) | null;
};

export type FavoritesStore = FavoritesActions & FavoritesState;
