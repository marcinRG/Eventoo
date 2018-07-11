export function debounce<A>(f: (a: A) => void, delay: number) {
    let timer: number = null;
    return (a: A) => {
        if (!timer) {
            timer = window.setTimeout(() => f(a), delay);
        } else {
            clearTimeout(timer);
            timer = window.setTimeout(() => f(a), delay);
        }
    };
}
