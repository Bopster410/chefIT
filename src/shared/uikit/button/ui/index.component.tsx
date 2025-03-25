import { FunctionComponent, PropsWithChildren } from 'react';
import { Props } from './index.types';

const COLORS = {
    white: 'bg-white',
    gray: 'bg-(--gray-100)',
};

export const Button: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    color,
    circle,
    ...props
}) => {
    return (
        <button
            className={`hover:cursor-pointer ${COLORS[color]} ${
                circle ? 'rounded-full' : 'rounded-lg'
            } text-font-base h-button-height px-4`}
            {...props}
        >
            {children}
        </button>
    );
};
