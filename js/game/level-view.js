import AbstractView from '../view';
import {timeMinutes, timeSeconds, getVisualTimerCircleLength} from '../timer';
import {TIME_LIMIT} from '../data/state';


export default class LevelView extends AbstractView {

  bind() {
    this.timerElement = this.element.querySelector(`.timer`);
    this.timerRadius = parseInt(this.timerElement.querySelector(`circle`).getAttribute(`r`), 10);

    this.timeValueElement = this.element.querySelector(`.timer-value`);
  }

  renderMistakes(wrongAnswersNumber) {
    const answers = new Array(wrongAnswersNumber)
        .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
        .join(``);
    return `<div class="main-mistakes">${answers}</div>`;
  }

  updateTimer(time) {
    if (time < 30) {
      this.timeValueElement.classList.add(`timer-value--finished`);
    }

    this.timerElement.setAttribute(`stroke-dashoffset`, getVisualTimerCircleLength(370, TIME_LIMIT, time));

    this.timeValueElement.querySelector(`.timer-value-mins`).textContent = timeMinutes(time);
    this.timeValueElement.querySelector(`.timer-value-secs`).textContent = timeSeconds(time);
  }
}
