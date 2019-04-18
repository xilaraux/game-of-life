type Coords = { x: number; y: number };

type CellState = 0 | 1;

// TODO: Provide generic interface type <T>
interface IDrawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

interface IChangeable {
    next(): void;
}

interface ISize {
    width: number;
    height: number;
}
