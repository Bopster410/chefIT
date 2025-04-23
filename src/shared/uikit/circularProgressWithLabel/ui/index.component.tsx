import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PERCENT_COLORS = ['#CE3903', '#CE8D03', '#CECE03', '#03CE10'];
const PERCENTS_PER_COLOR = 25;

function percentColor(percent: number) {
    if (percent < 0 || percent > 100) return PERCENT_COLORS[0];

    const colorInd = Math.round(percent / PERCENTS_PER_COLOR);
    if (!(colorInd in PERCENT_COLORS)) return PERCENT_COLORS[0];

    return PERCENT_COLORS[colorInd];
}

export const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => {
    const color = percentColor(props.value);
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant='determinate'
                thickness={4}
                size={66}
                sx={{
                    '&.MuiCircularProgress-root': {
                        color: color,
                    },
                }}
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    className={`font-bold text-xl`}
                    style={{ color }}
                >{`${Math.round(props.value)}`}</div>
            </Box>
        </Box>
    );
};
