import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';

import {GameState, getInitialGameState} from './data/state';


const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.RESULT]: resultScreen
};


const dumpState = (gameState) => {
  return JSON.stringify(gameState.dump());
};

const loadState = (dataString) => {
  try {
    return GameState.load(JSON.parse(dataString));
  } catch (e) {
    return getInitialGameState();
  }
};


export default class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
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
    location.hash = `${ControllerId.RESULT}?${dumpState(state)}`;
  }
}

// Application.init();
