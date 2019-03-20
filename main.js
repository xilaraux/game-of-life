// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
import('./game.js').then((module) => {
  const playground = document.getElementById('playground');

  const showTime = new Promise((resolve) => {
    const game = new module.default(playground);
    game.run();

    setTimeout(() => {
      resolve(game);
    }, 5000);
  });

  showTime.then((game) => {
    // game.stop();
  })
});
