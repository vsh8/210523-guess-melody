export const getRandomInteger = (n) => {
  return Math.floor(n * Math.random());
};

export const chooseRandomItem = (items) => {
  return items[getRandomInteger(items.length)];
};

export const chooseRandomItems = (items, numberOfItemsToChoose) => {
  if (items.length < numberOfItemsToChoose) {
    throw new Error(`Not enough items to choose`);
  }

  const itemsToChoose = items.slice();
  const choosedItems = [];

  for (let i = 0; i < numberOfItemsToChoose; i++) {
    const itemIdx = getRandomInteger(itemsToChoose.length);
    choosedItems.push(itemsToChoose[itemIdx]);
    itemsToChoose.splice(itemIdx, 1);
  }

  return choosedItems;
};
