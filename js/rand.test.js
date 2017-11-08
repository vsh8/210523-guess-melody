import assert from 'assert';

import {getRandomInteger, chooseRandomItem, chooseRandomItems} from './rand';


describe(`getRandomInteger`, () => {
  it(`should return random numbers`, () => {
    const numbers = new Set();
    // Я насчет этого теста и еще пары вещей в прошлый раз отписался в notes.txt в корне проекта.
    // Сейчас этот файл удаляю, так как остальные вопросы больше неактуальны, комментарий дублирую тут.
    //
    // Это простой тест, я 10 раз запускаю генерацию случайного числа и проверяю, что сгенерировано
    // хотя бы два разных числа (то есть функция не выдает одно и то же число каждый раз). Да, если бы
    // числа генерировались случайные, то с убывающей на каждой итерации вероятностью мы бы могли получать
    // единственное число. Но ввиду алгоритма генерации _псевдослучайных_ чисел на достаточно большой
    // выборке (на самом деле уже больше двух) мы гарантировано получим разные числа. В принципе в таком
    // тесте смысла немного, так как он не тестирует распределение или какие-либо иные свойства генератора,
    // а лишь проверяет, что функция "недетерминирована", то есть по одному входу отдает более одного разного
    // выхода.

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
