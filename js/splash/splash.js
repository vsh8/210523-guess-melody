import App from '../application';
import {showView} from '../util';

import splashView from './splash-view';

import Loader from '../loader';


class SplashScreen {
  init() {
    this.view = splashView;
    showView(this.view);
    this.view.start();

    Loader.loadData()
        .then((questions) => new App(questions))
        .then(() => this.view.stop())
        .catch(window.console.error);
  }
}

export default new SplashScreen();
