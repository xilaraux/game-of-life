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
                cell.draw(ctx, this);
            }
        }
    }

    public getNeighbours(coords: Coords): ICell[] {
        const neighbours: ICell[] = [];

        const { x, y } = coords;

        const isNotTop = y > 0;
        const isNotLeft = x > 0;
        const isNotBottom = y < this.height - 1;
        const isNotRight = x < this.width - 1;

        // top left
        if (isNotTop && isNotLeft) {
            neighbours.push(this.content[x - 1][y - 1]);
        }

        // top
        if (isNotTop) {
            neighbours.push(this.content[x][y - 1]);
        }

        // top right
        if (isNotTop && isNotRight) {
            neighbours.push(this.content[x + 1][y - 1]);
        }

        // left
        if (isNotLeft) {
            neighbours.push(this.content[x - 1][y]);
        }

        // bottom left
        if (isNotBottom && isNotLeft) {
            neighbours.push(this.content[x - 1][y + 1]);
        }

        // bottom
        if (isNotBottom) {
            neighbours.push(this.content[x][y + 1]);
        }

        // bottom right
        if (isNotBottom && isNotRight) {
            neighbours.push(this.content[x + 1][y + 1]);
        }

        // right
        if (isNotRight) {
            neighbours.push(this.content[x + 1][y]);
        }

        return neighbours;
    }

    private fillContent(): void {
        for (let i = 0; i < this.width; i++) {
            let row: ICell[] = [];

            for (let j = 0; j < this.height; j++) {
                const state = getState(i, j);
                const cellParams = {
                    state,
                    coords: {
                        x: i,
                        y: j,
                    },
                };

                row.push(new Cell(cellParams));
            }

            this.content.push(row);
        }
    }
}

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

export interface IWorld extends IDrawable {
    getNeighbours(coords: Coords): ICell[];
}
