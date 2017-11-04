import assert from 'assert';

import {getInitialGameState, TIME_LIMIT, GameStatus, getGameStatus} from './state';


const getGameState = (gameTime, answers) => {
  const gameState = getInitialGameState();
  gameState.gameTimer.counter = gameTime;
  gameState.answers = answers;
  return gameState;
};


describe(`getInitialGameState`, () => {
  it(`should return a valid initial state`, () => {
    const gameState = getInitialGameState();

    assert(`questions` in gameState);
    assert(`gameTimer` in gameState);
    assert(`answers` in gameState);
    assert(`currentQuestion` in gameState);
    assert(`wrongAnswersNumber` in gameState);

    assert.equal(gameState.gameTimer.counter, TIME_LIMIT);
    assert.equal(gameState.answers.length, 0);

    assert.equal(gameState.currentQuestion, gameState.questions[0]);
    assert.equal(gameState.wrongAnswersNumber, 0);
  });
});

describe(`gameState`, () => {
  it(`#wrongAnswerNumber() should return a number of wrong answers`, () => {
    assert.equal(
        0,
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
        ]).wrongAnswersNumber
    );
    assert.equal(
        1,
        getGameState(42, [
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
        ]).wrongAnswersNumber
    );
    assert.equal(
        3,
        getGameState(42, [
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
        ]).wrongAnswersNumber
    );
  });

  it(`#fastAnswerNumber() should return a number of fast answers`, () => {
    assert.equal(
        10,
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
        ]).fastAnswersNumber
    );
    assert.equal(
        9,
        getGameState(42, [
          {time: 30, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]).fastAnswersNumber
    );
    assert.equal(
        0,
        getGameState(42, [
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
          {time: 30, isRight: true},
        ]).fastAnswersNumber
    );
    assert.equal(
        8,
        getGameState(42, [
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
          {time: 10, isRight: false},
          {time: 10, isRight: true},
          {time: 10, isRight: true},
        ]).fastAnswersNumber
    );
  });
});


describe(`getGameStatus function`, () => {
  it(`should return GameStatus.IN_PROGRESS when the game is still in progress`, () => {
    assert.equal(
        GameStatus.IN_PROGRESS,
        getGameStatus(getGameState(42, [
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
        ])));
  });

  it(`should return GameStatus.SUCCESS on successful result`, () => {
    assert.equal(
        GameStatus.SUCCESS,
        getGameStatus(getGameState(42, [
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
        GameStatus.SUCCESS,
        getGameStatus(getGameState(42, [
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

  it(`should return GameStatus.TIME_LIMIT when no time remaining`, () => {
    assert.equal(
        GameStatus.TIME_LIMIT,
        getGameStatus(getGameState(0, [
          {time: 10, isRight: true},
          {time: 11, isRight: true},
          {time: 12, isRight: true},
          {time: 13, isRight: true},
          {time: 14, isRight: true},
          {time: 15, isRight: true},
          {time: 16, isRight: true},
        ])));
  });

  it(`should return GameStatus.WRONG_ANSWERS_LIMIT when number of attempts is exceeded`, () => {
    assert.equal(
        GameStatus.WRONG_ANSWERS_LIMIT,
        getGameStatus(getGameState(42, [
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
