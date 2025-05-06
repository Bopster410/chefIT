'use client';
import { FunctionComponent, useState } from 'react';
import { RegistrationPage } from './index.component';
import { getUser, userSignUp } from '@/entities/user';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/app/providers/userProvider';
import { validateUserField } from '@/entities/user/api';
import { RegError } from './index.types';

export const RegistrationPageContainer: FunctionComponent = () => {
    const [errors, setErrors] = useState<RegError[] | undefined>(undefined);
    const [backError, setBackError] = useState('');
    const setUser = useLogin();
    const router = useRouter();

    const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const login = formData.get('login') as string;
        const password = formData.get('password') as string;
        const surname = formData.get('surname') as string;
        const name = formData.get('name') as string;
        const passwordApproval = formData.get('password-approval') as string;

        const newErrors: RegError[] = [];

        let error = validateUserField(name, 'name');
        if (error) newErrors.push({ type: 'name', msg: error });

        error = validateUserField(surname, 'surname');
        if (error) newErrors.push({ type: 'surname', msg: error });

        error = validateUserField(login, 'login');
        if (error) newErrors.push({ type: 'login', msg: error });

        error = validateUserField(password, 'password');
        if (error) newErrors.push({ type: 'password', msg: error });

        if (password !== passwordApproval) {
            newErrors.push({
                type: 'passwordApproval',
                msg: 'Пароли не совпадают',
            });
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        } else {
            setErrors([]);
        }

        userSignUp(login, password, name, surname)
            .then((res) => {
                if (res.Status !== 200) throw new Error(res.MsgRus);
                getUser().then(({ Data }) => {
                    if (!Data) return;

                    setUser(Data);
                    router.push('./');
                });
            })
            .catch((error: Error) => {
                setBackError(error.message);
            });
    };

    return (
        <RegistrationPage
            handleRegistration={handleRegistration}
            errors={errors}
            error={backError}
        />
    );
};
