export type Ingredient = {
    id: number;
    name: string;
    measures: {
        amount: number;
        unit: string;
    };
};
