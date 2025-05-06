'use client';
import { Navbar } from '@/widgets/navbar';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import AddIcon from '@mui/icons-material/Add';
import { RecipeCard } from '@/entities/recipe';
import Link from 'next/link';

export const ChefBookPage: FunctionComponent<Props> = ({
    recipes,
    openModal,
}) => {
    return (
        <div className='bg-white rounded-t-4xl h-full px-4 py-8'>
            <Navbar />
            {recipes ? (
                <div className='grid grid-cols-2 gap-4 mt-6'>
                    {recipes.map((recipe) => (
                        <Link
                            href={`/chefbook/${recipe.id}`}
                            key={recipe.id}
                        >
                            <RecipeCard {...recipe} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center text-center text-gray-500 py-16'>
                    <p className='text-lg font-medium'>Рецепты не найдены</p>
                    <p className='text-sm mt-1'>
                        Добавьте первый рецепт, чтобы начать!
                    </p>
                </div>
            )}
            <Button
                onClick={openModal}
                circle
                color='saffron'
                className='fixed bottom-6 right-6 px-0'
            >
                <AddIcon />
            </Button>
        </div>
    );
};
