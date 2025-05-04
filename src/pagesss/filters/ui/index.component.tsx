import { FunctionComponent } from "react";
import { Props } from "./index.types";
import Link from "next/link";

export const FiltersPage: FunctionComponent<Props> = ({ filters }) => {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      {filters && filters.map((filter, index) => <Link href={`diet/${filter}`} key={index}> 
        {filter}
      </Link>)}
    </div>
  );
};
