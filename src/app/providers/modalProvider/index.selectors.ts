import { ModalState } from './index.types';

export const selectCurrentModalContent = (state: ModalState) => {
    if (state.contentDeque.current.length === 0) return null;
    return state.contentDeque.current[0];
};

export const selectIsOpened = (state: ModalState) => state.isOpened;
