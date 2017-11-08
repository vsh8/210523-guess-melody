import {showView} from '../util';

import WelcomeView from './welcome-view';

import {getInitialGameState} from '../data/game-state';


class WelcomeScreen {
  init(app) {
    this.view = new WelcomeView();
    showView(this.view);
    this.view.onStart = () => {
      app.showGame(getInitialGameState());
    };
  }
}

export default new WelcomeScreen();
