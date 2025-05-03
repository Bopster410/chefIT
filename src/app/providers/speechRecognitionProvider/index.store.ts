import { createStore } from 'zustand';
import { SpeechRecognitionState, SpeechRecognitionStore } from './index.types';

export const defaultInitState: SpeechRecognitionState = {
    isListening: false,
    recognizedSpeech: [],
    listeningTimeout: {
        current: null,
    },
    closeTimeout: {
        current: null,
    },
    speechRecognition: {
        current: null,
    },
    speechGrammarList: {
        current: null,
    },
    speechRecognitionEvent: {
        current: null,
    },
};

export const initSpeechRecognitionStore = (): SpeechRecognitionState => {
    if (typeof window === 'undefined') return defaultInitState;

    const NewSpeechRecognition = window.webkitSpeechRecognition;
    const NewSpeechGrammarList = window.webkitSpeechGrammarList;
    // const NewSpeechRecognitionEvent =
    //     SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new NewSpeechRecognition();
    let grammarList = null;
    if (NewSpeechGrammarList) {
        grammarList = new NewSpeechGrammarList();
        // grammarList.addFromString(
        //     '#JSGF V1.0; grammar command; public <command> = вперёд | назад | конец | удали таймер | добавь таймер | покажи таймеры; public <chef> = шеф'
        // );
        recognition.grammars = grammarList;
    }

    recognition.continuous = true;
    recognition.lang = 'ru';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    return {
        isListening: false,
        recognizedSpeech: [],
        listeningTimeout: {
            current: null,
        },
        closeTimeout: {
            current: null,
        },
        speechRecognition: {
            current: recognition,
        },
        speechGrammarList: {
            current: grammarList,
        },
        speechRecognitionEvent: {
            current: null,
        },
    };
};

export const createSpeechRecognitionStore = (
    initState: SpeechRecognitionState = defaultInitState
) => {
    return createStore<SpeechRecognitionStore>((set, get) => ({
        ...initState,
        start: () => {
            // console.log('a');
            // console.log(get().speechGrammarList.current);
            // console.log('grammar');
            // console.log(get().speechRecognition.current?.grammars);

            try {
                get().speechRecognition.current?.start();
                set(() => ({
                    isListening: true,
                }));
            } catch (err) {
                console.log(err);
            }
        },
        stop: () => {
            get().speechRecognition.current?.stop();
            set(() => ({
                isListening: false,
                recognizedSpeech: [],
            }));
        },
        setRecognizedSpeech: (
            recognitionResult?: SpeechRecognitionResultList | string
        ) => {
            if (!recognitionResult) set(() => ({ recognizedSpeech: [] }));
            if (recognitionResult) {
                if (typeof recognitionResult !== 'string') {
                    const result = Object.entries(recognitionResult).map(
                        ([, res]) => res[0].transcript
                    );
                    console.log(result);
                    set(() => ({
                        recognizedSpeech: result,
                    }));
                }

                if (typeof recognitionResult === 'string') {
                    console.log(recognitionResult);
                    set(() => ({
                        recognizedSpeech: [recognitionResult],
                    }));
                }
            }

            console.log(get().recognizedSpeech);
        },
    }));
};

export const createDefaultSpeechRecognitionStore = () => {
    return createStore<SpeechRecognitionStore>(() => ({
        ...defaultInitState,
        start: () => {},
        stop: () => {},
        setRecognizedSpeech: () => {},
    }));
};
