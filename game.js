const CELL_WIDTH = 20;

class Game {
  constructor(canvas, initialState) {
    this.gameAnimationFrame = null;
    this.ctx = canvas.getContext('2d');

    this.ctx.canvas.width = 500; // 1920;
    this.ctx.canvas.height = 500; // 1080;

    initialState ? this.cells = initialState : this.updateCells();
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
    const { x, y } = this.amountOfCells();

    this.cells = Array.from(
      { length: x }, () => Array.from(
        { length: y }, () => Math.floor(Math.random() * 2) + 0
      ));
  }

  fillCells() {
    const ctx = this.ctx;

    const BORDER_WIDTH = 2;
    const cellSpace = CELL_WIDTH - BORDER_WIDTH;

    ctx.fillStyle = 'rgba(211, 211, 211, 0.9)';

    this.traverseBoard((i, j) => {
      if (this.cells[i][j]) {
        ctx.fillRect(BORDER_WIDTH + i * CELL_WIDTH, BORDER_WIDTH + j * CELL_WIDTH, cellSpace, cellSpace);
      }
    });
  }

  clearCells() {
    const ctx = this.ctx;
    ctx.fillStyle = 'white';

    this.traverseBoard((i, j) => {
      if (this.cells[i][j]) {
        ctx.fillRect(2 + i * CELL_WIDTH, 2 + j * CELL_WIDTH, 18, 18);
      }
    });
  }

  traverseBoard(callback) {
    const { x, y } = this.amountOfCells();

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        callback(i, j);
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
