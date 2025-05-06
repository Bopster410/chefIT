import { Button } from '@/shared/uikit/button';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { SideBar } from '@/shared/uikit/sideBar';
import CloseIcon from '@mui/icons-material/Close';

export const FiltersSideBar: FunctionComponent<Props> = ({
    onClose,
    filters,
    selectedFilters,
    onChangeSelect,
    onChangeRange,
    onApllySelect,
    onClear,
    isOpen,
}) => {
    return (
        <>
            <SideBar.Root
                open={isOpen}
                direction='left'
                onClose={onClose}
            >
                <SideBar.Portal>
                    <SideBar.Overlay />
                    <SideBar.Content side='left'>
                        <div className='p-3'>
                            <div className='flex mb-4 justify-between'>
                                <h6 className='text-lg font-semibold'>
                                    Фильтры
                                </h6>
                                <Button
                                    circle
                                    color='white'
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </Button>
                            </div>
                            {filters.diets && (
                                <div className='mb-4'>
                                    <label>Диеты</label>
                                    <select
                                        name='diet'
                                        value={selectedFilters.diet}
                                        onChange={onChangeSelect}
                                        className='w-full p-2 border rounded'
                                    >
                                        <option></option>
                                        {filters.diets.map((diet) => (
                                            <option key={diet}>{diet}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {filters.dishTypes && (
                                <div className='mb-4'>
                                    <label>Типы блюд</label>
                                    <select
                                        name='dishType'
                                        value={selectedFilters.dishType}
                                        onChange={onChangeSelect}
                                        className='w-full p-2 border rounded'
                                    >
                                        <option></option>
                                        {filters.dishTypes.map((dishType) => (
                                            <option key={dishType}>
                                                {dishType}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {filters.time && (
                                <div className='mb-4'>
                                    <label>
                                        Время приготовления{' '}
                                        {selectedFilters.time
                                            ? `до ${selectedFilters.time} мин`
                                            : ''}
                                    </label>
                                    <input
                                        value={selectedFilters.time}
                                        onChange={onChangeRange}
                                        type='range'
                                        min={filters.time.min}
                                        max={filters.time.max}
                                        className='w-full'
                                    />
                                    <div className='flex justify-between'>
                                        <span>{filters.time.min}</span>
                                        <span>{filters.time.max}</span>
                                    </div>
                                </div>
                            )}
                            <Button
                                color='gray'
                                className='mb-2'
                                onClick={() => onApllySelect()}
                            >
                                Применить фильтры
                            </Button>
                            <Button
                                color='gray'
                                className='mb-2'
                                onClick={() => onClear()}
                            >
                                Очистить фильтры
                            </Button>
                        </div>
                    </SideBar.Content>
                </SideBar.Portal>
            </SideBar.Root>
        </>
    );
};
