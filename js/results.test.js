import assert from 'assert';

import {calculateResultPoints, GameResult, getGameResult, getResultMessage} from './results';
import {getInitialGameState} from './data/state';


describe(`Result points calculation function`, () => {
  it(`should return -1 when less than 10 answers are given`, () => {
    assert.equal(
        -1,
        calculateResultPoints([]));
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: true},
        ]));
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]));
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]));
  });
  it(`should return -1 when more than 3 wrong answers are given`, () => {
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
        ]));
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: false},
          {time: 10, isRight: false},
          {time: 10, isRight: false},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]));

  });
  it(`should return 20 points when all answers are right and fast`, () => {
    assert.equal(
        20,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]));
  });
  it(`should use only first 10 answers`, () => {
    assert.equal(
        20,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 42, isRight: true},
          {time: 42, isRight: true},
          {time: 42, isRight: true},
          {time: 42, isRight: true},
          {time: 42, isRight: true},
        ]));
  });
  it(`should return right result when both fast and slow answers are given`, () => {
    assert.equal(
        19,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
          {time: 17, isRight: true},
          {time: 18, isRight: true},
          {time: 30, isRight: true},
        ]));
    assert.equal(
        18,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
          {time: 17, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
        ]));
    assert.equal(
        11,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 30, isRight: true},
          {time: 31, isRight: true},
          {time: 32, isRight: true},
          {time: 33, isRight: true},
          {time: 34, isRight: true},
          {time: 35, isRight: true},
          {time: 36, isRight: true},
          {time: 37, isRight: true},
          {time: 38, isRight: true},
        ]));
    assert.equal(
        10,
        calculateResultPoints([
          {time: 30, isRight: true},
          {time: 31, isRight: true},
          {time: 32, isRight: true},
          {time: 33, isRight: true},
          {time: 34, isRight: true},
          {time: 35, isRight: true},
          {time: 36, isRight: true},
          {time: 37, isRight: true},
          {time: 38, isRight: true},
          {time: 39, isRight: true},
        ]));
  });
  it(`should return right result when wrong answers are given`, () => {
    assert.equal(
        16,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: false},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
          {time: 17, isRight: true},
          {time: 18, isRight: true},
          {time: 19, isRight: true},
        ]));
    assert.equal(
        12,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: false},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
          {time: 17, isRight: true},
          {time: 18, isRight: false},
          {time: 19, isRight: true},
        ]));
    assert.equal(
        8,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: false},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
          {time: 17, isRight: true},
          {time: 18, isRight: false},
          {time: 19, isRight: false},
        ]));
  });
  it(`should return right result when all kind of answers are given`, () => {
    assert.equal(
        10,
        calculateResultPoints([
          {time: 27, isRight: true},
          {time: 42, isRight: true},
          {time: 14, isRight: false},
          {time: 16, isRight: true},
          {time: 23, isRight: true},
          {time: 13, isRight: true},
          {time: 12, isRight: true},
          {time: 42, isRight: true},
          {time: 19, isRight: true},
          {time: 64, isRight: false},
        ]));
    assert.equal(
        3,
        calculateResultPoints([
          {time: 27, isRight: false},
          {time: 30, isRight: true},
          {time: 42, isRight: true},
          {time: 33, isRight: true},
          {time: 12, isRight: false},
          {time: 17, isRight: false},
          {time: 31, isRight: true},
          {time: 29, isRight: true},
          {time: 7, isRight: true},
          {time: 37, isRight: true},
        ]));
    assert.equal(
        1,
        calculateResultPoints([
          {time: 30, isRight: false},
          {time: 31, isRight: false},
          {time: 32, isRight: false},
          {time: 33, isRight: true},
          {time: 34, isRight: true},
          {time: 35, isRight: true},
          {time: 36, isRight: true},
          {time: 37, isRight: true},
          {time: 38, isRight: true},
          {time: 39, isRight: true},
        ]));
  });
});


const getGameState = (gameTime, answers) => {
  const gameState = getInitialGameState();
  gameState.gameTimer.counter = gameTime;
  gameState.answers = answers;
  return gameState;
};

