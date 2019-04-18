// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
import {game, onResize} from './App';

window.addEventListener('load', () => game.start());
window.addEventListener('resize', onResize);
