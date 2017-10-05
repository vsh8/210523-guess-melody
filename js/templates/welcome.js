// Приветствие

import {getElementFromTemplate, showGameScreen} from '../utils';
import renderLevelArtistScreen from './level-artist';

const welcomeScreenTemplate = getElementFromTemplate(
    `<section class="main main--welcome">
       <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
       <button class="main-play">Начать игру</button>
       <h2 class="title main-title">Правила игры</h2>
       <p class="text main-text">
         Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
         Ошибиться можно 3 раза.<br>
         Удачи!
       </p>
     </section>`);

export default () => {
  const welcomeScreen = welcomeScreenTemplate.cloneNode(true);

  welcomeScreen.querySelector(`.main-play`).addEventListener(`click`, () => {
    renderLevelArtistScreen();
  });

  showGameScreen(welcomeScreen);
};
