'use client';

import { Button, ButtonProps } from '@/shared/uikit/button';
import { useRouter } from 'next/navigation';
import { FunctionComponent, PropsWithChildren } from 'react';

export const BackButton: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
    children,
    ...props
}) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <Button
            {...props}
            onClick={goBack}
        >
            {children}
        </Button>
    );
};
