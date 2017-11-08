import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';
import {calculateResultPoints} from './result/result-model';

import GameState, {getInitialGameState} from './data/state';

import Loader from './loader';


const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};


const dumpState = (gameState) => {
  return btoa(JSON.stringify(gameState.dump()));
};

const loadState = (dataString) => {
  try {
    return GameState.load(JSON.parse(atob(dataString)));
  } catch (e) {
    return getInitialGameState();
  }
};


export default class Application {
  static init(questions) {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.RESULT]: resultScreen
    };

    window.addEventListener(`hashchange`, () => Application.changeHash());
    Application.changeHash();
  }

  static changeHash() {
    const hashValue = location.hash.replace(`#`, ``);
    const [id, data] = hashValue.split(`?`);

    const controller = this.routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showGame(state) {
    location.hash = `${ControllerId.GAME}?${dumpState(state)}`;
  }

  static showStats(state) {
    Loader.saveResults({points: calculateResultPoints(state.answers, state.time)}).then(() => {
      location.hash = `${ControllerId.RESULT}?${dumpState(state)}`;
    });
  }
}
