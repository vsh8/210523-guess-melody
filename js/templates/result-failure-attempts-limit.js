// Результат игры: проигрыш закончились попытки

import {getElementFromTemplate, showGameScreen} from '../utils';
import renderWelcomeScreen from './welcome';

const resultFailureAttemptsLimitScreenTemplate = getElementFromTemplate(
    `<section class="main main--result">
       <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

       <h2 class="title">Какая жалость!</h2>
       <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
       <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
     </section>`);

export default () => {
  const resultFailureAttemptsLimitScreen = resultFailureAttemptsLimitScreenTemplate.cloneNode(true);

  resultFailureAttemptsLimitScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
    renderWelcomeScreen();
  });

  showGameScreen(resultFailureAttemptsLimitScreen);
};
