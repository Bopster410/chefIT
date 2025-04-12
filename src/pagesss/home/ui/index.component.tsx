import { Navbar } from "@/widgets/navbar";
import { SearchBarContainer } from "@/widgets/searchBar";
import { FunctionComponent } from "react";

export const HomePage: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <SearchBarContainer
          haveSuggestions={false}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filters={undefined}
          query=""
        />
      </div>
    </>
  );
};
