import { MouseEvent } from "react";

export interface Props{
    color?: 'saffron' | 'violet' | 'gray';
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
    withClear?: boolean;
}
