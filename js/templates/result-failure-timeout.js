// Результат игры: проигрыш время вышло

import {getElementFromTemplate} from '../util';

import showGameScreen from '../show-game-screen';
import welcomeScreen from './welcome';

const resultFailureTimeoutScreen = getElementFromTemplate(
    `<section class="main main--result">
       <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

       <h2 class="title">Увы и ах!</h2>
       <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
       <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
     </section>`);

resultFailureTimeoutScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
  showGameScreen(welcomeScreen);
});

export default resultFailureTimeoutScreen;
