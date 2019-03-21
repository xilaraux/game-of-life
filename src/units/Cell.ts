const BORDER_WIDTH = 2;
export const CELL_WIDTH = 20;
export const CELL_HEIGHT = 20;

const CELL_FREE_WIDTH = CELL_WIDTH - BORDER_WIDTH;
const CELL_FREE_HEIGHT = CELL_HEIGHT - BORDER_WIDTH;

export default class Cell implements ICell {
    private state: CellState = 0;
    private nextState: CellState = 0;
    private readonly coords: Coords;
    private readonly neighbours: Coords[];

    constructor(params: ICellParams) {
        this.state = params.state;
        this.coords = params.coords;
        this.neighbours = params.neighbours;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // TODO: Add prev state checking in order to optimize rendering
        if (this.isAlive()) {
            ctx.fillStyle = 'rgba(211, 211, 211, 0.9)';
        } else {
            ctx.fillStyle = 'white';
        }

        ctx.fillRect(
            BORDER_WIDTH + this.coords.x * CELL_WIDTH,
            BORDER_WIDTH + this.coords.y * CELL_WIDTH,
            CELL_FREE_WIDTH,
            CELL_FREE_HEIGHT
        );
    }

    public next(board: ICell[][]): void {
        // TODO: Add checking only for those whose environment have been changed
        const liveNeighbours = this.neighbours
            .map(({x, y}: Coords) => board[x][y])
            .filter((cell) => cell.isAlive()).length;

        if (this.isAlive()) {
            this.thinkLive(liveNeighbours);
        } else {
            this.thinkDead(liveNeighbours);
        }

        this.tick();
    }

    public isAlive(): boolean {
        return this.state === 1;
    }

    private thinkLive(liveNeighbours: number): void {
        if (liveNeighbours < 2) {
            this.nextState = 0;
        }

        if (liveNeighbours === 2 || liveNeighbours === 3) {
            this.nextState = 1;
        }

        if (liveNeighbours > 3) {
            this.nextState = 0;
        }
    }

    private thinkDead(liveNeighbours: number): void {
        if (liveNeighbours === 3) {
            this.nextState = 1;
        }
    }

    private tick(): void {
        this.state = this.nextState;
        this.nextState = 0;
    }
}

export interface ICell extends IDrawable {
    isAlive(): boolean;
    next(board: ICell[][]): void;
}

interface ICellParams {
    coords: Coords;
    state: CellState;
    neighbours: Coords[],
}
