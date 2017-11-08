import AbstractView from '../view';

import {timeMinutes, timeSeconds} from '../timer';
import {GameStatus} from '../data/state';

import {inflectSingularNominativeNeuterNumber, inflectGenitivePlayer, inflectAccusativeNumber,
  inflectAccusativeScore, inflectGenitiveFast, inflectAccusativeMistake} from '../rulang';


export default class ResultView extends AbstractView {

  constructor(gameResult) {
    super();
    this.gameResult = gameResult;
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        ${this.renderResult(this.gameResult)}
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  renderResult(gameResult) {
    let message = `Invalid result`;
    let description = ``;
    let comparisonHTML = ``;

    switch (gameResult.gameStatus) {
      case GameStatus.TIME_LIMIT:
        message = `Увы и ах!`;
        description = `Время вышло!<br>Вы не успели отгадать все мелодии.`;
        break;
      case GameStatus.WRONG_ANSWERS_LIMIT:
        message = `Какая жалость`;
        description = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
        break;
      case GameStatus.SUCCESS:
        const timeMin = timeMinutes(gameResult.gameTime);
        const timeSec = timeSeconds(gameResult.gameTime);

        message = `Вы настоящий меломан!`;
        description = ``
          + `За ${timeMin} ${inflectAccusativeNumber(parseInt(timeMin, 10), `минут`)} и `
          + `${timeSec} ${inflectAccusativeNumber(parseInt(timeSec, 10), `секунд`)}<br>`
          + `вы набрали ${gameResult.resultPoints} ${inflectAccusativeScore(gameResult.resultPoints)} `
          + `(${gameResult.fastAnswersNumber} ${inflectGenitiveFast(gameResult.fastAnswersNumber)})<br>`
          + `совершив ${gameResult.wrongAnswersNumber} `
          + `${inflectAccusativeMistake(gameResult.wrongAnswersNumber)}`;
        const comparison = `Вы заняли ${inflectSingularNominativeNeuterNumber(gameResult.place)} место из `
            + `${gameResult.playersNumber} ${inflectGenitivePlayer(gameResult.playersNumber)}. `
            + `Это лучше чем у ${gameResult.worsePlayersPercent}% игроков.`;
        comparisonHTML = `<span class="main-comparison">${comparison}</span>`;
    }

    return `
      <h2 class="title">${message}</h2>
      <div class="main-stat">
        ${description}
      </div>
      ${comparisonHTML}`;
  }

  bind() {
    super.bind();

    this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.onNewGame();
    });
  }

  onNewGame() {}
}
