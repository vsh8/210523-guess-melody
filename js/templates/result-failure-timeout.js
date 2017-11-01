// Результат игры: проигрыш время вышло

import {getElementFromTemplate, changeView} from '../util';
import {getInitialGameState} from '../data/state';
import {getResultMessage} from '../results';
import renderWelcomeScreen from './welcome';


export default (gameState) => {
  const resultMessage = getResultMessage([], gameState);

  const resultFailureTimeoutScreen = getElementFromTemplate(
      `<section class="main main--result">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

         <h2 class="title">Увы и ах!</h2>
         <div class="main-stat">${resultMessage}</div>
         <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
       </section>`);


  resultFailureTimeoutScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
    changeView(renderWelcomeScreen(getInitialGameState()));
  });

  return resultFailureTimeoutScreen;
};
