type Coords = { x: number; y: number };

type CellState = 0 | 1;

interface IDrawable {
    draw(ctx: CanvasRenderingContext2D): void;
}
