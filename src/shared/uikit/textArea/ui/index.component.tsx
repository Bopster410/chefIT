import {
    TextField,
    TextFieldProps,
    TextFieldVariants,
    useTheme,
} from '@mui/material';

export const TextArea = <Variant extends TextFieldVariants>(
    props: {
        variant?: Variant;
    } & Omit<TextFieldProps, 'variant'>
) => {
    const theme = useTheme();

    return (
        <TextField
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.grey[400],
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.grey[400],
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.grey[400],
                    },
                    '&.Mui-focused': {
                        boxShadow: 'none', // отключаем вспышку
                    },
                },
            }}
            multiline
        />
    );
};
