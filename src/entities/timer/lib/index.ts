const multipliers = {
    minutes: 60,
    hours: 3600,
};

export function timeToSeconds(time: number, unit: string) {
    if (!Object.hasOwn(multipliers, unit)) return time;

    return multipliers[unit as keyof typeof multipliers] * time;
}

export function secondsToTime(seconds: number) {
    return seconds >= multipliers.minutes
        ? seconds / multipliers.minutes > multipliers.minutes
            ? { number: Math.floor(seconds / multipliers.hours), unit: 'hours' }
            : {
                  number: Math.floor(seconds / multipliers.minutes),
                  unit: 'minutes',
              }
        : { number: seconds, unit: 'seconds' };
}

export function formatSeconds(seconds: number) {
    const { number, unit } = secondsToTime(seconds);

    return unit === 'hours'
        ? `${number}H`
        : unit === 'minutes'
        ? `${number}M`
        : `${number}S`;
}
