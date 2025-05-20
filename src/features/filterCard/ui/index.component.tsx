import Link from 'next/link';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { LABELS } from './index.constants';

export const FilterCard: FunctionComponent<Props> = ({ filterType, image }) => {
    return (
        <Link href={`/${filterType}`}>
            <div
                className={`relative bg-gray-200 flex flex-col gap-1.5 rounded-lg p-1.5 mobile:p-2.5`}
            >
                <div className='px-2 line-clamp-2 recipe-clamp mobile:text-[1rem]'>
                    {LABELS[filterType]}
                </div>
                {image && (
                    <div className='relative aspect-7/4'>
                        <Image
                            className='rounded-lg'
                            fill
                            alt='image'
                            src={image}
                        />
                    </div>
                )}
            </div>
        </Link>
    );
};
