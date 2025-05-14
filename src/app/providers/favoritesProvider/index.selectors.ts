import { FavoritesState } from './index.types';

export const selectFavoritesIds = (state: FavoritesState) => state.favoriteIds;
