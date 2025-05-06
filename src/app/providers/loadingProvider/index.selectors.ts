import { LoadingState } from './index.types';

export const selectLoadingRequests = (state: LoadingState) =>
    state.loadingRequests;
