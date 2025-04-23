export interface Props{
    login: string;
    password: string;
    setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogin: (e: React.FormEvent) => void;
}