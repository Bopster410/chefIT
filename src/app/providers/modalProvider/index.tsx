'use client';

import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import { createContext, useCallback, useState } from 'react';
import { ModalStore } from './index.types';

const ModalContext = createContext<ModalStore>({
    openModal: null,
    closeModal: null,
    getCurrentContent: null,
    isOpened: null,
});

export const ModalProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [isOpened, setIsOpened] = useState(false);
    const contentDeque = useRef<React.ReactNode[]>([]);

    const openModal = useCallback(
        (modalChildren: React.ReactNode) => {
            contentDeque.current.push(modalChildren);

            if (!isOpened) {
                setIsOpened(true);
            }
        },
        [isOpened]
    );

    const closeModal = useCallback(() => {
        const needsNextOpen = contentDeque.current.length > 1;

        setIsOpened(false);
        contentDeque.current.shift();

        if (needsNextOpen) {
            setTimeout(() => {
                setIsOpened(true);
            }, 1000);
        }
    }, []);

    const getCurrentContent = useCallback(() => {
        if (contentDeque.current.length === 0) return null;

        return contentDeque.current[0];
    }, [contentDeque]);

    return (
        <ModalContext.Provider
            value={{ openModal, closeModal, getCurrentContent, isOpened }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext };
