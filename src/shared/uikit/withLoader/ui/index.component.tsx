import { FunctionComponent, PropsWithChildren } from 'react';
import { WithLoaderProps } from './index.types';
import { useDelayedLoader } from '../hooks';
import { CircularProgress } from '@mui/material';

const defaultLoader = <CircularProgress />;

export const WithLoader: FunctionComponent<
    PropsWithChildren<WithLoaderProps>
> = ({ children, isLoading, loader, ...hookParams }) => {
    const showLoader = useDelayedLoader(isLoading, hookParams);

    if (showLoader) return <>{loader ?? defaultLoader}</>;

    return <>{children}</>;
};
