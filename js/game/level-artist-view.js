import LevelView from './level-view';
import {timeMinutes, timeSeconds, getVisualTimerCircleLength} from '../timer';
import {TIME_LIMIT} from '../data/state';


export default class LevelArtistView extends LevelView {

  constructor(model) {
    super();
    this.model = model;
  }

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

          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${timeMinutes(this.model.time)}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${timeSeconds(this.model.time)}</span>
          </div>
        </svg>

        ${this.renderMistakes(this.model.wrongAnswersNumber)}

        <div class="main-wrap">
          <h2 class="title main-title">${this.model.currentQuestion.question}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.model.currentQuestion.songSrc}" autoplay></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.model.currentQuestion.answers.map((artist, idx) => this.renderAnswerCase(artist, idx))}
          </form>
        </div>
      </section>`;
  }

  renderAnswerCase(artist, idx) {
    return `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${idx}" name="answer" value="${artist.title}"/>
        <label class="main-answer" for="answer-${idx}">
        <img class="main-answer-preview" width="134" height="134"
             src="${artist.image.url}" alt="${artist.title}" >
          ${artist.title}
        </label>
      </div>`;
  }

  bind() {
    super.bind();

    this.element.querySelector(`.player`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control`)) {
        const playerElement = evt.target.parentElement;
        if (this.isAudioPlaying(playerElement)) {
          this.playAudio(playerElement);
        } else {
          this.pauseAudio(playerElement);
        }
      }
    });

    this.element.querySelector(`.main-list`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-answer-r`)) {
        evt.preventDefault();
        this.onAnswer(evt.target.value);
      }
    });
  }

  isAudioPlaying(playerElement) {
    const playerButton = playerElement.querySelector(`button`);
    return playerButton.classList.contains(`player-control--play`);
  }

  pauseAudio(playerElement) {
    const playerAudio = playerElement.querySelector(`audio`);
    const playerButton = playerElement.querySelector(`button`);

    playerButton.classList.remove(`player-control--pause`);
    playerButton.target.classList.add(`player-control--play`);
    playerAudio.pause();
  }

  playAudio(playerElement) {
    const playerAudio = playerElement.querySelector(`audio`);
    const playerButton = playerElement.querySelector(`button`);

    playerButton.classList.remove(`player-control--play`);
    playerButton.classList.add(`player-control--pause`);
    playerAudio.play();
  }

  // onAnswer(answer) {}
}
