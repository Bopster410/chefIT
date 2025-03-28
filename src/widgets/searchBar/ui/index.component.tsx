import { InputField } from '@/shared/uikit/inputField';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Button } from '@/shared/uikit/button';
import CloseIcon from '@mui/icons-material/Close';

export const SearchBar: FunctionComponent<Props> = ({
    onChange,
    value,
    onClear,
    haveSuggestions,
    ...props
}) => {
    return (
        <div
            className={`flex ${
                haveSuggestions ? `rounded-t-lg` : 'rounded-lg mb-3'
            } p-2.5 bg-gray-100 `}
        >
            <InputField
                onChange={onChange ?? (() => {})}
                value={value ?? ''}
                id='search-input'
                {...props}
                placeholder='Поиск на chefIT'
            />
            <Button
                onClick={onClear}
                color='gray'
            >
                <CloseIcon />
            </Button>
        </div>
    );
};
