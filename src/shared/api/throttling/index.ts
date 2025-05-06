export function throttle<Args>(func: (args?: Args) => void, delay: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;
    let lastCall: Args | undefined;

    return (args?: Args) => {
        if (interval === undefined) {
            func(args);
            timeout = setTimeout(() => {
                clearInterval(interval);
                interval = undefined;
                lastCall = undefined;
            }, delay);
            interval = setInterval(() => {
                if (lastCall !== undefined) {
                    func(lastCall);
                    lastCall = undefined;
                }
            }, delay);
        } else {
            lastCall = args;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                clearInterval(interval);
                interval = undefined;
                lastCall = undefined;
            }, delay);
        }
    };
}
