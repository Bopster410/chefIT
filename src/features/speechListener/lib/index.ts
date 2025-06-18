export function sanitizeSpeechInput(input: string) {
    return input.trim().replace(/[.,%]/g, '').toLowerCase();
}
