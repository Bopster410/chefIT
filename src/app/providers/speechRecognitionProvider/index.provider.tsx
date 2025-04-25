'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import {
    // createDefaultSpeechRecognitionStore,
    createSpeechRecognitionStore,
    initSpeechRecognitionStore,
} from './index.store';
import { FunctionComponent, PropsWithChildren } from 'react';
import { SpeechRecognitionStore } from './index.types';
import { useStore } from 'zustand';

export type SpeechRecognitionStoreApi = ReturnType<
    typeof createSpeechRecognitionStore
>;

export const SpeechRecognitionStoreContext = createContext<
    SpeechRecognitionStoreApi | undefined
>(undefined);

export const SpeechRecognitionStoreProvider: FunctionComponent<
    PropsWithChildren
> = ({ children }) => {
    const storeRef = useRef<SpeechRecognitionStoreApi | null>(null);

    const needsInit =
        storeRef.current === null || typeof window !== 'undefined';
    if (needsInit)
        storeRef.current = createSpeechRecognitionStore(
            initSpeechRecognitionStore()
        );

    // if (!needsInit) {
    //     storeRef.current = createDefaultSpeechRecognitionStore();
    // }

    return (
        <SpeechRecognitionStoreContext.Provider
            value={storeRef.current ?? undefined}
        >
            <SpeechRecognitionWrapper>{children}</SpeechRecognitionWrapper>
        </SpeechRecognitionStoreContext.Provider>
    );
};

export const SpeechRecognitionWrapper: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const recognition = useSpeechRecognitionStore(
        (state) => state.speechRecognition
    );
    const setRecognizedSpeech = useSpeechRecognitionStore(
        (state) => state.setRecognizedSpeech
    );
    const start = useSpeechRecognitionStore((state) => state.start);

    useEffect(() => {
        recognition.current?.addEventListener('result', (event) => {
            setRecognizedSpeech(event.results);
        });
    }, [recognition, setRecognizedSpeech]);

    useEffect(() => {
        const currentRecognition = recognition.current;
        const handleEnd = (event: Event) => {
            event.preventDefault();
            setRecognizedSpeech();
            start();
        };

        currentRecognition?.addEventListener('end', handleEnd);

        // recognition.current?.addEventListener('speechend', (event) => {
        //     event.preventDefault();
        //     setRecognizedSpeech();
        //     start();
        // });
        return () => {
            currentRecognition?.removeEventListener('end', handleEnd);
        };
    }, [recognition, setRecognizedSpeech, start]);

    return <>{children}</>;
};

export const useSpeechRecognitionStore = <T,>(
    selector: (store: SpeechRecognitionStore) => T
): T => {
    const speechRecognitionContext = useContext(SpeechRecognitionStoreContext);

    if (!speechRecognitionContext) {
        throw new Error(
            'useSpeechRecognitionStore must be used within SpeechRecognitionStoreProvider'
        );
    }

    return useStore(speechRecognitionContext, selector);
};
