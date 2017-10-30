// Результат игры: выигрыш

import {getElementFromTemplate, showGameScreen} from '../utils';
import {getInitialGameState} from '../state';
import {calculateResultPoints, getResultMessage} from '../results';
import renderWelcomeScreen from './welcome';


export default (gameState) => {
  const resultPoints = calculateResultPoints(gameState.answerTimes, gameState.wrongAnswersNumber);
  const resultMessage = getResultMessage([], {
    resultPoints,
    wrongAnswersNumber: gameState.wrongAnswersNumber,
    timeRemainig: gameState.time
  });

  const resultSuccessScreen = getElementFromTemplate(
      `<section class="main main--result">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

         <h2 class="title">Вы настоящий меломан!</h2>
         <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
         <br>вы&nbsp;набрали ${resultPoints} баллов (0 быстрых)
         <br>совершив ${gameState.wrongAnswersNumber} ошибки</div>
         <span class="main-comparison">${resultMessage}</span>
         <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
       </section>`);

  resultSuccessScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
    showGameScreen(renderWelcomeScreen(getInitialGameState()));
  });

  return resultSuccessScreen;
};
