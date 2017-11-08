import LevelView from './level-view';


export default class LevelArtistView extends LevelView {

  constructor(model) {
    super();
    this.model = model;
  }

  renderBody() {
    return `
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
      </form>`;
  }

  renderAnswerCase(artist, idx) {
    return `
      <div class="main-answer-wrapper${artist.isCorrect ? ` correct-answer` : ``}">
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

    this.playerAudio = this.element.querySelector(`audio`);
    this.playerButton = this.element.querySelector(`.player-control`);

    this.element.querySelector(`.player`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control`)) {
        if (this.isAudioPlaying()) {
          this.playAudio();
        } else {
          this.pauseAudio();
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

  isAudioPlaying() {
    return this.playerButton.classList.contains(`player-control--play`);
  }

  pauseAudio() {
    this.playerButton.classList.remove(`player-control--pause`);
    this.playerButton.classList.add(`player-control--play`);
    this.playerAudio.pause();
  }

  playAudio() {
    this.playerButton.classList.remove(`player-control--play`);
    this.playerButton.classList.add(`player-control--pause`);
    this.playerAudio.play();
  }

  // onAnswer(answer) {}
}
