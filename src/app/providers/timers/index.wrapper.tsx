'use client';

import { FunctionComponent, PropsWithChildren, useContext } from 'react';
import { ModalContext } from '../modalProvider';
import { TimersProvider } from '.';
import { TimerEndedMessage } from '@/entities/timer';

export const TimersProviderWrapper: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const { openModal, closeModal } = useContext(ModalContext);

    return (
        <TimersProvider
            defaultOntTimeout={(finish, { description, stepNum, time }) => {
                if (openModal)
                    openModal(
                        <TimerEndedMessage
                            description={description}
                            stepNum={stepNum}
                            numOfSeconds={time}
                            finishTimer={() => {
                                finish();
                                if (closeModal) closeModal();
                            }}
                        />
                    );
            }}
        >
            {children}
        </TimersProvider>
    );
};
