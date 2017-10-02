(() => {
  const screenContainerElement = document.querySelector(`div.app`).querySelector(`section.main`);

  const templatesElement = document.querySelector(`template#templates`);
  const gameScreenElements = templatesElement.content.querySelectorAll(`section.main`);

  const gameScreensOrdering = [0, 2, 1, 3, 4, 5];

  const showGameScreen = (screenNumber) => {
    while (screenContainerElement.firstChild) {
      screenContainerElement.removeChild(screenContainerElement.firstChild);
    }

    const currentScreenElement = gameScreenElements[screenNumber].cloneNode(true);
    screenContainerElement.appendChild(currentScreenElement);
  };

  let currentScreenIdx = 0;
  showGameScreen(gameScreensOrdering[currentScreenIdx]);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.code === `ArrowLeft` && evt.altKey && !evt.ctrlKey && !evt.shiftKey) {
      currentScreenIdx = (currentScreenIdx + gameScreenElements.length - 1) % gameScreenElements.length;
    } else if (evt.code === `ArrowRight` && evt.altKey && !evt.ctrlKey && !evt.shiftKey) {
      currentScreenIdx = (currentScreenIdx + 1) % gameScreenElements.length;
    }
    showGameScreen(gameScreensOrdering[currentScreenIdx]);
  });
})();
