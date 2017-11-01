// Игра на выбор жанра

import {getElementFromTemplate, changeView, getCurrentView} from '../util';
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

         ${renderMistakes(gameState)}

         <div class="main-wrap">
           <h2 class="title">Выберите ${currentQuestion.questionGenre} треки</h2>
           <form class="genre">
             ${currentQuestion.songs.map((song, idx) => renderAnswerCase(song, idx))}

             <button class="genre-answer-send" disbled="true" type="submit">Ответить</button>
           </form>
         </div>
       </section>`);

  const pauseAudio = (playerElement) => {
    const playerAudio = playerElement.querySelector(`audio`);
    const playerButton = playerElement.querySelector(`button`);

    playerButton.classList.remove(`player-control--pause`);
    playerButton.classList.add(`player-control--play`);
    playerAudio.pause();
  };

  const playAudio = (playerElement) => {
    const playerAudio = playerElement.querySelector(`audio`);
    const playerButton = playerElement.querySelector(`button`);

    playerButton.classList.remove(`player-control--play`);
    playerButton.classList.add(`player-control--pause`);
    playerAudio.play();
  };

  levelGenreScreen.querySelector(`.genre`).addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`player-control`)) {
      evt.preventDefault();

      const playerAudio = evt.target.parentElement;
      if (evt.target.classList.contains(`player-control--play`)) {
        const playingAudioButton = levelGenreScreen.querySelector(`.player-control--pause`);
        if (playingAudioButton) {
          const playingPlayerElement = playingAudioButton.parentElement;
          pauseAudio(playingPlayerElement);
        }

        playAudio(playerAudio);
      } else {
        pauseAudio(playerAudio);
      }
    }
  });

  const genreForm = levelGenreScreen.querySelector(`.genre`);
  const genreAnswerSendButton = levelGenreScreen.querySelector(`.genre-answer-send`);

  genreForm.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`genre-answer-cb`)) {
      const selectedTrackCheckboxes = genreForm.querySelectorAll(`.genre-answer-cb:checked`);
      genreAnswerSendButton.disabled = selectedTrackCheckboxes.length === 0;
    }
  });

  genreAnswerSendButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const selectedSongs = [];
    genreForm.querySelectorAll(`.genre-answer-cb:checked`).forEach(
        (checkboxElement) => selectedSongs.push(checkboxElement.value));

    gameState.addAnswer(30, currentQuestion.checkAnswer(selectedSongs));
    changeView(getCurrentView(gameState)(gameState));
  });

  return levelGenreScreen;
};
