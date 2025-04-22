"use client";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { InputField } from "@/shared/uikit/inputField";

export const RegistrationPage: FunctionComponent<Props> = ({
  name,
  surname,
  login,
  password,
  setName,
  setSurname,
  setLogin,
  setPassword,
  handleRegistration,
  error,
}) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <form onSubmit={handleRegistration} className="space-y-4 mt-20">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Имя
          </label>
          <InputField
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={setName}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Фамилия
          </label>
          <InputField
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={setSurname}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="login"
            className="block text-sm font-medium text-gray-700"
          >
            Логин
          </label>
          <InputField
            type="text"
            id="login"
            name="login"
            value={login}
            onChange={setLogin}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Пароль
          </label>
          <InputField
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={setPassword}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {error !== "" && (
            <div
              className="bg-red-100 border mt-5 border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <span className="font-bold">Ошибка:</span>
              <span className="block sm:inline ml-2">
                Возникла проблема при регистрации.
              </span>
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
