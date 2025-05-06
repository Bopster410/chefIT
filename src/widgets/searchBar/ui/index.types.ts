import { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    onClear: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
