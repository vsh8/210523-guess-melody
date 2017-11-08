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
          <div class="player player-${idx}">
            <audio src="${song.src}" preload="none"></audio>
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

    this.players = Array.from(this.element.querySelectorAll(`.player`)).map(
        (playerElement) => ({
          playerAudio: playerElement.querySelector(`audio`),
          playerButton: playerElement.querySelector(`.player-control`)
        }));

    this.element.querySelector(`.genre`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control`)) {
        evt.preventDefault();

        const playerIndex = this.playerIndex(evt.target.parentElement);
        if (this.isAudioPlaying(playerIndex)) {
          // Pause clicked audio.
          this.pauseAudio(playerIndex);
        } else {
          // Pause currently playing audio.
          this.pauseAllAudio();

          // Play clicked audio.
          this.playAudio(playerIndex);
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
      this.pauseAllAudio();

      const selectedSongs = [];
      genreForm.querySelectorAll(`.genre-answer-cb:checked`).forEach(
          (checkboxElement) => selectedSongs.push(checkboxElement.value));

      this.onAnswer(selectedSongs);
    });
  }

  playerIndex(playerElement) {
    for (let i = 0; i < playerElement.classList.length; ++i) {
      const cls = playerElement.classList[i];
      if (cls.substr(0, 7) === `player-`) {
        return parseInt(cls.substr(7), 10);
      }
    }
    return -1;
  }

  isAudioPlaying(playerIndex) {
    const playerButton = this.players[playerIndex].playerButton;

    return playerButton.classList.contains(`player-control--pause`);
  }

  pauseAudio(playerIndex) {
    const playerAudio = this.players[playerIndex].playerAudio;
    const playerButton = this.players[playerIndex].playerButton;

    playerButton.classList.remove(`player-control--pause`);
    playerButton.classList.add(`player-control--play`);
    this.model.loadedAudio[playerAudio.src].pause();
  }

  playAudio(playerIndex) {
    const playerAudio = this.players[playerIndex].playerAudio;
    const playerButton = this.players[playerIndex].playerButton;

    playerButton.classList.remove(`player-control--play`);
    playerButton.classList.add(`player-control--pause`);
    this.model.loadedAudio[playerAudio.src].play();
  }

  pauseAllAudio() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.isAudioPlaying(i)) {
        this.pauseAudio(i);
      }
    }
  }

  // onAnswer(answer) {}
}
