'use client';

import { useSpring, animated } from '@react-spring/web';
import { FunctionComponent, useEffect, useState } from 'react';

const blobs = [
    'M28.2,-14.1C42.9,-4.1,65.6,8,67.5,21.8C69.5,35.6,50.8,51.1,32,56.2C13.2,61.3,-5.7,56.1,-15.7,46.1C-25.7,36.1,-26.9,21.2,-26.6,9.7C-26.3,-1.8,-24.7,-10.1,-20,-17.8C-15.3,-25.5,-7.7,-32.6,-0.4,-32.3C6.8,-31.9,13.6,-24.1,28.2,-14.1Z',
    'M51.5,-38.7C64.7,-24.5,72,-3.2,65.1,9.9C58.1,23.1,37.1,28.1,18.6,36C0.2,43.8,-15.6,54.5,-22.5,49.9C-29.5,45.4,-27.6,25.6,-29,9.4C-30.5,-6.7,-35.3,-19.3,-31,-31.5C-26.7,-43.6,-13.3,-55.4,2.9,-57.7C19.1,-60,38.3,-52.9,51.5,-38.7Z',
    'M35.4,-24.4C46.5,-14.2,56.7,0.5,53.1,10.3C49.4,20.2,31.9,25.1,15.1,34.3C-1.7,43.6,-17.9,57.1,-36.3,55.8C-54.7,54.4,-75.3,38.2,-78.7,19.1C-82.2,0,-68.5,-21.8,-52.5,-33.1C-36.5,-44.4,-18.2,-45.1,-3.1,-42.6C12.1,-40.2,24.2,-34.6,35.4,-24.4Z',
    'M37,-22.7C52.5,-10,72.9,5.7,73.1,21.6C73.4,37.5,53.5,53.6,33.6,59.1C13.7,64.5,-6.1,59.3,-20.7,49.7C-35.2,40.1,-44.5,26.2,-50,9.3C-55.5,-7.5,-57.2,-27.3,-48.2,-38.4C-39.3,-49.6,-19.6,-52.2,-4.5,-48.6C10.7,-45.1,21.4,-35.3,37,-22.7Z',
];

const circleBlob =
    'M63.6,-51.2C78.4,-32.1,83.8,-5.9,78.7,18.5C73.6,43,58,65.6,36.6,75.9C15.1,86.2,-12.2,84.1,-33.6,72.7C-55.1,61.3,-70.6,40.5,-76,17.2C-81.4,-6,-76.6,-31.6,-62.3,-50.6C-47.9,-69.6,-23.9,-81.9,0.2,-82.1C24.4,-82.2,48.7,-70.3,63.6,-51.2Z';

export const AnimatedBlob: FunctionComponent<{ stayCircle?: boolean }> = ({
    stayCircle,
}) => {
    const [blobIndex, setBlobIndex] = useState(0);

    const { d } = useSpring({
        d: stayCircle ? circleBlob : blobs[blobIndex],
        config: {
            mass: 2,
            tension: stayCircle ? 80 : 20,
            friction: stayCircle ? 40 : 140,
        },
    });

    // Переключаем toggle каждые 3 секунды
    useEffect(() => {
        const interval = setInterval(() => {
            setBlobIndex(blobIndex + 1 >= blobs.length ? 0 : blobIndex + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [blobIndex]);

    return (
        <svg
            className='drop-shadow-white'
            viewBox='-100 -100 200 200'
        >
            <animated.path
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                d={d}
                fill='#facc69'
            />
        </svg>
    );
};
