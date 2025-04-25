"use client";
import { VKIDOAuthWidget } from "@/widgets/VKIDAuth";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { UserInfoField } from "@/entities/user";

export const LoginPage: FunctionComponent<Props> = ({ handleLogin, error }) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <form onSubmit={handleLogin} className="space-y-4 mt-20">
        <UserInfoField type="login" />
        <UserInfoField type="password" />

        <div>
          <Button type="submit" color="gray" className="w-full">
            Войти
          </Button>
        </div>

        {error !== "" && (
          <div
            className="bg-red-100 border mt-5 border-red-400 text-red-700 px-4 py-3 rounded"
            role="alert"
          >
            <span className="font-bold">Ошибка:</span>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

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
