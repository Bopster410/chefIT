import { FunctionComponent } from 'react';
import { Props } from './index.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { CollectionCard } from '@/entities/recipe/ui/collectionCard';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

export const CollectionSlider: FunctionComponent<Props> = ({ collections }) => {
    return (
        <>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                slidesPerView={'auto'}
                spaceBetween={10}
            >
                {collections.map(({ id, name }) => (
                    <SwiperSlide key={id}>
                        <div className='relative flex'>
                            <Link
                                href={`/collection/${id}`}
                                className='absolute top-0 bottom-0 left-0 right-0'
                            />
                            <CollectionCard
                                id={id}
                                name={name}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
