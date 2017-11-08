import App from '../application';
import {showView} from '../util';

import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import GameModel from './game-model';

import loadQuestion from '../data/questions';
import ArtistQuestion from '../data/artist-question';
import {GameStatus} from '../data/state';


export default class GameScreen {
  constructor(questions) {
    this.questions = questions.map((question) => loadQuestion(question));
  }

  init(gameState) {
    this.model = new GameModel(this.questions, gameState);
    this.changeLevel();
  }

  changeLevel() {
    this.model.resetQuestionStartTime();

    const ViewClass = this.model.currentQuestion instanceof ArtistQuestion ? LevelArtistView : LevelGenreView;
    this.view = new ViewClass(this.model);

    showView(this.view);
    this.view.onAnswer = (answer) => this.onAnswer(answer);

    this.tick();
  }

  onAnswer(answer) {
    this.model.addAnswer(this.model.questionTime, this.model.currentQuestion.checkAnswer(answer));
    this.stopTimer();

    if (this.model.gameStatus === GameStatus.IN_PROGRESS) {
      App.showGame(this.model.state);
    } else {
      App.showStats(this.model.state);
    }
  }

  tick() {
    const timeout = !this.model.tick();
    if (timeout) {
      App.showStats(this.model.state);
    } else {
      this.view.updateTimer(this.model.time);
      this.timer = setTimeout(() => this.tick(), 1000);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}
