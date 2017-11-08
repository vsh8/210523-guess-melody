import LevelView from './level-view';


export default class LevelGenreView extends LevelView {

  constructor(model) {
    super();
    this.model = model;
  }

  renderBody() {
    return `
      <h2 class="title">${this.model.currentQuestion.question}</h2>
      <form class="genre">
        ${this.model.currentQuestion.answers.map((song, idx) =>
    this.renderAnswerCase(song, this.model.currentQuestion.genre, idx))}

        <button class="genre-answer-send" disabled="true" type="submit">Ответить</button>
      </form>`;
  }

  renderAnswerCase(song, answerGenre, idx) {
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
        <input class="genre-answer-cb${song.genre === answerGenre ? ` correct-answer` : ``}"
               type="checkbox" name="answer" value="${song.src}" id="a-${idx}">
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
