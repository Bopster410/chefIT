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
                circle ? 'rounded-full aspect-square' : 'rounded-lg'
            } ${
                size === 'lg'
                    ? `h-button-height ${circle ? 'px-0' : 'px-4'}`
                    : `h-button-height-sm  ${circle ? 'px-0' : 'px-1'}`
            } text-font-base text-base font-bold ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
