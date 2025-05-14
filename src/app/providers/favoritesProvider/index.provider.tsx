'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { createFavoritesStore, initFavoritesStore } from './index.store';

export type FavoritesStoreApi = ReturnType<typeof createFavoritesStore>;

export const FavoritesStoreContext = createContext<
    FavoritesStoreApi | undefined
>(undefined);

import { FunctionComponent, PropsWithChildren } from 'react';
import { FavoritesStore } from './index.types';
import { useStore } from 'zustand';
export const FavoritesStoreProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const storeRef = useRef<FavoritesStoreApi | null>(null);
    if (storeRef.current === null)
        storeRef.current = createFavoritesStore(initFavoritesStore());

    return (
        <FavoritesStoreContext.Provider value={storeRef.current}>
            {children}
        </FavoritesStoreContext.Provider>
    );
};

export const FavoritesStoreDataLoader: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const loadFavorites = useFavoritesStore((store) => store.updateFavorites);

    useEffect(() => {
        if (!loadFavorites) return;
        loadFavorites(1);
    }, [loadFavorites]);

    return <>{children}</>;
};

export const useFavoritesStore = <T,>(
    selector: (store: FavoritesStore) => T
): T => {
    const favoritesStoreContext = useContext(FavoritesStoreContext);

    if (!favoritesStoreContext) {
        throw new Error(
            'useFavoritesStore must be used within FavoritesStoreProvider'
        );
    }

    return useStore(favoritesStoreContext, selector);
};
