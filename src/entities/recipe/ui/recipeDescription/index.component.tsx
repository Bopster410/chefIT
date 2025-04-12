import { FunctionComponent } from 'react';
import { Props } from './index.types';
import Image from 'next/image';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';

export const RecipeDescription: FunctionComponent<Props> = ({
    img,
    name,
    description,
    ingredients,
    steps,
}) => {
    return (
        <div>
            {img && (
                <div className='relative w-full h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]'>
                    <Image
                        src={img}
                        alt='recipe'
                        fill
                        className='object-cover'
                    />
                </div>
            )}
            <div className='text-[32px] font-bold'>{name}</div>
            <div className='text-[16px]'>{description}</div>
            <div className='text-[20px] font-bold mt-4 mb-2'>Подготовка</div>
            {ingredients.map(({ id, name, amount, unit }) => (
                <div
                    key={id}
                    className='flex justify-between relative'
                >
                    <div className='bg-white pr-1 relative z-10'>{name}</div>
                    <div className='bg-white pl-1 relative z-10'>{`${amount} ${unit}`}</div>
                    <div className='absolute left-0 right-0 border-b border-dotted border-gray-400 bottom-1 -z-0'></div>
                </div>
            ))}
            <div className='text-[20px] font-bold mt-4 mb-2'>Приготовление</div>
            <div className='flex flex-col gap-1.5'>
                {steps.map(({ number, step, length }) => (
                    <div
                        key={number}
                        className='flex gap-4'
                    >
                        <div>
                            <div className='font-bold border rounded-full size-6 flex justify-center items-center'>
                                {number}
                            </div>
                        </div>
                        <div>
                            <div>{step}</div>
                            {!!length && (
                                <div className='flex items-end gap-2'>
                                    <AccessTimeFilledOutlinedIcon />
                                    {`${length.number} ${length.unit}`}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
