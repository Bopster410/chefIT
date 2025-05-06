export interface Props{
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
    handleError: () => void;
    error: string;
}