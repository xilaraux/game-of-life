const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

export const configureCanvas = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = CANVAS_HEIGHT;

    return ctx;
};
