import { FunctionComponent, PropsWithChildren } from 'react';
export const Container: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    return (
        <div className='w-full mobile:w-(--breakpoint-mobile)'>{children}</div>
    );
};
