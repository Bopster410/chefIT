export interface ModalStore {
    openModal: ((children: React.ReactNode) => void) | null;
    closeModal: (() => void) | null;
    isOpened: boolean | null;
    getCurrentContent: (() => React.ReactNode | null) | null;
}
