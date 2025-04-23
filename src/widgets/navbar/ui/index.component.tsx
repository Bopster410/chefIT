'use client';

import { TimersContext } from '@/app/providers/timers';
import { Button } from '@/shared/uikit/button';
import Link from 'next/link';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useState } from 'react';
import { useContext } from 'use-context-selector';
import { MainSideBar } from '@/features/mainSideBar/ui/index.component';
import { TimersBottomSheet } from './timersBottomSheet';
import { userLogout, useUserWithFetch } from '@/entities/user';
import { useLogout } from '@/app/providers/userProvider';

export const Navbar = () => {
    const { timers } = useContext(TimersContext);
    const [sideBarOpened, setSideBarOpened] = useState(false);

    const user = useUserWithFetch();
    const logout = useLogout();   

    const handleLogout = () => {
        logout();
        userLogout();
      }

    return (
        <>
            <MainSideBar
                sideBarOpened={sideBarOpened}
                onCloseSideBar={() => setSideBarOpened(false)}
                user={user}
                logout={handleLogout}
            ></MainSideBar>
            <nav className='h-navbar-height flex justify-between items-center bg-white mb-2 w-full'>
                <Button
                    color='gray'
                    onClick={() => setSideBarOpened((opened) => !opened)}
                >
                    <DensityMediumIcon />
                </Button>
                <Link
                    className='font-bold text-[40px]'
                    href={'/'}
                >
                    chefIT
                </Link>
                <TimersBottomSheet timers={timers} />
            </nav>
        </>
    );
};
