import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { SideBar } from '@/shared/uikit/sideBar';
import Link from 'next/link';
import { Button } from '@/shared/uikit/button';

export const MainSideBar: FunctionComponent<Props> = ({
    onCloseSideBar,
    sideBarOpened,
}) => {
    return (
        <SideBar.Root
            open={sideBarOpened}
            onClose={onCloseSideBar}
            direction='left'
        >
            <SideBar.Portal>
                <SideBar.Overlay />
                <SideBar.Content
                    side='left'
                    className='px-6 py-6'
                >
                    <SideBar.Title asChild>
                        <Button>Войти</Button>
                    </SideBar.Title>
                    <nav className='flex flex-col gap-4 mt-6'>
                        <Link
                            href='/chefbook'
                            className=''
                        >
                            <h6>Мои рецепты</h6>
                        </Link>
                        <Link
                            href='/'
                            className=''
                        >
                            <h6>Избранное</h6>
                        </Link>
                        <Link
                            href='/'
                            className=''
                        >
                            <h6>Профиль</h6>
                        </Link>
                    </nav>
                </SideBar.Content>
            </SideBar.Portal>
        </SideBar.Root>
    );
};
