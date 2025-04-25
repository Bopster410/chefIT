import { User } from "@/entities/user";

export interface EditError{
    type: "name"|"surname"|"login"|"password"|"oldPassword"|"passwordApproval";
    msg: string;
}

export interface Props{
    user: User;
    handleChange: (e: React.FormEvent<HTMLFormElement>) => void;
    errors?: EditError[];
}