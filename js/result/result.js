import {showView} from '../util';

import ResultView from './result-view';
import GameResult from './result-model.js';

import Loader from '../loader';


export class ResultScreen {
  init(app, gameState) {
    Loader.loadResults().then((results) => {
      const statistics = results.map((result) => result.points);
      const gameResult = new GameResult(statistics, gameState);

      this.view = new ResultView(gameResult);
      showView(this.view);
      this.view.onNewGame = () => {
        app.showWelcome();
      };
    });
  }

}

export default new ResultScreen();
