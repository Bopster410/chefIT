export interface Props{
    handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
    error?: string;
}