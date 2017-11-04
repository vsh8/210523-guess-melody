import App from '../application';
import {showView} from '../util';

import ResultView from './result-view';

import {timeMinutes, timeSeconds} from '../timer';
import Loader from '../loader';

import {GameStatus, getGameStatus} from '../data/state';
import {WRONG_ANSWERS_THRESHOLD, TIME_LIMIT, FAST_ANSWER_THRESHOLD} from '../data/state';
import {inflectSingularNominativeNeuterNumber, inflectPluralGenitivePlayer} from '../rulang';


export const calculateResultPoints = (answers, gameTime) => {
  if (answers.length < 10 || gameTime === 0) {
    return -1;
  }

  let points = 0;
  let wrongAnswersNumber = 0;

  for (const {time, isRight} of answers.slice(0, 10)) {
    if (isRight) {
      points++;
      if (time < FAST_ANSWER_THRESHOLD) {
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

export class ResultScreen {
  init(gameState) {
    Loader.loadResults().then((results) => {
      const statistics = results.map((result) => result.points);
      const gameResult = ResultScreen.getResult(statistics, gameState);

      this.view = new ResultView(gameResult);
      showView(this.view);
      this.view.onNewGame = () => {
        App.showWelcome();
      };
    });
  }

  static getResult(statistics, gameState) {
    switch (getGameStatus(gameState, 10)) {
      case GameStatus.TIME_LIMIT:
        return {
          message: `Увы и ах!`,
          description: `Время вышло!<br>Вы не успели отгадать все мелодии.`
        };
      case GameStatus.WRONG_ANSWERS_LIMIT:
        return {
          message: `Какая жалость`,
          description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
        };
      case GameStatus.SUCCESS: {
        const gameTime = TIME_LIMIT - gameState.time;
        const resultPoints = calculateResultPoints(gameState.answers, gameTime);

        statistics.sort((a, b) => b - a);

        let place = 0;
        while (place <= statistics.length && statistics[place] >= resultPoints) {
          place++;
        }

        let i = place + 1;
        let n = statistics.length + 1;
        let p = Math.round((statistics.length - place) / (statistics.length + 1) * 10000) / 100;

        return {
          message: `Вы настоящий меломан!`,
          description: ``
            + `За ${timeMinutes(gameTime)} минуты и ${timeSeconds(gameTime)} секунд<br>`
            + `вы набрали ${resultPoints} баллов (${gameState.fastAnswersNumber} быстрых)<br>`
            + `совершив ${gameState.wrongAnswersNumber} ошибки`,
          comparison: `Вы заняли ${inflectSingularNominativeNeuterNumber(i)} место из `
            + `${n} ${inflectPluralGenitivePlayer(n)}. Это лучше чем у ${p}% игроков.`
        };
      }
      default:
        return `invalid game result`;
    }
  }
}

export default new ResultScreen();
