import assert from 'assert';

import {inflectSingularNominativeNeuterNumber, inflectPluralGenitivePlayer} from './rulang.js';


describe(`inflectSingularNominativeNeuterNumber function`, () => {
  for (let [num, ending] of [
    [0, `ое`],
    [1, `ое`],
    [2, `ое`],
    [3, `ье`],
    [4, `ое`],
    [5, `ое`],
    [6, `ое`],
    [7, `ое`],
    [8, `ое`],
    [9, `ое`],
    [10, `ое`],
    [11, `ое`],
    [12, `ое`],
    [13, `ое`],
    [20, `ое`],
    [21, `ое`],
    [22, `ое`],
    [23, `ье`],
    [33, `ье`],
    [103, `ье`],
    [1003, `ье`],
  ]) {
    it(`should return right answer for ${num} players`, () => {
      assert.equal(`${num}-${ending}`, inflectSingularNominativeNeuterNumber(num));
    });
  }
});

describe(`inflectPluralGenitivePlayer`, () => {
  for (let [num, word] of [
    [0, `игроков`],
    [1, `игрока`],
    [2, `игроков`],
    [3, `игроков`],
    [4, `игроков`],
    [5, `игроков`],
    [6, `игроков`],
    [7, `игроков`],
    [8, `игроков`],
    [9, `игроков`],
    [10, `игроков`],
    [11, `игроков`],
    [12, `игроков`],
    [20, `игроков`],
    [21, `игрока`],
    [22, `игроков`],
    [31, `игрока`],
    [101, `игрока`],
    [1001, `игрока`],
  ]) {
    it(`should return right answer for ${num} players`, () => {
      assert.equal(word, inflectPluralGenitivePlayer(num));
    });
  }
});
