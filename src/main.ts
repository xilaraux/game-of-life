// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
import Game from './game.js';

const playground = document.getElementById('playground');

const game = new Game(playground);
game.run();
