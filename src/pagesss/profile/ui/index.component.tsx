"use client";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import Link from "next/link";
import { Button } from "@/shared/uikit/button";

export const ProfilePage: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Профиль пользователя</h3>
      <div className="space-y-4 mb-8">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Имя</span>
          <span className="text-lg font-medium">{user.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Фамилия</span>
          <span className="text-lg font-medium">{user.surname}</span>
        </div>
        {!user.isVKUser && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Логин</span>
            <span className="text-lg font-medium">{user.login}</span>
          </div>
        )}
      </div>
      {user.isVKUser ? (
        <></>
      ) : (
        <Link href="/profile/edit">
          <Button>Изменить информацию</Button>
        </Link>
      )}
    </div>
  );
};
