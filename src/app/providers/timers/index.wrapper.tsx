'use client';

import { FunctionComponent, PropsWithChildren } from 'react';
import { TimersProvider } from '.';
import { TimerEndedMessage } from '@/entities/timer';
import { useModalStore } from '../modalProvider/index.provider';

export const TimersProviderWrapper: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);

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
