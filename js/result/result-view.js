import AbstractView from '../view';


export default class ResultView extends AbstractView {

  constructor(gameResult) {
    super();
    this.gameResult = gameResult;
  }

  get template() {
    let comparisonHTML = ``;
    if (this.gameResult.comparison) {
      comparisonHTML = `<span class="main-comparison">${this.gameResult.comparison}</span>`;
    }

    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">${this.gameResult.message}</h2>
        <div class="main-stat">
          ${this.gameResult.description}
        </div>
        ${comparisonHTML}
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  bind() {
    super.bind();

    this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.onNewGame();
    });
  }

  onNewGame() {}
}
