import Cell, {CELL_HEIGHT, CELL_WIDTH, ICell} from "./Cell";

export default class World implements IWorld {
    private readonly width: number;
    private readonly height: number;
    private readonly content: ICell[][];

    constructor(width: number, height: number) {
        this.width = width / CELL_WIDTH;
        this.height = height / CELL_HEIGHT;
        this.content = [];

        this.fillContent();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (let row of this.content) {
            for (let cell of row) {
                cell.draw(ctx);
            }
        }
    }

    public next(): void {
        for (let row of this.content) {
            for (let cell of row) {
                cell.next(this.content);
            }
        }
    }

    private getNeighbours(coords: Coords): Coords[] {
        const neighbours: Coords[] = [];

        const { x, y } = coords;

        const isNotTop = y > 0;
        const isNotLeft = x > 0;
        const isNotBottom = y < this.height - 1;
        const isNotRight = x < this.width - 1;

        // top left
        if (isNotTop && isNotLeft) {
            neighbours.push({
                x: x - 1,
                y: y - 1,
            });
        }

        // top
        if (isNotTop) {
            neighbours.push({
                x,
                y: y - 1
            });
        }

        // top right
        if (isNotTop && isNotRight) {
            neighbours.push({
                x: x + 1,
                y: y - 1
            });
        }

        // left
        if (isNotLeft) {
            neighbours.push({
                x: x - 1,
                y
            });
        }

        // bottom left
        if (isNotBottom && isNotLeft) {
            neighbours.push({
                x: x - 1,
                y: y + 1
            });
        }

        // bottom
        if (isNotBottom) {
            neighbours.push({
                x,
                y: y + 1
            });
        }

        // bottom right
        if (isNotBottom && isNotRight) {
            neighbours.push({
                x: x + 1,
                y: y + 1
            });
        }

        // right
        if (isNotRight) {
            neighbours.push({
                x: x + 1,
                y
            });
        }

        return neighbours;
    }

    private fillContent(): void {
        for (let x = 0; x < this.width; x++) {
            let row: ICell[] = [];

            for (let y = 0; y < this.height; y++) {
                const state = getState(x, y);
                const cellParams = {
                    state,
                    coords: {x, y},
                    neighbours: this.getNeighbours({x, y}),
                };

                row.push(new Cell(cellParams));
            }

            this.content.push(row);
        }
    }
}

export type IWorld = IDrawable & IChangeable;

function getState(i, j): CellState {
    const mockMatrix = [
        [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];

    return mockMatrix[i][j] as CellState;

    // Random version
    // return Math.floor(Math.random() * 2) as CellState;
}
