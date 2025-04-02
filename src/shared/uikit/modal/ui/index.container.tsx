'use client';

import { ModalContext } from '@/app/providers/modalProvider';
import { useContext } from 'react';
import { Modal } from './index.component';

export const ModalContainer = () => {
    const { isOpened, getCurrentContent, closeModal } =
        useContext(ModalContext);

    if (isOpened === null || !getCurrentContent || !closeModal) return;

    return (
        <Modal
            close={closeModal}
            isOpened={isOpened}
            onClose={closeModal}
        >
            {getCurrentContent()}
        </Modal>
    );
};
