import Link, { LinkProps } from 'next/link';
import { FunctionComponent, PropsWithChildren } from 'react';
export const LinkCustom: FunctionComponent<PropsWithChildren<LinkProps>> = ({
    children,
    ...props
}) => {
    return (
        <Link
            className='text-violet-500 hover:text-violet-300 hover:cursor-pointer'
            {...props}
        >
            {children}
        </Link>
    );
};
