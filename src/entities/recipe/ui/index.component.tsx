import Link from 'next/link';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import bg1 from './bg1.png';
import bg2 from './bg2.png';
import bg3 from './bg3.png';
export const RecipeCard: FunctionComponent<{
    id: number;
    name: string;
    description: string;
    image?: string;
}> = ({ id, name, description, image }) => {
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
