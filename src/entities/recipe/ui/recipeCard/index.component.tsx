import Link from 'next/link';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';

export const RecipeCard: FunctionComponent<{
    id: number;
    name: string;
    description: string;
    image?: string;
}> = ({ id, name, image }) => {
    return (
        <Link href={`recipe/${id}`}>
            <div
                className={`relative bg-gray-100 flex flex-col gap-1.5 rounded-lg p-1.5 mobile:p-2.5 aspect-7/10`}
            >
                {image && (
                    <div className='relative aspect-square'>
                        <Image
                            className='rounded-lg'
                            fill
                            alt='image'
                            src={image}
                        />
                    </div>
                )}
                <div className='px-2 line-clamp-2 recipe-clamp mobile:text-[1rem]'>
                    {name}
                </div>
                <div className='ps-2 flex-1 items-end flex'>
                    <div className='flex items-center gap-0.5 text-gray-400 recipe-clamp-sm mobile:text-[0.875rem]'>
                        <AccessTimeFilledOutlinedIcon fontSize='inherit' />
                        <span>10</span>
                        <span>мин</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
