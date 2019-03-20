const CANVAS_WIDTH = 500; // 1920
const CANVAS_HEIGHT = 500; // 1080

export const configureContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = CANVAS_HEIGHT;

    return ctx;
};
