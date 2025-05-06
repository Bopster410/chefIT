import { ajaxGet, ajaxPost } from '@/shared/api';
import { Timer } from './index.types';
import { TIMERS_URLS } from './index.contants';

export async function getAllTimers() {
    return await ajaxGet<Timer[]>({ url: TIMERS_URLS.getAll });
}

export async function addTimer(stepNumber: number, totalSeconds: number) {
    return await ajaxPost<null>({
        url: TIMERS_URLS.add,
        body: { step: stepNumber, length: totalSeconds },
    });
}

export async function finishTimer(stepNumber: number) {
    return await ajaxPost<null>({
        url: TIMERS_URLS.finish,
        body: { step: stepNumber },
    });
}
