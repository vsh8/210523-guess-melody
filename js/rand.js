const randInt = (n) => {
  return Math.floor(n * Math.random());
};

const randChoice = (items) => {
  return items[randInt(items.length)];
};

export {randInt, randChoice};
