import { ButtonHTMLAttributes } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    circle?: boolean;
    color?: 'white' | 'gray';
    size?: 'lg' | 'sm';
}
