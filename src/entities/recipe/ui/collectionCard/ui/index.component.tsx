import clsx from 'clsx';
import { Props } from './index.types';
import { FunctionComponent } from 'react';

export const CollectionCard: FunctionComponent<Props> = ({
    name,
    className,
}) => {
    return (
        <div className={clsx('rounded-2xl h-20 w-72 pt-2 pl-7', className)}>
            <h6 className='leading-7 line-clamp-2'>{name}</h6>
        </div>
    );
};
