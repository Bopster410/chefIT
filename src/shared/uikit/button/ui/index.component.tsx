import { FunctionComponent, PropsWithChildren } from 'react';
import { Props } from './index.types';
import clsx from 'clsx';

const COLORS = {
    white: {
        normal: { bg: 'bg-white', text: 'text-black', outline: 'border-black' },
        disabled: {
            bg: 'bg-gray-200',
            text: 'text-gray-700',
            outline: 'border-gray-700',
        },
    },
    gray: {
        normal: {
            bg: 'bg-gray-200',
            text: 'text-black',
            outline: 'border-gray-300',
        },
        disabled: {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            outline: 'border-gray-100',
        },
    },
    saffron: {
        normal: {
            bg: 'bg-saffron-500',
            text: 'text-white',
            outline: 'border-saffron-500',
        },
        disabled: {
            bg: 'bg-saffron-300',
            text: 'text-white',
            outline: 'border-saffron-300',
        },
    },
    violet: {
        normal: {
            bg: 'bg-violet-500',
            text: 'text-white',
            outline: 'border-violet-500',
        },
        disabled: {
            bg: 'bg-violet-300',
            text: 'text-white',
            outline: 'border-violet-300',
        },
    },
};

export const Button: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    color,
    circle,
    size = 'lg',
    className,
    disabled,
    variant = 'normal',
    disabledVisual = false,
    ...props
}) => {
    const { bg, text, outline } =
        disabled && disabledVisual
            ? COLORS[color ?? 'gray'].disabled
            : COLORS[color ?? 'gray'].normal;
    return (
        <button
            className={clsx(
                'hover:cursor-pointer',
                variant === 'normal' && [bg, text],
                variant === 'outline' && [
                    'bg-white border-2',
                    outline,
                    'text-black',
                ],
                circle && 'rounded-full aspect-square px-0',
                !circle && 'rounded-lg',
                size === 'lg' && ['h-button-height', !circle && 'px-4'],
                size === 'md' && ['h-button-height-md', !circle && 'px-2.5'],
                size === 'sm' && ['h-button-height-sm', !circle && 'px-1'],
                'text-font-base text-base font-bold',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
