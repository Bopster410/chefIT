import {
    CircularProgress,
    // useTheme,
} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Button } from '@/shared/uikit/button';
import { Props } from './index.types';
import { TextArea } from '@/shared/uikit/textArea';
import clsx from 'clsx';

export const QueryTextArea = ({ className, isLoading, ...props }: Props) => {
    return (
        <div
            className={clsx(
                'border-2 border-gray-300 rounded-2xl',
                className,
                isLoading && 'bg-gray-100'
            )}
        >
            <div className='relative w-full flex gap-2 items-end'>
                {isLoading && (
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <CircularProgress
                            sx={{ color: 'var(--saffron-500)' }}
                        />
                    </div>
                )}
                <TextArea
                    fullWidth
                    {...props}
                />
                <div className='pe-2 pb-2'>
                    <Button
                        size='md'
                        type='submit'
                        circle
                        color='saffron'
                        disabled={isLoading}
                        disabledVisual
                    >
                        <ArrowOutwardIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};
