import {GameStatus, getGameStatus} from '../data/state';
import {WRONG_ANSWERS_THRESHOLD, TIME_LIMIT, FAST_ANSWER_THRESHOLD} from '../data/state';


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

export default class GameResult {
  constructor(statistics, gameState) {
    this._statistics = statistics;
    this._gameState = gameState;
    this.gameStatus = getGameStatus(gameState, 10);
  }

  get gameTime() {
    if (!this._gameTime) {
      this._gameTime = TIME_LIMIT - this._gameState.time;
    }
    return this._gameTime;
  }

  get resultPoints() {
    if (!this._resultPoints) {
      this._resultPoints = this.gameStatus === GameStatus.SUCCESS ?
        calculateResultPoints(this._gameState.answers, this.gameTime) : -1;
    }
    return this._resultPoints;
  }

  get fastAnswersNumber() {
    return this._gameState.fastAnswersNumber;
  }

  get wrongAnswersNumber() {
    return this._gameState.wrongAnswersNumber;
  }

  get place() {
    if (!this._place) {
      this._statistics.sort((a, b) => b - a);
      let place = 0;
      while (place <= this._statistics.length && this._statistics[place] >= this.resultPoints) {
        place++;
      }
      this._place = place;
    }
    return this._place;
  }

  get playersNumber() {
    return this._statistics.length;
  }

  get worsePlayersPercent() {
    if (!this._worsePlayersPercent) {
      this._worsePlayerPercent = Math.round(
          (this._statistics.length - this.place) / this._statistics.length * 10000) / 100;
    }
    return this._worsePlayerPercent;
  }
}
