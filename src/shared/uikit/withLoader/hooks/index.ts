import { useEffect, useState } from 'react';

export type DelayedLoaderParams = {
    delay?: number;
    minDuration?: number;
};

export const defaultDelayedLoaderParams: DelayedLoaderParams = {
    delay: 300,
    minDuration: 500,
};

export function useDelayedLoader(
    isLoading: boolean,
    { delay, minDuration }: DelayedLoaderParams = defaultDelayedLoaderParams
) {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let delayTimer: NodeJS.Timeout | undefined = undefined;
        let minDurationTimer: NodeJS.Timeout | undefined = undefined;

        if (isLoading) {
            delayTimer = setTimeout(() => {
                setShowLoader(true);

                minDurationTimer = setTimeout(() => {
                    if (!isLoading) {
                        setShowLoader(false);
                    }
                }, minDuration);
            }, delay);
        } else {
            if (showLoader) {
                minDurationTimer = setTimeout(
                    () => setShowLoader(false),
                    minDuration
                );
            } else {
                clearTimeout(delayTimer);
                setShowLoader(false);
            }
        }

        return () => {
            clearTimeout(delayTimer);
            clearTimeout(minDurationTimer);
        };
    }, [isLoading, delay, minDuration, showLoader]);

    return showLoader;
}
