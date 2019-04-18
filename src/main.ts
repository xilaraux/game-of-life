// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
import Game from './units/Game';
import {debounce} from './utils/general';
import {configureWorld} from './utils/configureWorld';
import {configureCanvas} from './utils/configureCanvas';

const board = document.getElementById('board') as HTMLCanvasElement;

const context = configureCanvas(board);
const worldSeed = configureWorld(context.canvas);

const game = new Game(context, worldSeed);
game.start();

const onResize = debounce((event: Event) => {
    game.start();
    console.log(event);
}, 500);


window.addEventListener('resize', (event: Event) => {
    game.stop();
    onResize(event);
});
