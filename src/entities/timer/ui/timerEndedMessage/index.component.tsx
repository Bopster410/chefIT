import { Button } from '@/shared/uikit/button';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { formatSeconds } from '../../lib';

export const TimerEndedMessage: FunctionComponent<Props> = ({
    stepNum,
    numOfSeconds,
    description,
    finishTimer,
}) => {
    return (
        <div className='h-[75vh] flex flex-col gap-4'>
            <div>
                <div className='font-bold text-3xl flex'>
                    Таймер закончился!
                </div>
                <div className='flex gap-2 items-center text-gray-500 font-semibold text-xl'>
                    <div>Шаг {stepNum}</div>•
                    <div className='flex items-center'>
                        <AccessTimeFilledOutlinedIcon fontSize='inherit' />
                        {formatSeconds(numOfSeconds)}
                    </div>
                </div>
            </div>
            <div className='text-xl mb-2'>{description}</div>
            <div className='flex-1 w-full content-end'>
                <Button
                    color='gray'
                    className='w-full'
                    onClick={finishTimer}
                >
                    Завершить
                </Button>
            </div>
        </div>
    );
};
