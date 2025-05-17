'use client';

import { CollectionCardProps } from '@/entities/recipe/ui/collectionCard';
import { useEffect, useState } from 'react';
import { CollectionSlider } from './index.component';
import { getAllCollections } from '@/entities/recipe/api';
import { STATUS } from '@/shared/api';

export const CollectionsSliderContainer = () => {
    const [collections, setCollections] = useState<CollectionCardProps[]>([]);

    useEffect(() => {
        getAllCollections().then(({ Status, Data }) => {
            if (Status !== STATUS.SUCCESS || !Data) return;

            setCollections(Data.map(({ id, name }) => ({ id, name })));
        });
    }, []);

    return <CollectionSlider collections={collections} />;
};
