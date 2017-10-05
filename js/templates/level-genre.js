// Игра на выбор жанра

import {getElementFromTemplate, showGameScreen} from '../utils';
import {chooseRandomItem} from '../rand';
import renderResultSuccessScreen from './result-success';
import renderResultFailureTimeoutScreen from './result-failure-timeout';
import renderResultFailureAttemptsLimitScreen from './result-failure-attempts-limit';

const levelGenreScreenTemplate = getElementFromTemplate(
    `<section class="main main--level main--level-genre">
       <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
         <circle
           cx="390" cy="390" r="370"
           class="timer-line"
           style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

         <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
           <span class="timer-value-mins">05</span><!--
           --><span class="timer-value-dots">:</span><!--
           --><span class="timer-value-secs">00</span>
         </div>
       </svg>
       <div class="main-mistakes">
         <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
         <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
         <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
       </div>

       <div class="main-wrap">
         <h2 class="title">Выберите инди-рок треки</h2>
         <form class="genre">
           <div class="genre-answer">
             <div class="player-wrapper">
               <div class="player">
                 <audio></audio>
                 <button class="player-control player-control--pause"></button>
                 <div class="player-track">
                   <span class="player-status"></span>
                 </div>
               </div>
             </div>
             <input class="genre-answer-cb" type="checkbox" name="answer" value="answer-1" id="a-1">
             <label class="genre-answer-check" for="a-1"></label>
           </div>

           <div class="genre-answer">
             <div class="player-wrapper">
               <div class="player">
                 <audio></audio>
                 <button class="player-control player-control--play"></button>
                 <div class="player-track">
                   <span class="player-status"></span>
                 </div>
               </div>
             </div>
             <input class="genre-answer-cb" type="checkbox" name="answer" value="answer-1" id="a-2">
             <label class="genre-answer-check" for="a-2"></label>
           </div>

           <div class="genre-answer">
             <div class="player-wrapper">
               <div class="player">
                 <audio></audio>
                 <button class="player-control player-control--play"></button>
                 <div class="player-track">
                   <span class="player-status"></span>
                 </div>
               </div>
             </div>
             <input class="genre-answer-cb" type="checkbox" name="answer" value="answer-1" id="a-3">
             <label class="genre-answer-check" for="a-3"></label>
           </div>

           <div class="genre-answer">
             <div class="player-wrapper">
               <div class="player">
                 <audio></audio>
                 <button class="player-control player-control--play"></button>
                 <div class="player-track">
                   <span class="player-status"></span>
                 </div>
               </div>
             </div>
             <input class="genre-answer-cb" type="checkbox" name="answer" value="answer-1" id="a-4">
             <label class="genre-answer-check" for="a-4"></label>
           </div>

           <button class="genre-answer-send" disbled="true" type="submit">Ответить</button>
         </form>
       </div>
     </section>`);

const nextScreenRenderers = [
  renderResultSuccessScreen,
  renderResultFailureTimeoutScreen,
  renderResultFailureAttemptsLimitScreen,
];

export default () => {
  const levelGenreScreen = levelGenreScreenTemplate.cloneNode(true);

  const genreFormElement = levelGenreScreen.querySelector(`.genre`);
  const genreAnswerSendButton = levelGenreScreen.querySelector(`.genre-answer-send`);

  genreFormElement.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`genre-answer-cb`)) {
      const selectedTrackCheckboxes = genreFormElement.querySelectorAll(`.genre-answer-cb:checked`);
      genreAnswerSendButton.disabled = selectedTrackCheckboxes.length === 0;
    }
  });

  genreAnswerSendButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    chooseRandomItem(nextScreenRenderers)();
  });

  showGameScreen(levelGenreScreen);
};
