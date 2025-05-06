import { ajaxPost } from '@/shared/api';
import { SPEECH_RECOGNITION_URL } from './index.constants';

export async function getCommand(phrase: string) {
    return await ajaxPost<number>({
        url: SPEECH_RECOGNITION_URL.detectCommand,
        body: { text: phrase },
    });
}
