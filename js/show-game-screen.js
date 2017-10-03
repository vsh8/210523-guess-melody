const screenContainerElement = document.querySelector(`.app > .main`);

const showGameScreen = (screen) => {
  screenContainerElement.innerHTML = ``;
  screenContainerElement.appendChild(screen);
};

export default showGameScreen;
