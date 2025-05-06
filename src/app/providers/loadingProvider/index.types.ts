// import { Response } from '@/shared/api';

export type LoadingState = {
    loadingRequests: Record<string, boolean>;
    // loadingData: Record<string, Promise<Response<unknown>>> | null;
};

export type LoadingActions = {
    startLoading:
        | ((
              requestId: string /*, request: Promise<Response<unknown>>*/
          ) => void)
        | null;
    stopLoading: ((requestId: string) => void) | null;
    removeLoading: ((requestId: string) => void) | null;
};

export type LoadingStore = LoadingState & LoadingActions;
