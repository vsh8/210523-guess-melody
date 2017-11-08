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

// const preloadAudio = (audioLinks) => {
//   let loadedFilesNumber = 0;
//   return Promise.all(
//       audioLinks.map((audioLink) => {
//         return new Promise((resolve) => {
//           const audio = new Audio(audioLink);
//           audio.addEventListener(`loadeddata`, () => {
//             loadedFilesNumber++;
//             window.console.log(`loaded ${loadedFilesNumber}/${audioLinks.length}`, audioLink);
//             return resolve();
//           });
//         });
//       }));
// };

const preloadAudio = (audioLinks) => {
  let loadedFilesNumber = 0;
  return audioLinks.reduce(
      (promise, audioLink) => promise.then(
          () => new Promise((resolve) => {
            const audio = new Audio(audioLink);
            audio.addEventListener(`loadeddata`, () => {
              loadedFilesNumber++;
              window.console.log(`loaded ${loadedFilesNumber}/${audioLinks.length}`, audioLink);
              return resolve();
            });
          })),
      Promise.resolve());
};

class SplashScreen {
  init() {
    this.view = splashView;
    showView(this.view);
    this.view.start();

    Loader.loadData()
        .then((questions) => {
          preloadAudio(getAudioFromQuestions(questions))
              .then(() => {
                this.view.stop();
                App.create(questions);
              })
              .catch(window.console.error);
        });
  }
}

export default new SplashScreen();
