import assert from 'assert';

import {getInitialGameState, TIME_LIMIT} from './state';


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
