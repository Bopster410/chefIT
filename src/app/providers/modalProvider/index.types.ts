import React from 'react';

export type ModalState = {
    isOpened: boolean;
    contentDeque: { current: React.ReactNode[] };
};

export type ModalActions = {
    openModal: ((children: React.ReactNode) => void) | null;
    closeModal: (() => void) | null;
};

export type ModalStore = ModalState & ModalActions;
