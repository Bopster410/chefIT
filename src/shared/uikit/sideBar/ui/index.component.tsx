import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FunctionComponent, PropsWithChildren } from 'react';
import { ContentProps, DialogProps, Drawer } from 'vaul';
import { Props } from './index.types';

const Root: FunctionComponent<DialogProps> = ({ children, ...props }) => {
    return (
        <Drawer.Root
            {...props}
            handleOnly
        >
            {children}
        </Drawer.Root>
    );
};

const Overlay: FunctionComponent<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
> = ({ className, ...props }) => (
    <Drawer.Overlay
        className={[className ?? '', 'overlay-black'].join(' ')}
        {...props}
    />
);

const Content: FunctionComponent<ContentProps & Props> = ({
    children,
    className,
    side,
    ...props
}) => {
    return (
        <Drawer.Content
            className={[
                className ?? '',
                `${
                    side === 'right'
                        ? 'right-0 rounded-l-xl'
                        : 'left-0 rounded-r-xl'
                } top-0 bottom-0 fixed z-10 outline-none w-[310px] flex drawer`,
            ].join(' ')}
            {...props}
        >
            {children}
        </Drawer.Content>
    );
};

const Portal: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <Drawer.Portal>
        <div className='z-50'>{children}</div>
    </Drawer.Portal>
);

export const SideBar = {
    Root,
    NestedRoot: Drawer.NestedRoot,
    Content,
    Overlay,
    Trigger: DialogPrimitive.Trigger,
    Portal: Portal,
    Handle: Drawer.Handle,
    Close: DialogPrimitive.Close,
    Title: DialogPrimitive.Title,
    Description: DialogPrimitive.Description,
};
