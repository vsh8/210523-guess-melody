import {ArtistQuestion, GenreQuestion, QUESTIONS_NUMBER, WRONG_ANSWERS_THRESHOLD} from './state';
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

export const showGameScreen = (screen) => {
  screenContainerElement.innerHTML = ``;
  screenContainerElement.appendChild(screen);
};


export const getCurrentScreen = (gameState) => {
  const currentQuestion = gameState.currentQuestion;

  if (gameState.answerTimes.length === QUESTIONS_NUMBER) {
    return renderResultSuccessScreen;
  } else if (gameState.time === 0) {
    return renderResultFailureTimeoutScreen;
  } else if (gameState.wrongAnswersNumber > WRONG_ANSWERS_THRESHOLD) {
    return renderResultFailureAttemptsLimitScreen;
  } else if (currentQuestion instanceof ArtistQuestion) {
    return renderArtistLevelScreen;
  } else if (currentQuestion instanceof GenreQuestion) {
    return renderGenreLevelScreen;
  }

  return null;
};
