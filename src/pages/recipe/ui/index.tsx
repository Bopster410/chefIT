import { FunctionComponent } from 'react';
import Image from 'next/image';

export const RecipePage: FunctionComponent<{
    img: string;
    header: string;
    description: string;
    prepTime: number;
    cookingTime: number;
    servings: number;
    ingredients: {
        id: number;
        name: string;
        measures: { amount: number; unit: string };
    }[];
    steps: {
        number: number;
        description: string;
        time?: { number: number; unit: string };
    }[];
}> = ({
    img,
    header,
    description,
    prepTime,
    cookingTime,
    servings,
    ingredients,
    steps,
}) => {
    return (
        <div>
            {/* <Image
                src={img}
                alt='recipe'
                fill
            /> */}
            <div className='text-[32px] font-bold'>{header}</div>
            <div className='text-[16px]'>{description}</div>
            <div className='text-[20px] font-bold'>Подготовка</div>
            {ingredients.map(({ id, name, measures: { amount, unit } }) => (
                <div
                    key={id}
                    className='flex justify-between'
                >
                    <div>{name}</div>
                    <div>{`${amount} ${unit}`}</div>
                </div>
            ))}
            <div className='text-[20px] font-bold'>Приготовление</div>
            {steps.map(({ number, description, time }) => (
                <div key={number}>
                    <span className='me-8'>{number}</span>
                    <span>{description}</span>
                    {!!time && <div>{`${time.number} минут`}</div>}
                </div>
            ))}
        </div>
    );
};
