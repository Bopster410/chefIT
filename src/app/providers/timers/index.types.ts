export interface TimersStore {
    timers: {
        [step: string]: {
            number: number;
            description: string;
        };
    } | null;
    addTimer:
        | ((stepNum: number, description: string, secondsTotal: number) => void)
        | null;
    finishTimer: ((stepNum: number) => void) | null;
    getTotalTimers: (() => void) | null;
    clearTimers: (() => void) | null;
    clearTimersLocally: (() => void) | null;
}
