import LevelView from './level-view';
import {timeMinutes, timeSeconds, getVisualTimerCircleLength} from '../timer';
import {TIME_LIMIT} from '../data/state';


export default class LevelGenreView extends LevelView {

  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {

    return `
      <section class="main main--level main--level-genre">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780"
             stroke-dasharray="2325"
             stroke-dashoffset="${getVisualTimerCircleLength(370, TIME_LIMIT, this.gameState.time)}">
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
          <h2 class="title">Выберите ${this.gameState.currentQuestion.questionGenre} треки</h2>
          <form class="genre">
            ${this.gameState.currentQuestion.songs.map((song, idx) => this.renderAnswerCase(song, idx))}

            <button class="genre-answer-send" disabled="true" type="submit">Ответить</button>
          </form>
        </div>
      </section>`;
  }

  renderAnswerCase(song, idx) {
    return `
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${song.src}"></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input class="genre-answer-cb" type="checkbox" name="answer" value="${song.name}" id="a-${idx}">
        <label class="genre-answer-check" for="a-${idx}"></label>
      </div>`;
  }

  bind() {
    super.bind();

    this.element.querySelector(`.genre`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control`)) {
        evt.preventDefault();

        const playerAudio = evt.target.parentElement;
        if (evt.target.classList.contains(`player-control--play`)) {
          const playingAudioButton = this.element.querySelector(`.player-control--pause`);
          if (playingAudioButton) {
            const playingPlayerElement = playingAudioButton.parentElement;
            this.pauseAudio(playingPlayerElement);
          }

          this.playAudio(playerAudio);
        } else {
          this.pauseAudio(playerAudio);
        }
      }
    });

    const genreForm = this.element.querySelector(`.genre`);
    const genreAnswerSendButton = this.element.querySelector(`.genre-answer-send`);

    genreForm.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`genre-answer-cb`)) {
        const selectedTrackCheckboxes = genreForm.querySelectorAll(`.genre-answer-cb:checked`);
        genreAnswerSendButton.disabled = selectedTrackCheckboxes.length === 0;
      }
    });

    genreAnswerSendButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const selectedSongs = [];
      genreForm.querySelectorAll(`.genre-answer-cb:checked`).forEach(
          (checkboxElement) => selectedSongs.push(checkboxElement.value));

      this.onAnswer(selectedSongs);
    });
  }

  pauseAudio(playerElement) {
    const playerAudio = playerElement.querySelector(`audio`);
    const playerButton = playerElement.querySelector(`button`);

    playerButton.classList.remove(`player-control--pause`);
    playerButton.classList.add(`player-control--play`);
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