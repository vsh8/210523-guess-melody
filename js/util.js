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
