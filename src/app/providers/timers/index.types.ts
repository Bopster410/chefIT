export type OnTimeoutCallback = (
    finishTimer: () => void,
    timerInfo: {
        stepNum: number;
        time: number;
        description: string;
    }
) => void;

export interface TimersStore {
    timers: {
        [step: string]: {
            number: number;
            description: string;
        };
    } | null;
    getLastFinishedTimer: (() => number | null) | null;
    addTimer:
        | ((
              stepNum: number,
              description: string,
              secondsTotal: number,
              onTImeout?: OnTimeoutCallback
          ) => void)
        | null;
    finishTimer: ((stepNum: number) => void) | null;
    getTotalTimers: (() => void) | null;
    clearTimers: (() => void) | null;
    clearTimersLocally: (() => void) | null;
}
