import { Props } from './index.types';
import { FunctionComponent } from 'react';

export const CollectionCard: FunctionComponent<Props> = ({ name }) => {
    return (
        <div className='rounded-2xl h-20 w-72 border border-amber-200'>
            {name}
        </div>
    );
};
