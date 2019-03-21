// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
import Game from './units/Game';
import {configureContext} from './utils/configureContext';

const board = document.getElementById('board') as HTMLCanvasElement;

const context = configureContext(board);
const game = new Game(context);
game.run();
