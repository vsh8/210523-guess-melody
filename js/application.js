import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';


export default class Application {
  static showWelcome() {
    welcomeScreen.init();
  }

  static startGame(state) {
    gameScreen.init(state);
  }

  static showStats(state) {
    resultScreen.init(state);
  }
}
