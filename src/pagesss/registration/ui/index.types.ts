export interface Props{
    name: string;
    surname: string;
    login: string;
    password: string;
    setName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSurname: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegistration: (e: React.FormEvent) => void;

    error?: string;
}