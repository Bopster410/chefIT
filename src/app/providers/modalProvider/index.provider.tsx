'use client';

import { createContext, useContext, useRef } from 'react';
import { createModalStore, initModalStore } from './index.store';
import { FunctionComponent, PropsWithChildren } from 'react';
import { ModalStore } from './index.types';
import { useStore } from 'zustand';

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(
    undefined
);

export const ModalStoreProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const storeRef = useRef<ModalStoreApi | null>(null);
    if (storeRef.current === null)
        storeRef.current = createModalStore(initModalStore());

    return (
        <ModalStoreContext.Provider value={storeRef.current}>
            {children}
        </ModalStoreContext.Provider>
    );
};

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
    const modalStoreContext = useContext(ModalStoreContext);

    if (!modalStoreContext) {
        throw new Error(
            'useCounterStore must be used within CounterStoreProvider'
        );
    }

    return useStore(modalStoreContext, selector);
};
