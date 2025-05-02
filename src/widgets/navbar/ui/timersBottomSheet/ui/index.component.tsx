'use client';

import { TimerContainer } from '@/entities/timer/ui/index.container';
import { BottomSheet } from '@/shared/uikit/bottomSheet';
import { Button } from '@/shared/uikit/button';
import { FunctionComponent, useState } from 'react';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';

const snapPoints = [0.7, 0.98];

export const TimersBottomSheet: FunctionComponent<{
    timers: {
        [step: string]: {
            number: number;
            description: string;
        };
    } | null;
}> = ({ timers }) => {
    const [snapPoint, setSnapPoint] = useState<number | string | null>(
        snapPoints[0]
    );

    return (
        <BottomSheet.Root
            snapPoints={snapPoints}
            activeSnapPoint={snapPoint}
            setActiveSnapPoint={setSnapPoint}
            fadeFromIndex={0}
        >
            <BottomSheet.Portal>
                <BottomSheet.Overlay />
                <BottomSheet.Content className='h-full px-4'>
                    <BottomSheet.Title asChild>
                        <h5 className='mb-8'>Таймеры</h5>
                    </BottomSheet.Title>
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
                </BottomSheet.Content>
            </BottomSheet.Portal>
            <BottomSheet.Trigger asChild>
                <Button color='gray'>
                    <AccessTimeFilledOutlinedIcon />
                </Button>
            </BottomSheet.Trigger>
        </BottomSheet.Root>
    );
};
