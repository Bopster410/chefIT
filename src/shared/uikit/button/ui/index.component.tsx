import { FunctionComponent, PropsWithChildren } from 'react';
import { Props } from './index.types';

const COLORS = {
    white: {
        normal: { bg: 'bg-white', text: 'text-black' },
        disabled: { bg: 'bg-gray-200', text: 'text-gray-700' },
    },
    gray: {
        normal: { bg: 'bg-(--gray-100)', text: 'text-black' },
        disabled: { bg: 'bg-gray-200', text: 'text-gray-700' },
    },
    saffron: {
        normal: { bg: 'bg-saffron-500', text: 'text-white' },
        disabled: { bg: 'bg-saffron-300', text: 'text-white' },
    },
    violet: {
        normal: { bg: 'bg-violet-500', text: 'text-white' },
        disabled: { bg: 'bg-violet-300', text: 'text-white' },
    },
};

export const Button: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    color,
    circle,
    size = 'lg',
    className,
    disabled,
    ...props
}) => {
    const { bg, text } = disabled
        ? COLORS[color ?? 'gray'].disabled
        : COLORS[color ?? 'gray'].normal;
    return (
        <button
            className={`hover:cursor-pointer ${bg} ${text} ${
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
