import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { SideBar } from '@/shared/uikit/sideBar';
import Link from 'next/link';
import { Button } from '@/shared/uikit/button';
import PersonIcon from "@mui/icons-material/Person";

export const MainSideBar: FunctionComponent<Props> = ({
    onCloseSideBar,
    sideBarOpened,
    user,
    logout,
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
                        {user? 
                            <Link className='flex items-center gap-2 mt-4 mb-2 px-2 text-gray-800' href="/profile">
                                <PersonIcon />
                                <h6 className="font-medium">{user.name} {user.surname}</h6>
                            </Link>
                            :
                            <Link href="/login">
                                <Button className='w-full'>Войти</Button>
                            </Link>
                        }
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
                            href='/profile'
                            className=''
                        >
                            <h6>Профиль</h6>
                        </Link>
                        {user && 
                            <Button onClick={logout} className='mt-5'>Выйти</Button>
                        }
                    </nav>
                </SideBar.Content>
            </SideBar.Portal>
        </SideBar.Root>
    );
};
