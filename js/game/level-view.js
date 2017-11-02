import AbstractView from '../view';
import {timeMinutes, timeSeconds} from '../util';


export default class LevelView extends AbstractView {

  bind() {
    this.timeElement = this.element.querySelector(`.timer-value`);
  }

  renderMistakes(wrongAnswersNumber) {
    const answers = new Array(wrongAnswersNumber)
        .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
        .join(``);
    return `<div class="main-mistakes">${answers}</div>`;
  }

  updateTimer(time) {
    if (time < 30) {
      this.timeElement.classList.add(`timer-value--finished`);
    }

    this.timeElement.querySelector(`.timer-value-mins`).textContent = timeMinutes(time);
    this.timeElement.querySelector(`.timer-value-secs`).textContent = timeSeconds(time);
  }
}
