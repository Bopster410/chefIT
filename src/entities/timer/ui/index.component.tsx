import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { formatSeconds } from '../lib';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button } from '@/shared/uikit/button';

export const Timer: FunctionComponent<Props> = ({
    secondsTotal,
    secondsLeft,
    description,
    collapsed,
    finishTimer,
}) => {
    secondsLeft = secondsLeft ?? secondsTotal;

    return (
        <div className={`bg-gray-100 rounded-xl px-4 py-3 flex gap-4`}>
            <div className={`${collapsed && 'line-clamp-2'} shrink-1`}>
                {description}
            </div>
            <div className='font-bold flex-1 basis-12 flex-col flex items-end gap-0.5'>
                <div className='flex gap-0.5 items-center'>
                    {secondsLeft <= 0 ? (
                        'готово!'
                    ) : (
                        <>
                            <AccessTimeFilledOutlinedIcon />
                            {formatSeconds(secondsLeft)}
                        </>
                    )}
                </div>
                <Button
                    color='gray'
                    size='sm'
                    onClick={finishTimer}
                >
                    <DeleteOutlineOutlinedIcon />
                </Button>
            </div>
        </div>
    );
};
