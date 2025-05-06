import { SpeechRecognitionState } from './index.types';

export const selectRecognizedSpeech = (state: SpeechRecognitionState) =>
    state.recognizedSpeech;

export const selectIsListening = (state: SpeechRecognitionState) =>
    state.isListening;
