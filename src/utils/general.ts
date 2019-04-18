interface IFunction<T extends any[], V = void> {
    (...args: T): V;
}

export function throttle<T extends any[]>(fn: IFunction<T>, delay: number): IFunction<T> {
    let pause = false;

    return (...args: T) => {
        if (pause) return;

        fn(...args);
        pause = true;
        setTimeout(() => { pause = false; }, delay);
    };
}

export function debounce<T extends any[]>(fn: IFunction<T>, delay: number): IFunction<T> {
    let timer;

    return (...args: T) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
