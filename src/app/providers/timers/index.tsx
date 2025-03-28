'use client';

import { createContext, useCallback, useEffect } from 'react';
import { TimersStore } from './index.types';

export const TimersContext = createContext<TimersStore>({
    timers: null,
    addTimer: null,
    finishTimer: null,
    getTotalTimers: null,
    clearTimers: null,
    clearTimersLocally: null,
});

import { FunctionComponent, PropsWithChildren } from 'react';
import { useImmer } from 'use-immer';
import { addTimer, finishTimer, getAllTimers } from '@/entities/timer';
import { STATUS } from '@/shared/api';
export const TimersProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [timers, setTimers] = useImmer<{
        [step: string]: {
            number: number;
            description: string;
        };
    }>({});

    const add = useCallback(
        async (stepNum: number, description: string, secondsTotal: number) => {
            const { Status } = await addTimer(stepNum, secondsTotal);

            if (Status !== STATUS.SUCCESS || `${stepNum}` in timers) return;

            setTimers((currentTimers) => {
                currentTimers[stepNum] = { number: secondsTotal, description };
            });
        },
        [setTimers, timers]
    );

    const finish = useCallback(
        async (stepNum: number) => {
            if (!(`${stepNum}` in timers)) return;

            const { Status } = await finishTimer(stepNum);

            if (Status !== STATUS.SUCCESS) return;

            setTimers((currentTimers) => {
                delete currentTimers[stepNum];
            });
        },
        [setTimers, timers]
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
    }, [setTimers]);

    // Store init
    const init = async () => {
        const timersResponse = await getAllTimers();

        if (timersResponse.Status !== STATUS.SUCCESS) return;

        setTimers((currentTimers) => {
            timersResponse.Data.forEach(
                ({ length: { number }, step, stepNum }) =>
                    (currentTimers[stepNum] = { number, description: step })
            );
        });
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Updates timers value every second
    useEffect(() => {
        const changeTimersInterval = setInterval(() => {
            Object.entries(timers).forEach(([stepNum, { number }]) => {
                // if (number <= 0)
                //     setTimers((draft) => {
                //         delete draft[stepNum];
                //     });

                if (number > 0)
                    setTimers((draft) => {
                        draft[stepNum].number = number - 1;
                    });
            });
        }, 1000);

        return () => clearInterval(changeTimersInterval);
    }, [timers, setTimers]);

    return (
        <TimersContext.Provider
            value={{
                timers: timers,
                addTimer: add,
                finishTimer: finish,
                getTotalTimers,
                clearTimers: clear,
                clearTimersLocally: clearLocally,
            }}
        >
            {children}
        </TimersContext.Provider>
    );
};
