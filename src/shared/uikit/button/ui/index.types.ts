import { ButtonHTMLAttributes } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    circle?: boolean;
    color?: 'white' | 'gray' | 'saffron' | 'violet';
    size?: 'lg' | 'sm' | 'md';
    variant?: 'normal' | 'outline';
    disabledVisual?: boolean;
}
