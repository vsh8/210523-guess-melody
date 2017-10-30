import {inflectSingularNominativeNeuterNumber, inflectPluralGenitivePlayer} from './rulang';


export const calculateResultPoints = (answerTimes, wrongAnswersNumber) => {
  // The player lost if number of wrong answers is more than 3 or number of
  // right answers is less than 10.
  if (wrongAnswersNumber > 3 || answerTimes.length < 10) {
    return -1;
  }

  let points = 10;
  answerTimes.slice(0, 10).forEach((time) => {
    if (time < 30) {
      // Add a point for the fast answer.
      points++;
    }
  });

  // The cost of each wrong answer is 2 points.
  points -= 2 * wrongAnswersNumber;

  return points;
};


export const getResultMessage = (statistics, {resultPoints, wrongAnswersNumber, timeRemaining}) => {
  if (timeRemaining === 0) {
    return `Время вышло!<br>Вы не успели отгадать все мелодии.`;
  }
  if (wrongAnswersNumber > 3) {
    return `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
  }

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
};
