export interface ContainerProps {
    secondsTotal: number;
    secondsLeft?: number;
    collapsed?: boolean;
    description: string;
    stepNum: number;
}

export interface Props {
    secondsTotal: number;
    secondsLeft?: number;
    collapsed?: boolean;
    description: string;
    finishTimer: () => void;
}
