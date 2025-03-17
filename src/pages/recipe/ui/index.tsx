import { FunctionComponent } from 'react';
import Image from 'next/image';
import { RecipeDetailed } from '@/entities/recipe/api/index.types';

export const RecipePage: FunctionComponent<{
    recipe: RecipeDetailed
}> = ({ recipe }) => 
{
    return (
        <div>
            {/* <Image
                src={img}
                alt='recipe'
                fill
            /> */}
            <div className='text-[32px] font-bold'>{recipe.name}</div>
            <div className='text-[16px]'>{recipe.description}</div>
            <div className='text-[20px] font-bold'>Подготовка</div>
            {recipe.ingredients.map(({ id, name, measures: { amount, unit } }) => (
                <div
                    key={id}
                    className='flex justify-between'
                >
                    <div>{name}</div>
                    <div>{`${amount} ${unit}`}</div>
                </div>
            ))}
            <div className='text-[20px] font-bold'>Приготовление</div>
            {recipe.steps.map(({ number, description, time }) => (
                <div key={number}>
                    <span className='me-8'>{number}</span>
                    <span>{description}</span>
                    {!!time && <div>{`${time.number} минут`}</div>}
                </div>
            ))}
        </div>
    );
};
