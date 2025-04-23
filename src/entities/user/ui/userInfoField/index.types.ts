import { InputFieldProps } from "@/shared/uikit/inputField/ui";

export interface Props extends InputFieldProps{
    required?: boolean,
    error?: boolean,
    type: "name"|"surname"|"password"|"login",
    name?: string,
    label?: string,
}