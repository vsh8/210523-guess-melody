import createTimer from '../timer';


export const WRONG_ANSWERS_THRESHOLD = 3;
export const TIME_LIMIT = 300;
export const FAST_ANSWER_THRESHOLD = 30;


export default class GameState {
  constructor(time, answers) {
    if (time || time === 0) {
      this.gameTimer = createTimer(time);
    } else {
      this.gameTimer = createTimer(TIME_LIMIT);
    }
    this.answers = answers || [];
  }

  get wrongAnswersNumber() {
    return this.answers.filter(({isRight}) => !isRight).length;
  }

  get fastAnswersNumber() {
    return this.answers.filter(({isRight, time}) => isRight && time < FAST_ANSWER_THRESHOLD).length;
  }

  get time() {
    return this.gameTimer.counter;
  }

  addAnswer(time, isRight) {
    this.answers.push({time, isRight});
  }

  dump() {
    return {
      'time': this.time,
      'answers': this.answers
    };
  }

  static load(data) {
    return new GameState(data.time, data.answers);
  }
}


export const getInitialGameState = () => {
  return new GameState();
};


export const GameStatus = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  TIME_LIMIT: 2,
  WRONG_ANSWERS_LIMIT: 3
};

export const getGameStatus = (gameState, questionsNumber) => {
  if (gameState.gameTimer.counter === 0) {
    return GameStatus.TIME_LIMIT;
  } else if (gameState.wrongAnswersNumber > WRONG_ANSWERS_THRESHOLD) {
    return GameStatus.WRONG_ANSWERS_LIMIT;
  } else if (gameState.answers.length >= questionsNumber) {
    return GameStatus.SUCCESS;
  }
  return GameStatus.IN_PROGRESS;
};
