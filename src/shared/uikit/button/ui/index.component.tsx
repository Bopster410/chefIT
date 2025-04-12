import { FunctionComponent, PropsWithChildren } from 'react';
import { Props } from './index.types';

const COLORS = {
    white: 'bg-white',
    gray: 'bg-(--gray-100)',
    saffron: 'bg-saffron-500 text-white',
    violet: 'bg-violet-500 text-white',
};

export const Button: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    color,
    circle,
    size = 'lg',
    className,
    ...props
}) => {
    return (
        <button
            className={`hover:cursor-pointer ${COLORS[color ?? 'gray']} ${
                circle ? 'rounded-full' : 'rounded-lg'
            } ${
                size === 'lg'
                    ? 'h-button-height px-4'
                    : 'h-button-height-sm px-1'
            } text-font-base text-base ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
