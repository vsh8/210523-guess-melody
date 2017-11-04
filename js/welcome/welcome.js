import App from '../application';
import {showView} from '../util';

import WelcomeView from './welcome-view';

import {getInitialGameState} from '../data/state';


class WelcomeScreen {
  init() {
    this.view = new WelcomeView();
    showView(this.view);
    this.view.onStart = () => {
      App.startGame(getInitialGameState());
    };
  }

}

export default new WelcomeScreen();
