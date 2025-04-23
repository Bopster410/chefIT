"use client";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { Button } from "@/shared/uikit/button";
import { InputField } from "@/shared/uikit/inputField";
import { UserInfoField } from "@/entities/user";

export const RegistrationPage: FunctionComponent<Props> = ({
  handleRegistration,
  error,
}) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <form onSubmit={handleRegistration} className="space-y-4 mt-20">
        <UserInfoField required type="name"/>
        <UserInfoField required type="surname"/>
        <UserInfoField required type="login"/>
        <UserInfoField required type="password"/>
        <div>
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
