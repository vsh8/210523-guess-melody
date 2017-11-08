import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';
import {calculateResultPoints} from './result/result-model';

import GameState, {getInitialGameState} from './data/game-state';

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


// Здесь намеренно был использован синглтон, на то он и называется Application,
// теперь же пришлось экземпляр Application протаскивать во все контроллеры.
export default class Application {
  constructor(questions) {
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.RESULT]: resultScreen
    };

    window.addEventListener(`hashchange`, () => this.changeHash());
    this.changeHash();
  }

  changeHash() {
    const hashValue = location.hash.replace(`#`, ``);
    const [id, data] = hashValue.split(`?`);

    const controller = this.routes[id];
    if (controller) {
      controller.init(this, loadState(data));
    }
  }

  showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  showGame(state) {
    location.hash = `${ControllerId.GAME}?${dumpState(state)}`;
  }

  showStats(state) {
    Loader.saveResults({points: calculateResultPoints(state.answers, state.time)}).then(() => {
      location.hash = `${ControllerId.RESULT}?${dumpState(state)}`;
    });
  }
}
