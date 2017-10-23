import assert from 'assert';

import {calculateResultPoints, getResultMessage} from './results.js';


describe(`Result points calculation function`, () => {
  it(`should return -1 when less than 10 answers are given`, () => {
    assert.equal(
        -1,
        calculateResultPoints([], 0));
    assert.equal(
        -1,
        calculateResultPoints([10], 0));
    assert.equal(
        -1,
        calculateResultPoints([10, 10, 10], 0));
    assert.equal(
        -1,
        calculateResultPoints([10, 10, 10, 10, 10, 10, 10, 10, 10], 0));
  });
  it(`should return -1 when more than 3 wrong answers are given`, () => {
    assert.equal(
        -1,
        calculateResultPoints([10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 4));
    assert.equal(
        -1,
        calculateResultPoints([10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 42));
  });
  it(`should return 20 points when all answers are right and fast`, () => {
    assert.equal(
        20,
        calculateResultPoints([10, 11, 12, 13, 14, 20, 21, 22, 23, 29], 0));
  });
  it(`should use only first 10 answers`, () => {
    assert.equal(
        20,
        calculateResultPoints([10, 11, 12, 13, 14, 20, 21, 22, 23, 29, 20, 21, 22, 23, 29], 0));
  });
  it(`should return right result when both fast and slow answers are given`, () => {
    assert.equal(
        19,
        calculateResultPoints([10, 11, 12, 13, 14, 15, 16, 17, 18, 30], 0));
    assert.equal(
        18,
        calculateResultPoints([10, 11, 12, 13, 14, 15, 16, 17, 30, 30], 0));
    assert.equal(
        11,
        calculateResultPoints([10, 30, 31, 32, 33, 34, 35, 36, 37, 38], 0));
    assert.equal(
        10,
        calculateResultPoints([30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 0));
  });
  it(`should return right result when wrong answers are given`, () => {
    assert.equal(
        18,
        calculateResultPoints([10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 1));
    assert.equal(
        16,
        calculateResultPoints([10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 2));
    assert.equal(
        14,
        calculateResultPoints([10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 3));
  });
  it(`should return right result when all kind of answers are given`, () => {
    assert.equal(
        13,
        calculateResultPoints([27, 42, 14, 16, 23, 13, 12, 42, 19, 64], 2));
    assert.equal(
        9,
        calculateResultPoints([27, 30, 42, 33, 12, 17, 31, 29, 7, 37], 3));
    assert.equal(
        4,
        calculateResultPoints([30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 3));
  });
});


describe(`Result message getting function`, () => {
  it(`should say about timeout when no time remaining`, () => {
    assert.equal(
        `Время вышло! Вы не успели отгадать все мелодии.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 10,
              wrongAnswersNumber: 1,
              timeRemaining: 0
            }));
  });
  it(`should say that number of attempts exceeded`, () => {
    assert.equal(
        `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 10,
              wrongAnswersNumber: 4,
              timeRemaining: 1
            }));
  });
  it(`should return right message for successful result`, () => {
    assert.equal(
        `Вы заняли 1-ое место из 10 игроков. Это лучше чем у 90% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 20,
              wrongAnswersNumber: 0,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 2-ое место из 10 игроков. Это лучше чем у 80% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 19,
              wrongAnswersNumber: 0,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 3-ье место из 10 игроков. Это лучше чем у 70% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 18,
              wrongAnswersNumber: 0,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 3-ье место из 10 игроков. Это лучше чем у 70% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 16,
              wrongAnswersNumber: 1,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 9-ое место из 10 игроков. Это лучше чем у 10% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 6,
              wrongAnswersNumber: 3,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 10-ое место из 10 игроков. Это лучше чем у 0% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8], {
              resultPoints: 5,
              wrongAnswersNumber: 3,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 1-ое место из 1 игрока. Это лучше чем у 0% игроков.`,
        getResultMessage(
            [], {
              resultPoints: 10,
              wrongAnswersNumber: 3,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 1-ое место из 2 игроков. Это лучше чем у 50% игроков.`,
        getResultMessage(
            [8], {
              resultPoints: 10,
              wrongAnswersNumber: 3,
              timeRemaining: 1
            }));
    assert.equal(
        `Вы заняли 2-ое место из 3 игроков. Это лучше чем у 33.33% игроков.`,
        getResultMessage(
            [8, 20], {
              resultPoints: 10,
              wrongAnswersNumber: 3,
              timeRemaining: 1
            }));
  });
});
