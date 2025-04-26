import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';

export const TextFieldCustom = <Variant extends TextFieldVariants>(
    props: {
        variant?: Variant;
    } & Omit<TextFieldProps, 'variant'>
) => {
    return <TextField {...props} />;
};
