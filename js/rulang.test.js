import assert from 'assert';

import {inflectSingularNominativeNeuterNumber, inflectPluralGenitivePlayer} from './rulang.js';


describe(`inflectSingularNominativeNeuterNumber function`, () => {
  it(`should return right answer for 0`, () => {
    assert.equal(`0-ое`, inflectSingularNominativeNeuterNumber(0));
  });
  it(`should return right answer for 1`, () => {
    assert.equal(`1-ое`, inflectSingularNominativeNeuterNumber(1));
  });
  it(`should return right answer for 2`, () => {
    assert.equal(`2-ое`, inflectSingularNominativeNeuterNumber(2));
  });
  it(`should return right answer for 3`, () => {
    assert.equal(`3-ье`, inflectSingularNominativeNeuterNumber(3));
  });
  it(`should return right answer for 4`, () => {
    assert.equal(`4-ое`, inflectSingularNominativeNeuterNumber(4));
  });
  it(`should return right answer for 5`, () => {
    assert.equal(`5-ое`, inflectSingularNominativeNeuterNumber(5));
  });
  it(`should return right answer for 6`, () => {
    assert.equal(`6-ое`, inflectSingularNominativeNeuterNumber(6));
  });
  it(`should return right answer for 7`, () => {
    assert.equal(`7-ое`, inflectSingularNominativeNeuterNumber(7));
  });
  it(`should return right answer for 8`, () => {
    assert.equal(`8-ое`, inflectSingularNominativeNeuterNumber(8));
  });
  it(`should return right answer for 9`, () => {
    assert.equal(`9-ое`, inflectSingularNominativeNeuterNumber(9));
  });
  it(`should return right answer for 10`, () => {
    assert.equal(`10-ое`, inflectSingularNominativeNeuterNumber(10));
  });
  it(`should return right answer for 11`, () => {
    assert.equal(`11-ое`, inflectSingularNominativeNeuterNumber(11));
  });
  it(`should return right answer for 12`, () => {
    assert.equal(`12-ое`, inflectSingularNominativeNeuterNumber(12));
  });
  it(`should return right answer for 13`, () => {
    assert.equal(`13-ое`, inflectSingularNominativeNeuterNumber(13));
  });
  it(`should return right answer for 20`, () => {
    assert.equal(`20-ое`, inflectSingularNominativeNeuterNumber(20));
  });
  it(`should return right answer for 21`, () => {
    assert.equal(`21-ое`, inflectSingularNominativeNeuterNumber(21));
  });
  it(`should return right answer for 22`, () => {
    assert.equal(`22-ое`, inflectSingularNominativeNeuterNumber(22));
  });
  it(`should return right answer for 23`, () => {
    assert.equal(`23-ье`, inflectSingularNominativeNeuterNumber(23));
  });
  it(`should return right answer for 33`, () => {
    assert.equal(`33-ье`, inflectSingularNominativeNeuterNumber(33));
  });
  it(`should return right answer for 103`, () => {
    assert.equal(`103-ье`, inflectSingularNominativeNeuterNumber(103));
  });
  it(`should return right answer for 1003`, () => {
    assert.equal(`1003-ье`, inflectSingularNominativeNeuterNumber(1003));
  });
});

describe(`inflectPluralGenitivePlayer`, () => {
  it(`should return right answer for 0 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(0));
  });
  it(`should return right answer for 1 players`, () => {
    assert.equal(`игрока`, inflectPluralGenitivePlayer(1));
  });
  it(`should return right answer for 2 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(2));
  });
  it(`should return right answer for 3 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(3));
  });
  it(`should return right answer for 4 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(4));
  });
  it(`should return right answer for 5 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(5));
  });
  it(`should return right answer for 6 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(6));
  });
  it(`should return right answer for 7 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(7));
  });
  it(`should return right answer for 8 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(8));
  });
  it(`should return right answer for 9 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(9));
  });
  it(`should return right answer for 10 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(10));
  });
  it(`should return right answer for 11 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(11));
  });
  it(`should return right answer for 12 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(12));
  });
  it(`should return right answer for 20 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(20));
  });
  it(`should return right answer for 21 players`, () => {
    assert.equal(`игрока`, inflectPluralGenitivePlayer(21));
  });
  it(`should return right answer for 22 players`, () => {
    assert.equal(`игроков`, inflectPluralGenitivePlayer(22));
  });
  it(`should return right answer for 31 players`, () => {
    assert.equal(`игрока`, inflectPluralGenitivePlayer(31));
  });
  it(`should return right answer for 101 players`, () => {
    assert.equal(`игрока`, inflectPluralGenitivePlayer(101));
  });
  it(`should return right answer for 1001 players`, () => {
    assert.equal(`игрока`, inflectPluralGenitivePlayer(1001));
  });
});
