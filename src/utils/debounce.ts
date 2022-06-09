export default function debounce<F extends Function>(callback: F, delay: number) {
    let handler: number;
    return (...args: any[]) => {
        clearTimeout(handler);
        handler = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };
}
