import { createStore } from 'zustand';
import { ModalState, ModalStore } from './index.types';

const defaultInitState: ModalState = {
    isOpened: false,
    contentDeque: { current: [] },
};

export const initModalStore = (): ModalState => defaultInitState;

export const createModalStore = (initState: ModalState = defaultInitState) => {
    return createStore<ModalStore>((set, get) => ({
        ...initState,
        openModal: (modalChildren: React.ReactNode) => {
            get().contentDeque.current.push(modalChildren);

            if (!get().isOpened) {
                set(() => ({ isOpened: true }));
            }
        },

        closeModal: () => {
            const needsNextOpen = get().contentDeque.current.length > 1;

            set(() => ({ isOpened: false }));
            get().contentDeque.current.shift();

            if (needsNextOpen) {
                setTimeout(() => {
                    set(() => ({ isOpened: true }));
                }, 1000);
            }
        },
    }));
};
