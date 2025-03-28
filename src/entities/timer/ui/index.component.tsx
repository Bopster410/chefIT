import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { formatSeconds } from '../lib';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';

export const Timer: FunctionComponent<Props> = ({
    secondsTotal,
    secondsLeft,
    description,
    collapsed,
}) => {
    secondsLeft = secondsLeft ?? secondsTotal;

    return (
        <div className={`bg-gray-100 rounded-xl px-4 py-3 flex gap-4`}>
            <div className={`${collapsed && 'line-clamp-2'} shrink-1`}>
                {description}
            </div>
            <div className='font-bold flex-1 basis-12 flex-col flex items-end gap-0.5'>
                {secondsLeft <= 0 ? (
                    'готово!'
                ) : (
                    <>
                        <AccessTimeFilledOutlinedIcon />
                        {formatSeconds(secondsLeft)}
                    </>
                )}
            </div>
        </div>
    );
};
