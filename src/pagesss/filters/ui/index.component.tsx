import { FunctionComponent } from "react";
import { Props } from "./index.types";
import { BackButton } from "@/features/backButton";
import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@/shared/uikit/chip";

export const FiltersPage: FunctionComponent<Props> = ({
  type,
  filters,
  onSelectFilter,
}) => {
  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 z-10">
        <BackButton circle color="white">
          <CloseIcon />
        </BackButton>
      </div>
      <div className="bg-white rounded-t-4xl h-full px-4 py-8">
        <h3>{type === "diet" ? "Диеты" : "Типы блюд"}</h3>
        {filters &&
          filters.map((filter, index) => (
            <Chip className="mt-2 mr-5" onClick={() => onSelectFilter(filter)} key={index}>
              {filter}
            </Chip>
          ))}
      </div>
    </div>
  );
};
