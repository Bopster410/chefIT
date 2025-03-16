// 'use client';

// import { getRecipeData } from '@/entities/recipe/api';
// import { FunctionComponent, useEffect, useState } from 'react';
// export const RecipePageContainer: FunctionComponent<{ id: number }> = ({
//     id,
// }) => {
//     const [recipe, setRecipe] = useState<{
//         img: string;
//         header: string;
//         description: string;
//         prepTime: number;
//         cookingTime: number;
//         servings: number;
//         ingredients: {
//             id: number;
//             name: string;
//             measures: { amount: number; unit: string };
//         }[];
//         steps: {
//             number: number;
//             description: string;
//             time?: { number: number; unit: string };
//         }[];
//     } | null>(null);

//     useEffect(() => {
//         getRecipeData(id).then(({ data }) => {
//             const newRecipes = data.map(
//                 ({ img, name, description, steps }) => ({
//                     id,
//                     name,
//                     description,
//                     image: img,
//                     steps,
//                     ingredients: {id: }
//                 })
//             );
//             setRecipe(newRecipes);
//         });
//     }, []);

//     return;
// };
