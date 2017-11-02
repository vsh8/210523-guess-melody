import LevelView from './level-view';
import {timeMinutes, timeSeconds} from '../util';


export default class LevelArtistView extends LevelView {

  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${timeMinutes(this.gameState.time)}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${timeSeconds(this.gameState.time)}</span>
          </div>
        </svg>

        ${this.renderMistakes(this.gameState.wrongAnswersNumber)}

        <div class="main-wrap">
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.gameState.currentQuestion.questionSong.src}" autoplay></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.gameState.currentQuestion.artists.map((artist, idx) => this.renderAnswerCase(artist, idx))}
          </form>
        </div>
      </section>`;
  }

  renderAnswerCase(artist, idx) {
    return `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${idx}" name="answer" value="${artist.name}"/>
        <label class="main-answer" for="answer-${idx}">
        <img class="main-answer-preview" width="134" height="134"
             src="${artist.image}" alt="${artist.name}" >
          ${artist.name}
        </label>
      </div>`;
  }

  bind() {
    super.bind();

    this.element.querySelector(`.player`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control`)) {
        const playerAudio = evt.target.parentElement.querySelector(`audio`);
        if (evt.target.classList.contains(`player-control--play`)) {
          evt.target.classList.remove(`player-control--play`);
          evt.target.classList.add(`player-control--pause`);
          playerAudio.play();
        } else {
          evt.target.classList.remove(`player-control--pause`);
          evt.target.classList.add(`player-control--play`);
          playerAudio.pause();
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

  // onAnswer(answer) {}
}
