// import { Response } from '@/shared/api';
import { createStore } from 'zustand';
import { FavoritesStore, FavoritesState } from './index.types';
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from '@/entities/recipe/api';
import { STATUS } from '@/shared/api';
import { produce } from 'immer';

const defaultInitState: FavoritesState = {
    favoriteIds: {},
};

export const initFavoritesStore = (): FavoritesState => defaultInitState;

export const createFavoritesStore = (
    initState: FavoritesState = defaultInitState
) => {
    return createStore<FavoritesStore>((set) => ({
        ...initState,
        addFavorite: (id: number) => {
            addFavorite(id).then(({ Status }) => {
                if (Status !== STATUS.SUCCESS) return;
                set((state) => ({ ...state.favoriteIds, [id]: true }));
            });
        },
        removeFavorite: (id: number) => {
            removeFavorite(id).then(({ Status }) => {
                if (Status !== STATUS.SUCCESS) return;
                set(
                    produce((state) => {
                        delete state.favoriteIds[id];
                    })
                );
            });
        },
        updateFavorites: (page: number) => {
            getFavorites(page).then(({ Status, Data }) => {
                if (Status !== STATUS.SUCCESS || !Data) return;
                const newFavorites: { [id: string]: boolean } = {};
                Data.forEach(({ id }) => {
                    newFavorites[id] = true;
                });
                set(() => ({ favoriteIds: newFavorites }));
            });
        },
    }));
};
