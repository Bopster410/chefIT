"use client";
import { FunctionComponent } from "react";
import { EditError, Props } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { UserInfoField } from "@/entities/user";

export const ProfileEditPage: FunctionComponent<Props> = ({
  user,
  handleChange,
  errors,
}) => {
  const errorMap = errors?.reduce((acc, e) => {
    acc[e.type] = e.msg;
    return acc;
  }, {} as Record<EditError["type"], string>);

  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Профиль пользователя</h3>
      <form onSubmit={handleChange} className="space-y-4 mb-8">
        <UserInfoField
          type="name"
          defaultValue={user.name}
          error={!!errorMap?.name}
          msgError={errorMap?.name}
        />
        <UserInfoField
          type="surname"
          defaultValue={user.surname}
          error={!!errorMap?.surname}
          msgError={errorMap?.surname}
        />
        <UserInfoField
          type="login"
          defaultValue={user.login}
          error={!!errorMap?.login}
          msgError={errorMap?.login}
        />
        <UserInfoField
          type="password"
          name="old-password"
          label="Текущий пароль"
          placeholder="Старый пароль"
          error={!!errorMap?.oldPassword}
          msgError={errorMap?.oldPassword}
        />
        <UserInfoField
          type="password"
          placeholder="Новый пароль"
          error={!!errorMap?.password}
          msgError={errorMap?.password}
        />
        <UserInfoField
          type="password"
          name="password-approval"
          placeholder="Подтверждение пароля"
          error={!!errorMap?.passwordApproval}
          msgError={errorMap?.passwordApproval}
        />
        {errors && errors.length > 0 && (
          <div
            className="bg-red-100 border mt-5 border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="font-bold">Ошибка:</span>
            <span className="block sm:inline ml-2">
              Возникла проблема при изменении профиля.
            </span>
          </div>
        )}

        {errors && errors.length === 0 && (
          <div
            className="bg-green-100 border mt-5 border-green-400 text-green-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="font-bold">Успех:</span>
            <span className="block sm:inline ml-2">
              Профиль успешно обновлён.
            </span>
          </div>
        )}
        <Button type="submit">Сохранить изменения</Button>
      </form>
    </div>
  );
};
