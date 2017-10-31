import {inflectSingularNominativeNeuterNumber, inflectPluralGenitivePlayer} from './rulang';
import {QUESTIONS_NUMBER} from './data/questions';
import {WRONG_ANSWERS_THRESHOLD} from './data/state';


export const calculateResultPoints = (answers) => {
  if (answers.length < QUESTIONS_NUMBER) {
    return -1;
  }

  let points = 0;
  let wrongAnswersNumber = 0;

  for (const {time, isRight} of answers.slice(0, 10)) {
    if (isRight) {
      points++;
      if (time < 30) {
        // Add a point for the fast answer.
        points++;
      }
    } else {
      // The cost of each wrong answer is 2 points.
      points -= 2;
      wrongAnswersNumber++;
      if (wrongAnswersNumber > WRONG_ANSWERS_THRESHOLD) {
        return -1;
      }
    }
  }

  return points;
};


export const GameResult = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  TIME_LIMIT: 2,
  WRONG_ANSWERS_LIMIT: 3
};

export const getGameResult = (gameState) => {
  if (gameState.gameTimer.counter === 0) {
    return GameResult.TIME_LIMIT;
  } else if (gameState.wrongAnswersNumber > WRONG_ANSWERS_THRESHOLD) {
    return GameResult.WRONG_ANSWERS_LIMIT;
  } else if (gameState.answers.length >= QUESTIONS_NUMBER) {
    return GameResult.SUCCESS;
  } else {
    return GameResult.IN_PROGRESS;
  }
};


export const getResultMessage = (statistics, gameState) => {
  switch (getGameResult(gameState)) {
    case GameResult.TIME_LIMIT:
      return `Время вышло!<br>Вы не успели отгадать все мелодии.`;
    case GameResult.WRONG_ANSWERS_LIMIT:
      return `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
    case GameResult.SUCCESS: {
      const resultPoints = calculateResultPoints(gameState.answers);

      statistics.sort((a, b) => b - a);

      let place = 0;
      while (place <= statistics.length && statistics[place] >= resultPoints) {
        place++;
      }

      let i = place + 1;
      let n = statistics.length + 1;
      let p = Math.round((statistics.length - place) / (statistics.length + 1) * 10000) / 100;

      return `Вы заняли ${inflectSingularNominativeNeuterNumber(i)} место из `
        + `${n} ${inflectPluralGenitivePlayer(n)}. Это лучше чем у ${p}% игроков.`;
    }
    default:
      return `invalid game result`;
  }
};
