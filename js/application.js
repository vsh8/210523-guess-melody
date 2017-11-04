import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';

import {GameState, getInitialGameState} from './data/state';


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
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.RESULT]: resultScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
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
    location.hash = `${ControllerId.RESULT}?${dumpState(state)}`;
  }
}
