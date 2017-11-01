import {changeView} from './util';
import {getInitialGameState} from './data/state';
import renderWelcomeScreen from './templates/welcome';


changeView(renderWelcomeScreen(getInitialGameState()));
