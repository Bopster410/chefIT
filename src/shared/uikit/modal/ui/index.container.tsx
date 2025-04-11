'use client';

import { Modal } from './index.component';
import { useModalStore } from '@/app/providers/modalProvider/index.provider';
import { selectCurrentModalContent } from '@/app/providers/modalProvider';

export const ModalContainer = () => {
    const isOpened = useModalStore((state) => state.isOpened);
    const currentContent = useModalStore(selectCurrentModalContent);
    const closeModal = useModalStore((state) => state.closeModal);

    if (isOpened === null || !closeModal) return;

    return (
        <Modal
            close={closeModal}
            isOpened={isOpened}
            onClose={closeModal}
        >
            {currentContent}
        </Modal>
    );
};
