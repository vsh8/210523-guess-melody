import {showGameScreen} from './utils';
import {getInitialGameState} from './state';
import renderWelcomeScreen from './templates/welcome';


showGameScreen(renderWelcomeScreen(getInitialGameState()));
