export const getElementFromTemplate = (template) => {
  const parser = new DOMParser();
  return parser.parseFromString(template, `text/html`).documentElement;
};
