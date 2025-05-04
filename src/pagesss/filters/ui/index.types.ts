export interface Props {
  filters: string[];
  onSelectFilter: (filter:string) => void;
  type: "diet" | "dishType";
}
