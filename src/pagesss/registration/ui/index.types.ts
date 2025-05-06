export interface Props{
    handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
    error?: string;
    errors?: RegError[];
}

export interface RegError{
    type: "name"|"surname"|"login"|"password"|"passwordApproval";
    msg: string;
}