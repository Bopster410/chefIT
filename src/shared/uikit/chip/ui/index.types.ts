import { MouseEventHandler } from "react";

export interface Props{
    color?: 'saffron' | 'violet' | 'gray';
    onClick?: MouseEventHandler<HTMLDivElement>;
    onButtonClick?: () => void;
    className?: string;
    withClear?: boolean;
}
