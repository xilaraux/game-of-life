import World, {IWorld} from "./World";
import {CELL_HEIGHT, CELL_WIDTH} from "./Cell";

export default class Game implements IGame {
    private animationFrame: null | number = null;
    private ctx: CanvasRenderingContext2D;
    private readonly drawConfig: IDrawConfig;

    private world: IWorld;

    constructor(config: IGameConfig) {
        this.ctx = config.context;
        this.animationFrame = null;
        this.world = new World(config.worldSeed);
        this.drawConfig = config.drawConfig;
    }

    public start(): void {
        this.drawGrid();

        let start = 0;
        const runner = (timestamp) => {
            if (timestamp - start > 600) {
                // TODO: Stop the game when world become balanced
                this.world.draw(this.ctx);
                this.world.next();
                start = timestamp;
            }

            this.animationFrame = requestAnimationFrame(runner);
        };

        this.animationFrame = requestAnimationFrame(runner);
    }

    public stop(): void {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    public restart(seed: CellState[][], context: CanvasRenderingContext2D): void {
        this.stop();
        this.ctx = context;
        this.world = new World(seed);
        this.start();
    }

    private drawGrid() {
        const ctx = this.ctx;
        const drawConfig = this.drawConfig;

        ctx.lineCap = drawConfig.cap;
        ctx.lineWidth = drawConfig.width;
        ctx.strokeStyle = drawConfig.color;

        const verticalLines = Math.floor(this.ctx.canvas.width / CELL_WIDTH);
        const horizontalLines = Math.floor(this.ctx.canvas.height / CELL_HEIGHT);

        for (let i = 0; i < verticalLines; i++) {
            ctx.beginPath();
            ctx.moveTo(1 + i * CELL_WIDTH, 0);
            ctx.lineTo(1 + i * CELL_WIDTH, ctx.canvas.height);
            ctx.stroke();
        }

        for (let i = 0; i < horizontalLines; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 1 + i * CELL_WIDTH);
            ctx.lineTo(ctx.canvas.width, 1 + i * CELL_WIDTH);
            ctx.stroke();
        }
    }
}

interface IGame {
    start(): void;
    stop(): void;
    restart(seed: CellState[][], ctx: CanvasRenderingContext2D): void;
}

interface IGameConfig {
    worldSeed: CellState[][],
    context: CanvasRenderingContext2D,
    drawConfig: IDrawConfig;
}

interface IDrawConfig {
    color: string;
    width: number;
    cap: CanvasLineCap;
}
