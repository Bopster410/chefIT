import { FunctionComponent } from "react";
import { Props } from "./index.types";

export const FiltersPage: FunctionComponent<Props> = ({ diets }) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      {diets && diets.map((diet, index) => <div key={index}> 
        {diet}
      </div>)}
    </div>
  );
};
