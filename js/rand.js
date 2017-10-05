const getRandomInteger = (n) => {
  return Math.floor(n * Math.random());
};

const chooseRandomItem = (items) => {
  return items[getRandomInteger(items.length)];
};

export {getRandomInteger, chooseRandomItem};
