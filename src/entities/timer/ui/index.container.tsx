import { TimersContext } from '@/app/providers/timers';
import { ContainerProps } from './index.types';
import { FunctionComponent } from 'react';
import { useContext } from 'use-context-selector';
import { Timer } from './index.component';

export const TimerContainer: FunctionComponent<ContainerProps> = ({
    stepNum,
    ...props
}) => {
    const { finishTimer } = useContext(TimersContext);

    return (
        <Timer
            {...props}
            finishTimer={() => {
                if (finishTimer) finishTimer(stepNum);
            }}
        ></Timer>
    );
};
