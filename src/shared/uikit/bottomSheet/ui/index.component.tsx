import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FunctionComponent } from 'react';
import { ContentProps, DialogProps, Drawer } from 'vaul';
import { Props } from './index.types';

const Root: FunctionComponent<DialogProps> = ({ children, ...props }) => {
    return <Drawer.Root {...props}>{children}</Drawer.Root>;
};

const Overlay: FunctionComponent<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
> = ({ className, ...props }) => (
    <Drawer.Overlay
        className={className ?? 'overlay-black'}
        {...props}
    />
);

const Content: FunctionComponent<ContentProps & Props> = ({
    children,
    className,
    withHandle = true,
    ...props
}) => (
    <Drawer.Content
        className={[
            `left-0 right-0 bottom-0 mt-24 rounded-t-xl drawer${
                withHandle && ' pt-5'
            }`,
            className ?? '',
        ].join(' ')}
        {...props}
    >
        {withHandle && (
            <Drawer.Handle className='mx-auto w-12 h-1.5 flex-shrink-0 mb-6' />
        )}
        {children}
    </Drawer.Content>
);

export const BottomSheet = {
    Root,
    NestedRoot: Drawer.NestedRoot,
    Content,
    Overlay,
    Trigger: DialogPrimitive.Trigger,
    Portal: Drawer.Portal,
    Handle: Drawer.Handle,
    Close: DialogPrimitive.Close,
    Title: DialogPrimitive.Title,
    Description: DialogPrimitive.Description,
};
