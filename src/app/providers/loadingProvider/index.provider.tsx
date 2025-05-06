'use client';

import { createContext, useContext, useRef } from 'react';
import { createLoadingStore, initLoadingStore } from './index.store';

export type LoadingStoreApi = ReturnType<typeof createLoadingStore>;

export const LoadingStoreContext = createContext<LoadingStoreApi | undefined>(
    undefined
);

import { FunctionComponent, PropsWithChildren } from 'react';
import { LoadingStore } from './index.types';
import { useStore } from 'zustand';
export const LoadingStoreProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const storeRef = useRef<LoadingStoreApi | null>(null);
    if (storeRef.current === null)
        storeRef.current = createLoadingStore(initLoadingStore());

    return (
        <LoadingStoreContext.Provider value={storeRef.current}>
            {children}
        </LoadingStoreContext.Provider>
    );
};

export const useLoadingStore = <T,>(
    selector: (store: LoadingStore) => T
): T => {
    const loadingStoreContext = useContext(LoadingStoreContext);

    if (!loadingStoreContext) {
        throw new Error(
            'useCounterStore must be used within CounterStoreProvider'
        );
    }

    return useStore(loadingStoreContext, selector);
};
