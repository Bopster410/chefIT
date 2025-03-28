import { FunctionComponent, PropsWithChildren } from 'react';
import { Props } from './index.types';

export const BottomSheet: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    opened,
    onOuterClick,
}) => {
    return (
        <div className='z-50'>
            <div
                onClick={() => {
                    if (onOuterClick && opened) onOuterClick();
                }}
                className={
                    opened ? 'fixed inset-0 bg-[#00000030]' : 'bg-transparent'
                }
            ></div>
            {opened && (
                <div className='fixed w-screen h-8/10 left-0 bottom-0 p-8 bg-white rounded-t-4xl'>
                    {children}
                </div>
            )}
        </div>
    );
};
