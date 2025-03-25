import Link from 'next/link';
import { FunctionComponent } from 'react';
export const RecipeCard: FunctionComponent<{
    id: number;
    name: string;
    description: string;
    image?: string;
}> = ({ id, name, description }) => {
    return (
        <Link href={`recipe/${id}`}>
            <div className='relative bg-gray-100 rounded-lg p-2'>
                {/* <Image
                    className='absolute'
                    alt='image'
                    src={
                        (id + 1) % 3 == 0 ? bg3 : (id + 1) % 2 == 0 ? bg2 : bg1
                    }
                ></Image> */}
                <div className='font-bold'>{name}</div>
                <div>{description}</div>
            </div>
        </Link>
    );
};
