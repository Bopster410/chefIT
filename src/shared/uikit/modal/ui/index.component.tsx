'use client';

import { FunctionComponent, PropsWithChildren, useEffect, useRef } from 'react';
import { Props } from './index.types';
import { Button } from '../../button';
import CloseIcon from '@mui/icons-material/Close';

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
    isOpened,
    onClose,
    close,
    children,
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    console.log(isOpened);

    useEffect(() => {
        console.log('effect 1');
        const dialog = dialogRef.current;
        if (!dialog) {
            document.body.classList.remove('overflow-hidden');
            return;
        }

        if (isOpened) {
            console.log('opened');
            // TODO как-то поменять эту штуку
            document.body.classList.add('overflow-hidden');
            dialog.showModal();
        } else {
            console.log('closed');
            document.body.classList.remove('overflow-hidden');
            dialog.close();
        }
    }, [isOpened]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dialog = dialogRef.current;
            if (!dialog) return;

            const rect = dialog.getBoundingClientRect();
            const isOutside =
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;

            if (isOutside) {
                if (onClose) onClose();
            }
        };

        if (isOpened) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpened, onClose]);
    return (
        <dialog
            className='fixed w-screen max-w-none md:max-w-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-4xl'
            ref={dialogRef}
        >
            <div className='flex flex-col'>
                <div className='pe-2 pt-2 md:pe-4 md:pt-4 self-end'>
                    <Button
                        color='white'
                        onClick={close}
                    >
                        <CloseIcon />
                    </Button>
                </div>
                <div className='px-10 pb-10 md:px-14 md:pb-14'>{children}</div>
            </div>
        </dialog>
    );
};
