"use client";
import { FunctionComponent } from "react";
import { Props, RegError } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { UserInfoField } from "@/entities/user";

export const RegistrationPage: FunctionComponent<Props> = ({
  handleRegistration,
  error,
  errors,
}) => {
  const errorMap = errors?.reduce((acc, e) => {
    acc[e.type] = e.msg;
    return acc;
  }, {} as Record<RegError["type"], string>);

  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <form onSubmit={handleRegistration} className="space-y-4 mt-20">
      <UserInfoField
          required
          type="name"
          error={!!errorMap?.name}
          msgError={errorMap?.name}
        />
        <UserInfoField
          required
          type="surname"
          error={!!errorMap?.surname}
          msgError={errorMap?.surname}
        />
        <UserInfoField
          required
          type="login"
          error={!!errorMap?.login}
          msgError={errorMap?.login}
        />
        <UserInfoField
          required
          type="password"
          error={!!errorMap?.password}
          msgError={errorMap?.password}
        />
        <UserInfoField
          required
          type="password"
          name="password-approval"
          placeholder="Подтверждение пароля"
          error={!!errorMap?.passwordApproval}
          msgError={errorMap?.passwordApproval}
        />
        <div>
          {error !== "" && (
            <div
              className="bg-red-100 border mt-5 border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="font-bold">Ошибка:</span>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          <Button type="submit" color="gray" className="w-full mt-5">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
