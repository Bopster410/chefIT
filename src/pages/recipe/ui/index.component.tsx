import { FunctionComponent } from 'react';
import { Props } from './index.types';

export const RecipePage: FunctionComponent<Props> = ({
    name,
    description,
    ingredients,
    steps,
}) => {
    return (
        <div className='bg-white rounded-t-4xl h-full pt-4 px-4'>
            {/* <Image
                src={img}
                alt='recipe'
                fill
            /> */}
            <div className='text-[32px] font-bold'>{name}</div>
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
            {steps.map(({ number, step, length }) => (
                <div key={number}>
                    <span className='me-8'>{number}</span>
                    <span>{step}</span>
                    {!!length && <div>{`${length.number} минут`}</div>}
                </div>
            ))}
        </div>
    );
};
