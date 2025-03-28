'use client';

import { TimersContext } from '@/app/providers/timers';
import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { Button } from '@/shared/uikit/button';
import Link from 'next/link';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import { useContext, useState } from 'react';
import { TimerContainer } from '@/entities/timer/ui/index.container';

export const Navbar = () => {
    const [timersOpened, setTimersOpened] = useState(false);
    const { timers } = useContext(TimersContext);

    return (
        <nav className='h-navbar-height flex justify-between items-center bg-white mb-2 w-full'>
            <BottomSheet
                onOuterClick={() => setTimersOpened(false)}
                opened={timersOpened}
            >
                <div className='text-[32px] font-bold mb-8'>Таймеры</div>
                {!timers || Object.keys(timers).length === 0 ? (
                    <div className='text-[20px] font-semibold text-gray-300'>
                        Пока что здесь пусто
                    </div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        {Object.entries(timers).map(
                            ([stepNum, { number, description }]) => (
                                <div key={stepNum}>
                                    <TimerContainer
                                        stepNum={parseInt(stepNum)}
                                        secondsTotal={number}
                                        description={description}
                                    />
                                </div>
                            )
                        )}
                    </div>
                )}
            </BottomSheet>
            <Link
                className='font-bold text-[40px]'
                href={'/'}
            >
                chefIT
            </Link>
            <Button
                color='gray'
                onClick={() => setTimersOpened((opened) => !opened)}
            >
                <AccessTimeFilledOutlinedIcon />
            </Button>
        </nav>
    );
};
