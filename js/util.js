import {ArtistQuestion} from './data/questions';
import {GameResult, getGameResult} from './results';

import renderArtistLevelScreen from './templates/level-artist';
import renderGenreLevelScreen from './templates/level-genre';
import renderResultSuccessScreen from './templates/result-success';
import renderResultFailureTimeoutScreen from './templates/result-failure-timeout';
import renderResultFailureAttemptsLimitScreen from './templates/result-failure-attempts-limit';

export const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper.firstChild;
};


const screenContainerElement = document.querySelector(`.app > .main`);

export const changeView = (screen) => {
  screenContainerElement.innerHTML = ``;
  screenContainerElement.appendChild(screen);
};


export const getCurrentView = (gameState) => {
  switch (getGameResult(gameState)) {
    case GameResult.IN_PROGRESS: {
      const currentQuestion = gameState.currentQuestion;
      if (currentQuestion instanceof ArtistQuestion) {
        return renderArtistLevelScreen;
      } else {
        return renderGenreLevelScreen;
      }
    }
    case GameResult.SUCCESS:
      return renderResultSuccessScreen;
    case GameResult.TIME_LIMIT:
      return renderResultFailureTimeoutScreen;
    case GameResult.WRONG_ANSWERS_LIMIT:
      return renderResultFailureAttemptsLimitScreen;
  }

  return null;
};
