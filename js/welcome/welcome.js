import {getInitialGameState} from '../data/state';
import WelcomeView from './welcome-view';
import startGame from '../game/game';


const welcome = new WelcomeView();
welcome.onStart = () => {

  startGame(getInitialGameState());
};

export default () => welcome;
