import Cell, {ICell} from "./Cell";

export default class World implements IWorld {
    private readonly width: number;
    private readonly height: number;
    private readonly content: ICell[][];

    constructor(seed: CellState[][]) {
        this.height = seed.length;
        this.width = seed[0].length;
        this.content = this.fillContent(seed);
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

    private fillContent(seed: CellState[][]): ICell[][] {
        const height = seed.length;
        const width = seed[0].length;
        const content: ICell[][] = [];

        for (let y = 0; y < height; y++) {
            let row: ICell[] = [];

            for (let x = 0; x < width; x++) {
                const state = seed[y][x];
                const cellParams = {
                    state,
                    coords: {x, y},
                    neighbours: this.getNeighbours({x, y}),
                };

                row.push(new Cell(cellParams));
            }

            content.push(row);
        }

        return content;
    }
}

export type IWorld = IDrawable & IChangeable;
