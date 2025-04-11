'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import {
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
    if (storeRef.current === null || typeof window !== 'undefined')
        storeRef.current = createSpeechRecognitionStore(
            initSpeechRecognitionStore()
        );

    return (
        <SpeechRecognitionStoreContext.Provider value={storeRef.current}>
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
        recognition.current?.addEventListener('end', (event) => {
            event.preventDefault();
            setRecognizedSpeech();
            start();
        });
    }, [recognition, setRecognizedSpeech, start]);

    useEffect(() => {
        recognition.current?.addEventListener('speechend', (event) => {
            event.preventDefault();
            setRecognizedSpeech();
            start();
        });
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
