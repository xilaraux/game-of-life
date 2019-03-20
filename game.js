const CELL_WIDTH = 20;

class Game {
  constructor(canvas, initialState) {
    this.gameAnimationFrame = null;
    initialState ? this.cells = initialState : this.updateCells();
    this.ctx = canvas.getContext('2d');

    this.ctx.canvas.width = 500; // 1920;
    this.ctx.canvas.height = 500; // 1080;
  }

  run() {
    this.drawGrid();

    const self = this;

    let start = 0;
    const runner = (timestamp) => {
      if (timestamp - start > 600) {
        self.clearCells();
        self.updateCells();
        self.fillCells();
        start = timestamp;
      }

      self.gameAnimationFrame = requestAnimationFrame(runner);
    };

    self.gameAnimationFrame = requestAnimationFrame(runner);
  }

  stop() {
    if (this.gameAnimationFrame) {
      cancelAnimationFrame(this.gameAnimationFrame);
      this.clearCells();
    }
  }

  drawGrid() {
    const ctx = this.ctx;

    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = 'rgba(211, 211, 211, 0.9)';

    const boardParams = this.amountOfCells();
    const verticalLines = boardParams.x;
    const horizontalLines = boardParams.y;

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

    // Fill board with default color
    // ctx.fillStyle = 'rgba(211, 211, 211, 0.4)';
    // ctx.fillRect(0, 0, ctx.canvas.height, ctx.canvas.width);
  }

  updateCells() {
    this.cells = Array.from(
      { length: 500 }, () => Array.from(
        { length: 500 }, () => Math.floor(Math.random() * 2) + 0
      ));
  }

  fillCells() {
    const ctx = this.ctx;

    const BORDER_WIDTH = 2;
    const cellSpace = CELL_WIDTH - BORDER_WIDTH;

    ctx.fillStyle = 'rgba(211, 211, 211, 0.9)';

    for (let i = 0; i < ctx.canvas.width; i += CELL_WIDTH) {
      for (let j = 0; j < ctx.canvas.height; j += CELL_WIDTH) {
        if (this.cells[i][j]) {
          ctx.fillRect(BORDER_WIDTH + i, BORDER_WIDTH + j, cellSpace, cellSpace);
        }
      }
    }
  }

  clearCells() {
    const ctx = this.ctx;
    ctx.fillStyle = 'white';

    for (let i = 0; i < ctx.canvas.width; i += CELL_WIDTH) {
      for (let j = 0; j < ctx.canvas.height; j += CELL_WIDTH) {
        if (this.cells[i][j]) {
          ctx.fillRect(2 + i, 2 + j, 18, 18);
        }
      }
    }
  }

  amountOfCells() {
    const x = this.ctx.canvas.width / CELL_WIDTH;
    const y = this.ctx.canvas.height / CELL_WIDTH;

    return { x, y };
  }
}

export default Game;
