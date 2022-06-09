export const printTime = (t: number) => {
    if (!t) return "";
    const m = Math.floor(t / 60);
    const seconds = t % 60;
    const s = seconds >= 10 ? `${seconds}` : `0${seconds}`;
    return `${m}:${s}`;
};
