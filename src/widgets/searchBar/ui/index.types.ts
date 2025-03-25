import { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    onClear: () => void;
    haveSuggestions: Boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
