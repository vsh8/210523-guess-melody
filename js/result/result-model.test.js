import assert from 'assert';

import GameResult, {calculateResultPoints} from './result-model';
import {getInitialGameState, GameStatus} from '../data/game-state';


describe(`Result points calculation function`, () => {
  it(`should return -1 when less than 10 answers are given`, () => {
    assert.equal(
        -1,
        calculateResultPoints([], 42));
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: true},
        ]), 42);
    assert.equal(
        -1,
        calculateResultPoints([
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);

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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
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
        ]), 42);
  });
});


const getGameState = (gameTime, answers) => {
  const gameState = getInitialGameState();
  gameState.gameTimer.counter = gameTime;
  gameState.answers = answers;
  return gameState;
};

describe(`Result message getting function`, () => {
  it(`should say about timeout when no time remaining`, () => {
    const result = new GameResult(
        [19, 18, 14, 10, 5, 6, 7, 12, 8],
        getGameState(0, [
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
        ]));
    assert.equal(result.gameStatus, GameStatus.TIME_LIMIT);
  });
  it(`should say that number of attempts exceeded when no attempts remaining`, () => {
    const result = new GameResult(
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
        ]));
    assert.equal(result.gameStatus, GameStatus.WRONG_ANSWERS_LIMIT);
  });
  it(`should return right message for successful result`, () => {
    const result1 = new GameResult(
        [20, 19, 18, 14, 10, 5, 6, 7, 12, 8],
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
        ]));
    assert.equal(result1.gameStatus, GameStatus.SUCCESS);
    assert.equal(result1.gameTime, 258);
    assert.equal(result1.resultPoints, 20);
    assert.equal(result1.fastAnswersNumber, 10);
    assert.equal(result1.wrongAnswersNumber, 0);
    assert.equal(result1.place, 1);
    assert.equal(result1.playersNumber, 10);
    assert.equal(result1.worsePlayersPercent, 90);

    const result2 = new GameResult(
        [20, 19, 18, 14, 10, 5, 6, 7, 12, 8],
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
        ]));
    assert.equal(result2.gameStatus, GameStatus.SUCCESS);
    assert.equal(result2.gameTime, 258);
    assert.equal(result2.resultPoints, 19);
    assert.equal(result2.fastAnswersNumber, 9);
    assert.equal(result2.wrongAnswersNumber, 0);
    assert.equal(result2.place, 2);
    assert.equal(result2.playersNumber, 10);
    assert.equal(result2.worsePlayersPercent, 80);

    const result3 = new GameResult(
        [20, 19, 18, 14, 10, 5, 6, 7, 12, 8],
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
        ]));
    assert.equal(result3.gameStatus, GameStatus.SUCCESS);
    assert.equal(result3.gameTime, 258);
    assert.equal(result3.resultPoints, 18);
    assert.equal(result3.fastAnswersNumber, 8);
    assert.equal(result3.wrongAnswersNumber, 0);
    assert.equal(result3.place, 3);
    assert.equal(result3.playersNumber, 10);
    assert.equal(result3.worsePlayersPercent, 70);

    const result4 = new GameResult(
        [20, 19, 18, 16, 10, 5, 6, 7, 12, 8],
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
        ]));
    assert.equal(result4.gameStatus, GameStatus.SUCCESS);
    assert.equal(result4.gameTime, 258);
    assert.equal(result4.resultPoints, 16);
    assert.equal(result4.fastAnswersNumber, 9);
    assert.equal(result4.wrongAnswersNumber, 1);
    assert.equal(result4.place, 4);
    assert.equal(result4.playersNumber, 10);
    assert.equal(result4.worsePlayersPercent, 60);

    const result5 = new GameResult(
        [20, 19, 18, 14, 10, 5, 6, 7, 12, 8],
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
        ]));
    assert.equal(result5.gameStatus, GameStatus.SUCCESS);
    assert.equal(result5.gameTime, 258);
    assert.equal(result5.resultPoints, 6);
    assert.equal(result5.fastAnswersNumber, 5);
    assert.equal(result5.wrongAnswersNumber, 3);
    assert.equal(result5.place, 9);
    assert.equal(result5.playersNumber, 10);
    assert.equal(result5.worsePlayersPercent, 10);

    const result6 = new GameResult(
        [20, 19, 18, 14, 10, 5, 6, 7, 12, 8],
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
        ]));
    assert.equal(result6.gameStatus, GameStatus.SUCCESS);
    assert.equal(result6.gameTime, 258);
    assert.equal(result6.resultPoints, 5);
    assert.equal(result6.fastAnswersNumber, 4);
    assert.equal(result6.wrongAnswersNumber, 3);
    assert.equal(result6.place, 10);
    assert.equal(result6.playersNumber, 10);
    assert.equal(result6.worsePlayersPercent, 0);

    const result7 = new GameResult(
        [10],
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
        ]));
    assert.equal(result7.gameStatus, GameStatus.SUCCESS);
    assert.equal(result7.gameTime, 258);
    assert.equal(result7.resultPoints, 10);
    assert.equal(result7.fastAnswersNumber, 6);
    assert.equal(result7.wrongAnswersNumber, 2);
    assert.equal(result7.place, 1);
    assert.equal(result7.playersNumber, 1);
    assert.equal(result7.worsePlayersPercent, 0);

    const result8 = new GameResult(
        [10, 8],
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
        ]));
    assert.equal(result8.gameStatus, GameStatus.SUCCESS);
    assert.equal(result8.gameTime, 258);
    assert.equal(result8.resultPoints, 10);
    assert.equal(result8.fastAnswersNumber, 6);
    assert.equal(result8.wrongAnswersNumber, 2);
    assert.equal(result8.place, 1);
    assert.equal(result8.playersNumber, 2);
    assert.equal(result8.worsePlayersPercent, 50);

    const result9 = new GameResult(
        [8, 10, 20],
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
        ]));
    assert.equal(result9.gameStatus, GameStatus.SUCCESS);
    assert.equal(result9.gameTime, 258);
    assert.equal(result9.resultPoints, 10);
    assert.equal(result9.fastAnswersNumber, 6);
    assert.equal(result9.wrongAnswersNumber, 2);
    assert.equal(result9.place, 2);
    assert.equal(result9.playersNumber, 3);
    assert.equal(result9.worsePlayersPercent, 33.33);
  });
});
