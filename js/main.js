(() => {
  const screenContainerElement = document.querySelector(`.app > .main`);

  const templatesElement = document.querySelector(`#templates`);
  const gameScreenElements = templatesElement.content.querySelectorAll(`.main`);

  const gameScreensOrdering = [0, 2, 1, 3, 4, 5];

  const showGameScreen = (screenIdx) => {
    screenContainerElement.innerHTML = ``;

    const currentScreenElement = gameScreenElements[gameScreensOrdering[screenIdx]].cloneNode(true);
    screenContainerElement.appendChild(currentScreenElement);
  };

  let currentScreenIdx = 0;
  showGameScreen(currentScreenIdx);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.altKey && !evt.ctrlKey && !evt.shiftKey) {
      if (evt.code === `ArrowLeft`) {
        currentScreenIdx = (currentScreenIdx + gameScreensOrdering.length - 1) % gameScreensOrdering.length;
        showGameScreen(currentScreenIdx);
      } else if (evt.code === `ArrowRight`) {
        currentScreenIdx = (currentScreenIdx + 1) % gameScreensOrdering.length;
        showGameScreen(currentScreenIdx);
      }
    }
  });
})();
