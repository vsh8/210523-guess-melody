// Игра на выбор жанра

import {getElementFromTemplate, showGameScreen, getCurrentScreen} from '../utils';
import renderMistakes from './mistakes';


const renderAnswerCase = (song, idx) =>
  `<div class="genre-answer">
     <div class="player-wrapper">
       <div class="player">
         <audio src="${song.src}"></audio>
         <button class="player-control player-control--play"></button>
         <div class="player-track">
           <span class="player-status"></span>
         </div>
       </div>
     </div>
     <input class="genre-answer-cb" type="checkbox" name="answer" value="${song.name}" id="a-${idx}">
     <label class="genre-answer-check" for="a-${idx}"></label>
   </div>`;

export default (gameState) => {
  const currentQuestion = gameState.currentQuestion;

  const levelGenreScreen = getElementFromTemplate(
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
           ${renderMistakes(gameState)}
         </div>

         <div class="main-wrap">
           <h2 class="title">Выберите ${currentQuestion.questionGenre} треки</h2>
           <form class="genre">
             ${currentQuestion.songs.map((song, idx) => renderAnswerCase(song, idx))}

             <button class="genre-answer-send" disbled="true" type="submit">Ответить</button>
           </form>
         </div>
       </section>`);

  levelGenreScreen.querySelector(`.genre`).addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`player-control`)) {
      evt.preventDefault();
      const playerAudio = evt.target.parentElement.querySelector(`audio`);
      if (evt.target.classList.contains(`player-control--play`)) {
        evt.target.classList.remove(`player-control--play`);
        evt.target.classList.add(`player-control--pause`);
        playerAudio.play();
      } else {
        evt.target.classList.remove(`player-control--pause`);
        evt.target.classList.add(`player-control--play`);
        playerAudio.pause();
      }
    }
  });

  const mistakesElement = levelGenreScreen.querySelector(`.main-mistakes`);
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

    const selectedSongs = [];
    genreFormElement.querySelectorAll(`.genre-answer-cb:checked`).forEach(
        (checkboxElement) => selectedSongs.push(checkboxElement.value));

    if (currentQuestion.checkAnswer(selectedSongs)) {
      gameState.answerTimes.push(30);
      showGameScreen(getCurrentScreen(gameState)(gameState));
    } else {
      gameState.wrongAnswersNumber++;
      if (gameState.wrongAnswersNumber <= 3) {
        mistakesElement.innerHTML = renderMistakes(gameState);
      } else {
        showGameScreen(getCurrentScreen(gameState)(gameState));
      }
    }

  });

  return levelGenreScreen;
};