describe(`getGameResult function`, () => {
  it(`should return GameResult.IN_PROGRESS when the game is still in progress`, () => {
    assert.equal(
        GameResult.IN_PROGRESS,
        getGameResult(getGameState(42, [
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
        ])));
  });
  it(`should return GameResult.SUCCESS on successful result`, () => {
    assert.equal(
        GameResult.SUCCESS,
        getGameResult(getGameState(42, [
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
          {time: 17, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
        ])));

    assert.equal(
        GameResult.SUCCESS,
        getGameResult(getGameState(42, [
          {time: 30, isRight: false},
          {time: 31, isRight: false},
          {time: 32, isRight: false},
          {time: 33, isRight: true},
          {time: 34, isRight: true},
          {time: 35, isRight: true},
          {time: 36, isRight: true},
          {time: 37, isRight: true},
          {time: 38, isRight: true},
          {time: 39, isRight: true},
        ])));
  });
  it(`should return GameResult.TIME_LIMIT when no time remaining`, () => {
    assert.equal(
        GameResult.TIME_LIMIT,
        getGameResult(getGameState(0, [
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
        ])));
  });
  it(`should return GameResult.WRONG_ANSWERS_LIMIT when number of attempts is exceeded`, () => {
    assert.equal(
        GameResult.WRONG_ANSWERS_LIMIT,
        getGameResult(getGameState(42, [
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
        ])));
  });
});

describe(`Result message getting function`, () => {
  it(`should say about timeout when no time remaining`, () => {
    assert.equal(
        `Время вышло!<br>Вы не успели отгадать все мелодии.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(0, [
              {time: 10, isRight: true},
              {time: 11, isRight: true},
              {time: 12, isRight: true},
              {time: 13, isRight: true},
              {time: 14, isRight: true},
              {time: 15, isRight: true},
              {time: 16, isRight: true},
            ])));
  });
  it(`should say that number of attempts exceeded when no attempts remaining`, () => {
    assert.equal(
        `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: false},
              {time: 10, isRight: true},
              {time: 10, isRight: false},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: false},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: false},
            ])));
  });
  it(`should return right message for successful result`, () => {
    assert.equal(
        `Вы заняли 1-ое место из 10 игроков. Это лучше чем у 90% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 10, isRight: true},
              {time: 42, isRight: true},
              {time: 42, isRight: true},
              {time: 42, isRight: true},
              {time: 42, isRight: true},
              {time: 42, isRight: true},
            ])));
    assert.equal(
        `Вы заняли 2-ое место из 10 игроков. Это лучше чем у 80% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: true},
              {time: 11, isRight: true},
              {time: 12, isRight: true},
              {time: 13, isRight: true},
              {time: 14, isRight: true},
              {time: 15, isRight: true},
              {time: 16, isRight: true},
              {time: 17, isRight: true},
              {time: 18, isRight: true},
              {time: 30, isRight: true},
            ])));
    assert.equal(
        `Вы заняли 3-ье место из 10 игроков. Это лучше чем у 70% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: true},
              {time: 11, isRight: true},
              {time: 12, isRight: true},
              {time: 13, isRight: true},
              {time: 14, isRight: true},
              {time: 15, isRight: true},
              {time: 16, isRight: true},
              {time: 17, isRight: true},
              {time: 30, isRight: true},
              {time: 30, isRight: true},
            ])));
    assert.equal(
        `Вы заняли 3-ье место из 10 игроков. Это лучше чем у 70% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: true},
              {time: 11, isRight: true},
              {time: 12, isRight: false},
              {time: 13, isRight: true},
              {time: 14, isRight: true},
              {time: 15, isRight: true},
              {time: 16, isRight: true},
              {time: 17, isRight: true},
              {time: 18, isRight: true},
              {time: 19, isRight: true},
            ])));
    assert.equal(
        `Вы заняли 9-ое место из 10 игроков. Это лучше чем у 10% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: true},
              {time: 11, isRight: true},
              {time: 12, isRight: false},
              {time: 13, isRight: true},
              {time: 14, isRight: true},
              {time: 15, isRight: true},
              {time: 36, isRight: true},
              {time: 37, isRight: true},
              {time: 18, isRight: false},
              {time: 19, isRight: false},
            ])));
    assert.equal(
        `Вы заняли 10-ое место из 10 игроков. Это лучше чем у 0% игроков.`,
        getResultMessage(
            [19, 18, 14, 10, 5, 6, 7, 12, 8],
            getGameState(42, [
              {time: 10, isRight: true},
              {time: 11, isRight: true},
              {time: 12, isRight: false},
              {time: 13, isRight: true},
              {time: 14, isRight: true},
              {time: 35, isRight: true},
              {time: 36, isRight: true},
              {time: 37, isRight: true},
              {time: 18, isRight: false},
              {time: 19, isRight: false},
            ])));
    assert.equal(
        `Вы заняли 1-ое место из 1 игрока. Это лучше чем у 0% игроков.`,
        getResultMessage(
            [],
            getGameState(42, [
              {time: 27, isRight: true},
              {time: 42, isRight: true},
              {time: 14, isRight: false},
              {time: 16, isRight: true},
              {time: 23, isRight: true},
              {time: 13, isRight: true},
              {time: 12, isRight: true},
              {time: 42, isRight: true},
              {time: 19, isRight: true},
              {time: 64, isRight: false},
            ])));
    assert.equal(
        `Вы заняли 1-ое место из 2 игроков. Это лучше чем у 50% игроков.`,
        getResultMessage(
            [8],
            getGameState(42, [
              {time: 27, isRight: true},
              {time: 42, isRight: true},
              {time: 14, isRight: false},
              {time: 16, isRight: true},
              {time: 23, isRight: true},
              {time: 13, isRight: true},
              {time: 12, isRight: true},
              {time: 42, isRight: true},
              {time: 19, isRight: true},
              {time: 64, isRight: false},
            ])));
    assert.equal(
        `Вы заняли 2-ое место из 3 игроков. Это лучше чем у 33.33% игроков.`,
        getResultMessage(
            [8, 20],
            getGameState(42, [
              {time: 27, isRight: true},
              {time: 42, isRight: true},
              {time: 14, isRight: false},
              {time: 16, isRight: true},
              {time: 23, isRight: true},
              {time: 13, isRight: true},
              {time: 12, isRight: true},
              {time: 42, isRight: true},
              {time: 19, isRight: true},
              {time: 64, isRight: false},
            ])));
  });
});
