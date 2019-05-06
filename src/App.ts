import Game from './units/Game';
import {debounce} from './utils/general';
import {configureWorld} from './utils/configureWorld';
import {configureCanvas} from './utils/configureCanvas';

const board = document.getElementById('board') as HTMLCanvasElement;

const context = configureCanvas(board);
const worldSeed = configureWorld(context.canvas);

export const game = new Game({
    context,
    worldSeed,
    drawConfig: {
        width: 1,
        cap: 'butt',
        color: 'rgba(211, 211, 211, 0.9)',
    },
});

export const onResize = debounce(() => {
    const newContext = configureCanvas(board);
    const newSeed = configureWorld(newContext.canvas);
    game.restart(newSeed, configureCanvas(board));
}, 500);
