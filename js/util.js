export const createElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};


export const showView = (view) => {
  const mainContainerElement = document.querySelector(`.app > .main`);
  mainContainerElement.innerHTML = ``;
  mainContainerElement.appendChild(view.element);
};


export const timeMinutes = (time) => {
  return `0` + Math.floor(time / 60);
};

export const timeSeconds = (time) => {
  const seconds = time % 60;
  if (seconds >= 10) {
    return `` + seconds;
  } else {
    return `0` + seconds;
  }
};
