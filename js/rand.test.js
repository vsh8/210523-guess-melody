import assert from 'assert';

import {getRandomInteger, chooseRandomItem, chooseRandomItems} from './rand';


describe(`getRandomInteger`, () => {
  it(`should return random numbers`, () => {
    const numbers = new Set();
    for (let i = 0; i < 10; i++) {
      numbers.add(getRandomInteger(i));
    }
    assert(numbers.size > 1);
  });
  it(`should return numbers less than the argument`, () => {
    const ARG = 256;
    for (let i = 0; i < 100; i++) {
      assert(getRandomInteger(ARG) < ARG);
    }
  });
});

describe(`chooseRandomItem`, () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  it(`should choose random items`, () => {
    const chosenItems = new Set();
    for (let i = 0; i < items.length; i++) {
      chosenItems.add(chooseRandomItem(items));
    }
    assert(chosenItems.size > 1);
  });
  it(`should choose items only from the argument`, () => {
    for (let i = 0; i < 100; i++) {
      const item = chooseRandomItem(items);
      assert(items.includes(item));
    }
  });
});

describe(`chooseRandomItems`, () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const NUMBER_OF_ITEMS_TO_CHOOSE = 6;

  it(`should choose random different items`, () => {
    for (let i = 0; i < 100; i++) {
      const choosenItems = chooseRandomItems(items, NUMBER_OF_ITEMS_TO_CHOOSE);
      assert.equal((new Set(choosenItems)).size, NUMBER_OF_ITEMS_TO_CHOOSE);
    }
  });
  it(`should choose items only from the argument`, () => {
    for (let i = 0; i < 100; i++) {
      const choosenItems = chooseRandomItems(items, NUMBER_OF_ITEMS_TO_CHOOSE);
      choosenItems.forEach((item) => assert(items.includes(item)));
    }
  });
});
