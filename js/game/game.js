import App from '../application';
import {showView} from '../util';

import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import GameModel from './game-model';

import {ArtistQuestion} from '../data/questions';
import {GameStatus} from '../data/state';


class GameScreen {
  init(gameState) {
    this.model = new GameModel(gameState);
    this.changeLevel();
  }

  changeLevel() {
    this.model.resetQuestionStartTime();

    if (this.model.currentQuestion instanceof ArtistQuestion) {
      this.view = new LevelArtistView(this.model);
    } else {
      this.view = new LevelGenreView(this.model);
    }

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

export default new GameScreen();
