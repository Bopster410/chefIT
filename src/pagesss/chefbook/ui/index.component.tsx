"use client"
import { Navbar } from "@/widgets/navbar";
import { FunctionComponent } from "react";
import { Props } from "./index.types";
import Link from "next/link";
import { Button } from "@/shared/uikit/button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";

export const ChefBookPage: FunctionComponent<Props> = ({ recipes, openModal }) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <Navbar />
      {recipes ? (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <AccessTimeIcon fontSize="small" className="mr-1" />
                  {recipe.time} мин
                </div>
              </div>

              <Link href={`/chefbook/${recipe.id}`} className="mt-4">
                <Button color="saffron" className="w-full">
                  Готовить
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-16">
          <p className="text-lg font-medium">Рецепты не найдены</p>
          <p className="text-sm mt-1">Добавьте первый рецепт, чтобы начать!</p>
        </div>
      )}
      <Button onClick={openModal} circle color="violet" className="fixed bottom-6">
        <AddIcon /> Новый рецепт
      </Button>
    </div>
  );
};
