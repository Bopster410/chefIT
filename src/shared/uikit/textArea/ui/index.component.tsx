'use client';

import { TextField } from '@mui/material';
import { Props } from './index.types';
import { ChangeEventHandler, useCallback, useState } from 'react';

const MAX_LENGTH = 1024;
const DEFAULT_MAX_LENGTH = 512;

export const TextArea = ({
    maxLength = DEFAULT_MAX_LENGTH,
    ...props
}: Props) => {
    const [value, setValue] = useState<string | null>(null);
    maxLength =
        maxLength <= 0 || maxLength > MAX_LENGTH
            ? DEFAULT_MAX_LENGTH
            : maxLength;

    const handleInput: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
        (event) => {
            setValue(event.target.value.slice(0, maxLength));
        },
        [maxLength]
    );

    return (
        <TextField
            {...props}
            value={value}
            onChange={handleInput}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: 'none',
                    },
                    '&:hover fieldset': {
                        border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },
                    '&.Mui-focused': {
                        boxShadow: 'none',
                    },
                },
            }}
            multiline
        />
    );
};
