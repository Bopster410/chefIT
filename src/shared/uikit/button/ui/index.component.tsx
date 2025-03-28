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
    size = 'lg',
    ...props
}) => {
    return (
        <button
            className={`hover:cursor-pointer ${COLORS[color]} ${
                circle ? 'rounded-full' : 'rounded-lg'
            } ${
                size === 'lg' ? 'h-button-height' : 'h-button-height-sm'
            } text-font-base text-base px-4`}
            {...props}
        >
            {children}
        </button>
    );
};
