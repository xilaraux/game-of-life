export const configureCanvas = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    return ctx;
};
