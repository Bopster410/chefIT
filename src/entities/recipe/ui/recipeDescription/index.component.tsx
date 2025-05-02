import { FunctionComponent } from 'react';
import { Props } from './index.types';
import Image from 'next/image';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import { CircularProgressWithLabel } from '@/shared/uikit/circularProgressWithLabel';
import { Tooltip } from '@mui/material';

export const RecipeDescription: FunctionComponent<Props> = ({
    img,
    name,
    description,
    ingredients,
    steps,
    healthScore,
}) => {
    return (
        <div className='relative z-0'>
            {img && (
                <div className='relative w-full h-[32vh] mobile:h-[40vh]'>
                    <Image
                        src={img}
                        alt='recipe'
                        fill
                        className='object-cover'
                    />
                </div>
            )}
            <div className={`${img && 'px-4'} flex flex-col gap-4 mt-4`}>
                <h5>{name}</h5>
                <div className='text-[16px]'>{description}</div>
                {healthScore && (
                    <div className='pt-2 flex gap-4'>
                        <CircularProgressWithLabel value={healthScore} />
                        <div>
                            <div className='font-bold text-xl'>
                                Оценка полезности
                            </div>
                        </div>
                    </div>
                )}
                <div className='text-[20px] font-bold mt-4 mb-2'>
                    Подготовка
                </div>
                {ingredients.map(({ id, name, amount, unit }) => (
                    <div
                        key={id}
                        className='flex justify-between items-end relative'
                    >
                        <Tooltip
                            title={name}
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -12],
                                            },
                                        },
                                    ],
                                },
                            }}
                        >
                            <span className='bg-white pr-1 relative z-1 max-w-48 truncate font-semibold text-violet-500 underline hover:no-underline hover:cursor-pointer'>
                                {name}
                            </span>
                        </Tooltip>
                        <div className='bg-white pl-1 relative z-1'>{`${
                            Math.round(amount * 10) / 10
                        } ${unit}`}</div>
                        <div className='absolute left-0 right-0 border-b border-dotted border-gray-400 bottom-1 -z-0'></div>
                    </div>
                ))}
                <div className='text-[20px] font-bold mt-4 mb-2'>
                    Приготовление
                </div>
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
        </div>
    );
};
