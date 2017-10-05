// Результат игры: проигрыш время вышло

import {getElementFromTemplate, showGameScreen} from '../utils';
import renderWelcomeScreen from './welcome';

const resultFailureTimeoutScreenTemplate = getElementFromTemplate(
    `<section class="main main--result">
       <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

       <h2 class="title">Увы и ах!</h2>
       <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
       <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
     </section>`);

export default () => {
  const resultFailureTimeoutScreen = resultFailureTimeoutScreenTemplate.cloneNode(true);

  resultFailureTimeoutScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
    renderWelcomeScreen();
  });

  showGameScreen(resultFailureTimeoutScreen);
};
