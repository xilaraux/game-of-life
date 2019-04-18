import Game from './units/Game';
import {debounce} from './utils/general';
import {configureWorld} from './utils/configureWorld';
import {configureCanvas} from './utils/configureCanvas';

const board = document.getElementById('board') as HTMLCanvasElement;

const context = configureCanvas(board);
let worldSeed = configureWorld(context.canvas);

export const game = new Game({
    context,
    worldSeed,
    drawConfig: {
        width: 1,
        cap: 'butt',
        color: 'rgba(211, 211, 211, 0.9)',
    },
});

export const onResize = debounce((event: Event) => {
    // @ts-ignore
    const newWidth = event.target.innerWidth;
    // @ts-ignore
    const newHeight = event.target.innerHeight;

    let increaseWidth = true;
    let increaseHeight = true;

    if (worldSeed.length >= ~~(newHeight / 20)) {
        increaseHeight = false;
    }

    if (worldSeed[0].length >= ~~(newWidth / 20)) {
        increaseWidth = false;
    }

    if (increaseHeight || increaseWidth) {
        worldSeed = configureWorld({ width: newWidth, height: (newHeight / 20 - worldSeed.length) * 20 });
        console.log(worldSeed);
    }
}, 500);
