import { Navbar } from '@/widgets/navbar';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Snackbar } from '@mui/material';
import { RecipeWithFavorite } from '@/features/favoriteWrapper';

export const FavoritesPage: FunctionComponent<Props> = ({
    recipes,
    action,
    isSnackbarOpened,
    setIsOpened,
    lastRecipeRef,
    onRemoveFavorite,
}) => {
    return (
        <>
            <Snackbar
                open={isSnackbarOpened}
                autoHideDuration={3000}
                onClose={() => setIsOpened(false)}
                message='Удалено из избранного'
                action={action}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
            <div className='bg-white rounded-t-4xl h-full px-4 py-8'>
                <Navbar />

                <div className='w-full'>
                    <h5 className='mb-4 mt-5'>Избранное</h5>
                    <div className='grid grid-cols-2 mobile:grid-cols-3 gap-3'>
                        {recipes &&
                            recipes.map(
                                (
                                    {
                                        id,
                                        name,
                                        description,
                                        img,
                                        cookingTimeMinutes,
                                    },
                                    i
                                ) => (
                                    <div key={id}>
                                        <RecipeWithFavorite
                                            likedByDefault
                                            onRemove={onRemoveFavorite}
                                            id={id}
                                            name={name}
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
        </>
    );
};
