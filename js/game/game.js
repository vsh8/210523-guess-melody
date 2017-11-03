import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import getResultView from '../result/result';

import {showView} from '../util';

import {ArtistQuestion, QUESTIONS_NUMBER} from '../data/questions';
import {WRONG_ANSWERS_THRESHOLD} from '../data/state';


export const GameStatus = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  TIME_LIMIT: 2,
  WRONG_ANSWERS_LIMIT: 3
};

export const getGameStatus = (gameState) => {
  if (gameState.gameTimer.counter === 0) {
    return GameStatus.TIME_LIMIT;
  } else if (gameState.wrongAnswersNumber > WRONG_ANSWERS_THRESHOLD) {
    return GameStatus.WRONG_ANSWERS_LIMIT;
  } else if (gameState.answers.length >= QUESTIONS_NUMBER) {
    return GameStatus.SUCCESS;
  } else {
    return GameStatus.IN_PROGRESS;
  }
};


const changeView = (gameState) => {
  gameState.currentQuestionStartTime = gameState.gameTimer.counter;

  let currentView = null;

  let timer;
  const startTimer = () => {
    timer = setTimeout(() => {
      const timeout = !gameState.gameTimer.tick();
      if (timeout) {
        showView(getResultView(gameState));
      } else {
        currentView.updateTimer(gameState.gameTimer.counter);
        startTimer();
      }
    }, 1000);
  };
  startTimer();

  switch (getGameStatus(gameState)) {
    case GameStatus.IN_PROGRESS: {
      const currentQuestion = gameState.currentQuestion;
      if (currentQuestion instanceof ArtistQuestion) {
        currentView = new LevelArtistView(gameState);
      } else {
        currentView = new LevelGenreView(gameState);
      }

      currentView.onAnswer = function (answer) {
        clearTimeout(timer);
        gameState.addAnswer(
            gameState.currentQuestionStartTime - gameState.gameTimer.counter,
            currentQuestion.checkAnswer(answer));
        changeView(gameState);
      };

      break;
    }

    default:
      clearTimeout(timer);
      currentView = getResultView(gameState);
  }

  showView(currentView);
};

export default (initialGameState) => changeView(initialGameState);
