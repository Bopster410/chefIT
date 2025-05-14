'use client';

import { useSpeechRecognitionStore } from '@/app/providers/speechRecognitionProvider/index.provider';
import { StepsContext } from '@/app/providers/steps';
import { TimersContext } from '@/app/providers/timers';
import { useEffect, useRef, useState } from 'react';
import { useContext } from 'use-context-selector';
import { useContextSelector } from 'use-context-selector';
import { AnimatedBlob } from '../../../shared/uikit/animatedBlob/ui/index.component';
import { animated, useTransition } from '@react-spring/web';
import { getCommand } from '../api';
import { TextField } from '@mui/material';
import { sanitizeSpeechInput } from '../lib';

const COMMAND_ID: { [id: number]: string } = {
    1: 'вперёд',
    2: 'назад',
    3: 'конец',
    4: 'удали таймер',
    5: 'добавь таймер',
};

export const SpeechListener = () => {
    const [isOpened, setIsOpened] = useState(true);
    const stop = useSpeechRecognitionStore((state) => state.stop);
    const start = useSpeechRecognitionStore((state) => state.start);
    const setRecognizedSpeech = useSpeechRecognitionStore(
        (state) => state.setRecognizedSpeech
    );
    const recognizedSpeech = useSpeechRecognitionStore(
        (state) => state.recognizedSpeech[state.recognizedSpeech.length - 1]
    );
    const [isPending, setIsPending] = useState(false);

    const transitions = useTransition(isOpened, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 },
    });

    // TODO зависимость от времени таймера убрать
    const { prevStep, nextStep, endCooking, currentStep } =
        useContext(StepsContext);
    const addTimer = useContextSelector(
        TimersContext,
        (context) => context.addTimer
    );
    const finishTimer = useContextSelector(
        TimersContext,
        (context) => context.finishTimer
    );

    console.log(recognizedSpeech);

    useEffect(() => {
        start();
        return () => stop();
    }, [stop, start]);

    useEffect(() => {
        if (isOpened) document.body.classList.add('overflow-hidden');
        if (!isOpened) document.body.classList.remove('overflow-hidden');
    });

    useEffect(() => {
        if (
            recognizedSpeech &&
            sanitizeSpeechInput(recognizedSpeech) === 'шеф' &&
            !isOpened
        ) {
            setIsOpened(true);
            setIsPending(false);
            setRecognizedSpeech();
        }

        if (isOpened && recognizedSpeech && !isPending) {
            switch (sanitizeSpeechInput(recognizedSpeech)) {
                case 'вперёд':
                    if (nextStep) nextStep();
                    setIsOpened(false);
                    break;
                case 'назад':
                    if (prevStep) prevStep();
                    setIsOpened(false);
                    break;
                case 'конец':
                    if (endCooking) endCooking();
                    setIsOpened(false);
                    break;
                case 'добавь таймер':
                    if (
                        addTimer &&
                        currentStep?.number &&
                        currentStep.description &&
                        currentStep.time
                    )
                        addTimer(
                            currentStep?.number,
                            currentStep?.description,
                            currentStep?.time
                        );
                    setIsOpened(false);
                    break;
                case 'удали таймер':
                    if (
                        finishTimer &&
                        currentStep?.number &&
                        currentStep.description &&
                        currentStep.time
                    )
                        finishTimer(currentStep?.number);
                    setIsOpened(false);
                    break;
                case 'пока':
                case 'спасибо':
                    setIsOpened(false);
                    break;
                default:
                    const command = getCommand(recognizedSpeech);
                    setIsPending(true);
                    command.then(({ Data }) => {
                        setIsPending(false);
                        if (!Data || !(Data in COMMAND_ID)) return;
                        setRecognizedSpeech(COMMAND_ID[Data]);
                    });
            }
            setRecognizedSpeech();
        }
    }, [
        addTimer,
        currentStep?.description,
        currentStep?.number,
        currentStep?.time,
        endCooking,
        finishTimer,
        isOpened,
        isPending,
        nextStep,
        prevStep,
        recognizedSpeech,
        setRecognizedSpeech,
    ]);

    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        const handleInput = (e: Event) => {
            e.preventDefault();
            setRecognizedSpeech(inputRef.current?.value);
        };
        const currentForm = formRef.current;
        currentForm?.addEventListener('submit', handleInput);
        return () => {
            currentForm?.removeEventListener('submit', handleInput);
        };
    });

    return transitions(
        (style, item) =>
            item && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <animated.div
                    style={style}
                    className='fixed inset-0 bg-[#00000030] backdrop-blur-xs z-50 w-screen h-screen'
                    onClick={() => {
                        // setIsOpened(false);
                        // setRecognizedSpeech();
                    }}
                >
                    <div className='absolute flex flex-col items-center gap-1 left-1/2 top-2/5 transform -translate-y-1/2 -translate-x-1/2 w-72'>
                        <AnimatedBlob stayCircle={isPending} />
                    </div>
                    <div>
                        <form
                            action=''
                            ref={formRef}
                        >
                            <TextField
                                inputRef={inputRef}
                                type='text'
                                name=''
                                id=''
                            />
                        </form>
                    </div>
                </animated.div>
            )
    );
};
