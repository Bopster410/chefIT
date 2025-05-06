import { ReactNode } from 'react';
import { DelayedLoaderParams } from '../hooks';

export interface WithLoaderProps extends DelayedLoaderParams {
    isLoading: boolean;
    loader?: ReactNode;
    className?: string;
}
