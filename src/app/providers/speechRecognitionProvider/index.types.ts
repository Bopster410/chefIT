export type SpeechRecognitionState = {
    isListening: boolean;
    recognizedSpeech: string[];
    listeningTimeout: { current: NodeJS.Timeout | null };
    closeTimeout: { current: NodeJS.Timeout | null };
    speechRecognition: { current: SpeechRecognition | null };
    speechGrammarList: { current: SpeechGrammarList | null };
    speechRecognitionEvent: { current: SpeechRecognitionEvent | null };
};

export type SpeechRecognitionActions = {
    start: () => void;
    stop: () => void;
    setRecognizedSpeech: (
        recognitionResult?: SpeechRecognitionResultList | string
    ) => void;
    // setGrammar: (grammar: string, weight?: number) => void;
};

export type SpeechRecognitionStore = SpeechRecognitionState &
    SpeechRecognitionActions;
