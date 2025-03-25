import { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    onClear: () => void;
    haveSuggestions: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
