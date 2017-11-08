const SERVER_URL = `https://es.dump.academy/guess-melody`;

const DEFAULT_NAME = `vsh8`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((res) => res.json());
  }

  // Параллельная загрузка подвисает.
  //
  // static preloadAudio(audioLinks) {
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
  // }

  // Все равно подвисает, так как `canplaythrough` не означает полной загрузки файла.
  //
  // static preloadAudio(audioLinks) {
  //   const loadedAudio = {};
  //   return audioLinks.reduce(
  //       (promise, audioLink) => promise.then(
  //           () => new Promise((resolve) => {
  //             const audio = new Audio(audioLink);
  //             audio.addEventListener(`canplaythrough`, () => {
  //               loadedAudio[audioLink] = audio;
  //               window.console.log(`loaded ${Object.keys(loadedAudio).length}/${audioLinks.length}`, audioLink);
  //               return resolve(loadedAudio);
  //             });
  //           })),
  //       Promise.resolve(loadedAudio));
  // }

  // Грузим аудио последовательно и целиком.
  //
  static preloadAudio(audioLinks) {
    const loadedAudio = {};
    return audioLinks.reduce(
        (promise, audioLink) => promise.then(
            () => new Promise((resolve) => {
              const req = new XMLHttpRequest();
              req.open(`GET`, audioLink, true);
              req.responseType = `blob`;
              req.addEventListener(`load`, () => {
                if (req.status === 200) {
                  const audioObject = URL.createObjectURL(req.response);
                  loadedAudio[audioLink] = new Audio(audioObject);
                  window.console.log(`loaded ${Object.keys(loadedAudio).length}/${audioLinks.length}`, audioLink);
                } else {
                  window.console.log(`loading error`, req.status, audioLink);
                }

                return resolve(loadedAudio);
              });
              req.send();
            })),
        Promise.resolve(loadedAudio));
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}
