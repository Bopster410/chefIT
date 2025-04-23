"use client";
import { VKIDOAuthWidget } from "@/widgets/VKIDAuth";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { InputField } from "@/shared/uikit/inputField";

export const LoginPage: FunctionComponent<Props> = ({
  login,
  password,
  setLogin,
  setPassword,
  handleLogin,
}) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
        <form onSubmit={handleLogin} className="space-y-4 mt-20">
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-700"
            >
              Логин
            </label>
            <InputField
              type="login"
              id="login"
              name="login"
              value={login}
              onChange={(e) => setLogin(e)}
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
              onChange={(e) => setPassword(e)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <Button type="submit" color="gray" className="w-full">
              Войти
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{" "}
              <a
                href="/register"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Зарегистрируйтесь
              </a>
            </p>
          </div>
        </form>

        <VKIDOAuthWidget />
      </div>
  );
};
