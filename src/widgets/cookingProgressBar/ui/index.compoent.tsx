import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import Link from 'next/link';
import { Timer } from '@/entities/timer';
import { formatSeconds } from '@/entities/timer/lib';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';

export const CookingProgressBar: FunctionComponent<Props> = ({
    id,
    name,
    currentStep: { number, step, length },
    timerSecondsLeft,
    nextStep,
    prevStep,
    totalSteps,
    endCooking,
    addTimer,
}) => {
    return (
        <div className='fixed bottom-0 w-[inherit] p-4 bg-white shadow-status-bar flex gap-8 items-center'>
            {number > 1 && (
                <Button
                    color='gray'
                    onClick={prevStep}
                >
                    <ArrowBackIosNewIcon />
                </Button>
            )}
            <div className='flex gap-2 w-full'>
                <div>
                    <div className='font-bold border-2 rounded-full size-8 flex justify-center items-center text-xl'>
                        {number}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <Link
                        href={`/recipe/${id}`}
                        className='font-bold'
                    >
                        {name}
                    </Link>
                    {timerSecondsLeft ? (
                        <Timer
                            secondsTotal={timerSecondsLeft}
                            description={step}
                            collapsed
                        />
                    ) : (
                        <>
                            <div
                                className={`${
                                    length ? 'line-clamp-2' : 'line-clamp-4'
                                }`}
                            >
                                {step}
                            </div>
                            {length && (
                                <div className='flex gap-6 mt-2'>
                                    <span className='flex gap-2 items-center'>
                                        <AccessTimeFilledOutlinedIcon />
                                        таймер на {formatSeconds(length)}
                                    </span>
                                    <Button
                                        size='sm'
                                        color='gray'
                                        onClick={addTimer}
                                    >
                                        Добавить
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Button
                color='gray'
                onClick={number === totalSteps ? endCooking : nextStep}
            >
                {number === totalSteps ? 'завершить' : <ArrowForwardIosIcon />}
            </Button>
        </div>
    );
};
