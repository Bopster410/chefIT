import { Button } from "@/shared/uikit/button";
import { FunctionComponent } from "react";
import { Props } from "./index.types";

export const FiltersSideBar: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onChangeSelect,
  onChangeRange,
  onApllySelect,
  onClear,
}) => {
  return (
    <aside
      className={`w-72 h-screen rounded-t-4xl rounded-r-2xl top-0 fixed z-50 overflow-y-auto
         bg-white p-4 shadow-lg ${
           isOpen ? "" : "hidden"
         }`}
    >
      <div className="flex mb-4 justify-between">
        <h2 className="text-lg font-semibold">Фильтры</h2>
        <Button circle color="white" onClick={onClose}>
          X
        </Button>
      </div>
      {filters.diets && (
        <div className="mb-4">
          <label>Диеты</label>
          <select
            name="diet"
            value={selectedFilters.diet}
            onChange={onChangeSelect}
            className="w-full p-2 border rounded"
          >
            <option></option>
            {filters.diets.map((diet) => (
              <option key={diet}>{diet}</option>
            ))}
          </select>
        </div>
      )}
      {filters.dishTypes && (
        <div className="mb-4">
          <label>Типы блюд</label>
          <select
            name="dishType"
            value={selectedFilters.dishType}
            onChange={onChangeSelect}
            className="w-full p-2 border rounded"
          >
            <option></option>
            {filters.dishTypes.map((dishType) => (
              <option key={dishType}>{dishType}</option>
            ))}
          </select>
        </div>
      )}

      {filters.time && (
        <div className="mb-4">
          <label>Время приготовления {selectedFilters.time?`до ${selectedFilters.time} мин`:""}</label>
          <input
            value={selectedFilters.time}
            onChange={onChangeRange}
            type="range"
            min={filters.time.min}
            max={filters.time.max}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>{filters.time.min}</span>
            <span>{filters.time.max}</span>
          </div>
        </div>
      )}
{/* TODO: Вынести кнопку в UI kit Button */}
      <button
        className=" hover:cursor-pointer bg-gray-200 p-2 rounded mb-2"
        onClick={() => onApllySelect()}
      >
        Применить фильтры
      </button>
      <button
        className="hover:cursor-pointer bg-gray-200 p-2 rounded mb-2"
        onClick={() => onClear()}
      >
        Очистить фильтры
      </button>
    </aside>
  );
};