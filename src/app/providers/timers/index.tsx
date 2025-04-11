'use client';

import { useCallback, useEffect } from 'react';
import { OnTimeoutCallback, TimersStore } from './index.types';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useImmer } from 'use-immer';
import { addTimer, finishTimer, getAllTimers } from '@/entities/timer';
import { createContext } from 'use-context-selector';
import { STATUS } from '@/shared/api';

export const TimersContext = createContext<TimersStore>({
    timers: null,
    addTimer: null,
    finishTimer: null,
    getTotalTimers: null,
    clearTimers: null,
    clearTimersLocally: null,
    getLastFinishedTimer: null,
});

export const TimersProvider: FunctionComponent<
    PropsWithChildren<{
        defaultOntTimeout?: OnTimeoutCallback;
    }>
> = ({ children, defaultOntTimeout }) => {
    const [timers, setTimers] = useImmer<{
        [step: string]: {
            number: number;
            initialTimeSeconds: number;
            description: string;
            onTimeout?: OnTimeoutCallback;
        };
    }>({});

    const [finishedTimers, setFinishedTimers] = useImmer<number[]>([]);

    const add = useCallback(
        async (
            stepNum: number,
            description: string,
            secondsTotal: number,
            onTimeout?: OnTimeoutCallback
        ) => {
            const { Status } = await addTimer(stepNum, secondsTotal);

            if (Status !== STATUS.SUCCESS || `${stepNum}` in timers) return;

            setTimers((currentTimers) => {
                currentTimers[stepNum] = {
                    number: secondsTotal,
                    initialTimeSeconds: secondsTotal,
                    description,
                    onTimeout: onTimeout ?? defaultOntTimeout,
                };
            });
        },
        [setTimers, timers, defaultOntTimeout]
    );

    const finish = useCallback(
        async (stepNum: number) => {
            if (!(`${stepNum}` in timers)) return;

            const { Status } = await finishTimer(stepNum);

            if (Status !== STATUS.SUCCESS) return;

            setTimers((currentTimers) => {
                delete currentTimers[stepNum];
            });

            const finishedTimerIndex = finishedTimers.indexOf(stepNum);
            if (finishedTimerIndex === -1) return;
            setFinishedTimers((currentFinishedTimers) => {
                currentFinishedTimers.splice(finishedTimerIndex, 1);
            });
        },
        [finishedTimers, setFinishedTimers, setTimers, timers]
    );

    const getTotalTimers = useCallback(() => {
        return Object.values(timers).length;
    }, [timers]);

    const clear = useCallback(async () => {
        Promise.all(
            Object.keys(timers).map((stepNum) => finish(parseInt(stepNum)))
        );
    }, [finish, timers]);

    const clearLocally = useCallback(() => {
        setTimers((currentTimers) =>
            Object.keys(currentTimers).forEach(
                (stepNum) => delete currentTimers[stepNum]
            )
        );
        setFinishedTimers([]);
    }, [setFinishedTimers, setTimers]);

    const getLastFinishedTimer = useCallback(
        () => (finishedTimers.length === 0 ? null : finishedTimers[0]),
        [finishedTimers]
    );

    // Store init
    const init = async () => {
        const timersResponse = await getAllTimers();

        if (timersResponse.Status !== STATUS.SUCCESS) return;

        timersResponse.Data.forEach(({ length: { number }, step, stepNum }) => {
            setTimers((currentTimers) => {
                currentTimers[stepNum] = {
                    // TODO change to initial time from server
                    initialTimeSeconds: number,
                    number,
                    description: step,
                    onTimeout: defaultOntTimeout,
                };
            });

            if (number <= 0)
                setFinishedTimers((currentFinishedTimers) => {
                    currentFinishedTimers.push(stepNum);
                });
        });
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Updates timers value every second
    useEffect(() => {
        const finished: string[] = [];

        const changeTimersInterval = setInterval(() => {
            Object.entries(timers).forEach(
                ([
                    stepNum,
                    { number, onTimeout, description, initialTimeSeconds },
                ]) => {
                    const stepNumInt = parseInt(stepNum);

                    if (
                        number <= 0 &&
                        finished.indexOf(stepNum) === -1 &&
                        finishedTimers.indexOf(stepNumInt) === -1
                    ) {
                        finished.push(stepNum);

                        setFinishedTimers((currentFinishedTimers) => {
                            currentFinishedTimers.push(stepNumInt);
                        });

                        if (onTimeout) {
                            onTimeout(() => finish(stepNumInt), {
                                stepNum: stepNumInt,
                                description,
                                time: initialTimeSeconds,
                            });
                        }
                    }

                    if (number > 0)
                        setTimers((currentTimers) => {
                            currentTimers[stepNum].number = number - 1;
                        });
                }
            );
        }, 1000);

        return () => clearInterval(changeTimersInterval);
    }, [timers, setTimers, setFinishedTimers, finishedTimers, finish]);

    return (
        <TimersContext.Provider
            value={{
                timers: timers,
                addTimer: add,
                finishTimer: finish,
                getTotalTimers,
                clearTimers: clear,
                clearTimersLocally: clearLocally,
                getLastFinishedTimer,
            }}
        >
            {children}
        </TimersContext.Provider>
    );
};
