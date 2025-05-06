import { useLoadingStore } from './index.provider';
import { selectLoadingRequests } from './index.selectors';
import { useCallback } from 'react';

export const useLoadingRequestState = (requestId: string) => {
    const requests = useLoadingStore(selectLoadingRequests);
    const startState = useLoadingStore((state) => state.startLoading);
    const stopState = useLoadingStore((state) => state.stopLoading);
    const removeState = useLoadingStore((state) => state.removeLoading);

    const start = useCallback(() => {
        if (!startState) return;
        startState(requestId);
    }, [requestId, startState]);

    const stop = useCallback(() => {
        if (!stopState) return;
        stopState(requestId);
    }, [requestId, stopState]);

    const remove = useCallback(() => {
        if (!removeState) return;
        removeState(requestId);
    }, [requestId, removeState]);

    return {
        isLoading: requests[requestId],
        start,
        stop,
        remove,
    };
};
