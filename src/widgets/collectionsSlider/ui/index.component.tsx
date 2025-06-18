import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { CollectionCard } from '@/entities/recipe/ui/collectionCard';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import clsx from 'clsx';

const BG_COLORS = [
    'bg-blue-300',
    'bg-emerald-300',
    'bg-red-300',
    'bg-amber-300',
];

export const CollectionSlider: FunctionComponent<Props> = ({ collections }) => {
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                navigation={true}
                modules={[Navigation]}
                spaceBetween={10}
            >
                {collections.map(({ id, name }, index) => (
                    <SwiperSlide key={id}>
                        <div className='relative flex'>
                            <Link
                                href={`/collection/${id}`}
                                className='absolute top-0 bottom-0 left-0 right-0'
                            />
                            <CollectionCard
                                id={id}
                                name={name}
                                className={clsx(
                                    BG_COLORS[index % BG_COLORS.length]
                                )}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
