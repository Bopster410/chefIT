// import { Response } from '@/shared/api';
import { createStore } from 'zustand';
import { LoadingState, LoadingStore } from './index.types';
import { persist } from 'zustand/middleware';

const defaultInitState: LoadingState = {
    // loadingData: {},
    loadingRequests: {},
};

export const initLoadingStore = (): LoadingState => defaultInitState;

export const createLoadingStore = (
    initState: LoadingState = defaultInitState
) => {
    return createStore(
        persist<LoadingStore>(
            (set, get) => ({
                ...initState,
                startLoading: (
                    requestId: string
                    // request: Promise<Response<unknown>>
                ) => {
                    set((store) => ({
                        loadingRequests: {
                            ...store.loadingRequests,
                            [requestId]: true,
                        },
                    }));
                },
                stopLoading: (requestId: string) => {
                    set((store) => ({
                        loadingRequests: {
                            ...store.loadingRequests,
                            [requestId]: false,
                        },
                    }));
                },
                removeLoading: (requestId: string) => {
                    const curLoadingRequests = get().loadingRequests;
                    delete curLoadingRequests[requestId];
                    set(() => curLoadingRequests);
                },
            }),
            {
                name: 'loading-store',
            }
        )
    );
};
