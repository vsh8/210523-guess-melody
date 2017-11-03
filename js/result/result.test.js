import assert from 'assert';

import {calculateResultPoints, getResult} from './result';
import {getInitialGameState} from '../data/state';


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

describe(`Result message getting function`, () => {
  it(`should say about timeout when no time remaining`, () => {
    const result = getResult(
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
    assert.equal(result.message, `Увы и ах!`);
    assert.equal(result.description, `Время вышло!<br>Вы не успели отгадать все мелодии.`);

  });
  it(`should say that number of attempts exceeded when no attempts remaining`, () => {
    const result = getResult(
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
    assert.equal(result.message, `Какая жалость`);
    assert.equal(result.description, `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`);
  });
  it(`should return right message for successful result`, () => {
    const result1 = getResult(
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
        ]));
    assert.equal(result1.message, `Вы настоящий меломан!`);
    assert.equal(
        result1.description,
        `За 00 минуты и 42 секунд<br>вы набрали 20 баллов (10 быстрых)<br>совершив 0 ошибки`);
    assert.equal(result1.comparison, `Вы заняли 1-ое место из 10 игроков. Это лучше чем у 90% игроков.`);

    const result2 = getResult(
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
        ]));
    assert.equal(result2.message, `Вы настоящий меломан!`);
    assert.equal(
        result2.description,
        `За 00 минуты и 42 секунд<br>вы набрали 19 баллов (9 быстрых)<br>совершив 0 ошибки`);
    assert.equal(result2.comparison, `Вы заняли 2-ое место из 10 игроков. Это лучше чем у 80% игроков.`);

    const result3 = getResult(
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
        ]));
    assert.equal(result3.message, `Вы настоящий меломан!`);
    assert.equal(
        result3.description,
        `За 00 минуты и 42 секунд<br>вы набрали 18 баллов (8 быстрых)<br>совершив 0 ошибки`);
    assert.equal(result3.comparison, `Вы заняли 3-ье место из 10 игроков. Это лучше чем у 70% игроков.`);

    const result4 = getResult(
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
        ]));
    assert.equal(result4.message, `Вы настоящий меломан!`);
    assert.equal(
        result4.description,
        `За 00 минуты и 42 секунд<br>вы набрали 16 баллов (9 быстрых)<br>совершив 1 ошибки`);
    assert.equal(result4.comparison, `Вы заняли 3-ье место из 10 игроков. Это лучше чем у 70% игроков.`);

    const result5 = getResult(
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
        ]));
    assert.equal(result5.message, `Вы настоящий меломан!`);
    assert.equal(
        result5.description,
        `За 00 минуты и 42 секунд<br>вы набрали 6 баллов (5 быстрых)<br>совершив 3 ошибки`);
    assert.equal(result5.comparison, `Вы заняли 9-ое место из 10 игроков. Это лучше чем у 10% игроков.`);

    const result6 = getResult(
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
        ]));
    assert.equal(result6.message, `Вы настоящий меломан!`);
    assert.equal(
        result6.description,
        `За 00 минуты и 42 секунд<br>вы набрали 5 баллов (4 быстрых)<br>совершив 3 ошибки`);
    assert.equal(result6.comparison, `Вы заняли 10-ое место из 10 игроков. Это лучше чем у 0% игроков.`);

    const result7 = getResult(
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
        ]));
    assert.equal(result7.message, `Вы настоящий меломан!`);
    assert.equal(
        result7.description,
        `За 00 минуты и 42 секунд<br>вы набрали 10 баллов (6 быстрых)<br>совершив 2 ошибки`);
    assert.equal(result7.comparison, `Вы заняли 1-ое место из 1 игрока. Это лучше чем у 0% игроков.`);

    const result8 = getResult(
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
        ]));
    assert.equal(result8.message, `Вы настоящий меломан!`);
    assert.equal(
        result8.description,
        `За 00 минуты и 42 секунд<br>вы набрали 10 баллов (6 быстрых)<br>совершив 2 ошибки`);
    assert.equal(result8.comparison, `Вы заняли 1-ое место из 2 игроков. Это лучше чем у 50% игроков.`);

    const result9 = getResult(
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
        ]));
    assert.equal(result9.message, `Вы настоящий меломан!`);
    assert.equal(
        result9.description,
        `За 00 минуты и 42 секунд<br>вы набрали 10 баллов (6 быстрых)<br>совершив 2 ошибки`);
    assert.equal(result9.comparison, `Вы заняли 2-ое место из 3 игроков. Это лучше чем у 33.33% игроков.`);
  });
});
