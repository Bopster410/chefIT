import { FunctionComponent, PropsWithChildren } from 'react';
export const Blockquote: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    return (
        <blockquote className='border-l-4 border-gray-300 pl-4 my-4 text-gray-600 bg-gray-50 italic'>
            {children}
        </blockquote>
    );
};
