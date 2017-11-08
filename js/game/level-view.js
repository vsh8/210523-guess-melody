import AbstractView from '../view';
import {timeMinutes, timeSeconds, getVisualTimerCircleLength} from '../timer';
import {TIME_LIMIT} from '../data/state';


export default class LevelView extends AbstractView {

  get template() {
    return `
      <section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780"
             stroke-dasharray="2325"
             stroke-dashoffset="${getVisualTimerCircleLength(370, TIME_LIMIT, this.model.time)}">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        </svg>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${timeMinutes(this.model.time)}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${timeSeconds(this.model.time)}</span>
        </div>

        ${this.renderMistakes(this.model.wrongAnswersNumber)}

        <div class="main-wrap">
          ${this.renderBody()}
        </div>
      </section>`;
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

  bind() {
    this.timerElement = this.element.querySelector(`.timer`);
    this.timerRadius = parseInt(this.timerElement.querySelector(`circle`).getAttribute(`r`), 10);

    this.timeValueElement = this.element.querySelector(`.timer-value`);
  }
}
