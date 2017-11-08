import App from '../application';
import {showView} from '../util';

import splashView from './splash-view';

import Loader from '../loader';


const getAudioFromQuestions = (questions) => {
  const audioLinks = new Set();
  for (const question of questions) {
    if (question.type === `artist`) {
      audioLinks.add(question.src);
    } else {
      for (const answer of question.answers) {
        audioLinks.add(answer.src);
      }
    }
  }

  return Array.from(audioLinks);
};

class SplashScreen {
  init() {
    this.view = splashView;
    showView(this.view);
    this.view.start();

    Loader.loadData()
        .then((questions) => {
          Loader.preloadAudio(getAudioFromQuestions(questions))
              .then((loadedAudio) => {
                this.view.stop();
                App.create(questions, loadedAudio);
              })
              .catch(window.console.error);
        });
  }
}

export default new SplashScreen();
