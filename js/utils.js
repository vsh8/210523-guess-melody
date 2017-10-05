export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper.firstChild;
};


const screenContainerElement = document.querySelector(`.app > .main`);

export const showGameScreen = (screen) => {
  screenContainerElement.innerHTML = ``;
  screenContainerElement.appendChild(screen);
};
