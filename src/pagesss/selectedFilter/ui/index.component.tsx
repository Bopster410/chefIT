import { Navbar } from '@/widgets/navbar';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { RecipeWithFavorite } from '@/features/favoriteWrapper';

export const SelectedFilterPage: FunctionComponent<Props> = ({
    label,
    recipes,
    lastRecipeRef,
}) => {
    return (
        <div className='bg-white rounded-t-4xl h-full px-4 py-8'>
            <Navbar />
            <div className='w-full'>
                <h4 className='mb-5'>{label}</h4>

                <div className='grid grid-cols-2 mobile:grid-cols-3 gap-3'>
                    {recipes.length > 0 &&
                        recipes.map(
                            (
                                {
                                    id,
                                    name,
                                    description,
                                    img,
                                    cookingTimeMinutes,
                                    isFavorite,
                                },
                                i
                            ) => (
                                <div key={id}>
                                    <RecipeWithFavorite
                                        id={id}
                                        name={name}
                                        likedByDefault={isFavorite}
                                        description={description}
                                        image={img}
                                        link={`recipe/${id}`}
                                        cookingTime={cookingTimeMinutes}
                                    />

                                    {i === recipes.length - 1 && (
                                        <div ref={lastRecipeRef}></div>
                                    )}
                                </div>
                            )
                        )}
                </div>
            </div>
        </div>
    );
};
