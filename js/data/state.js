import {ArtistQuestion, GenreQuestion, generateQuestions, QUESTIONS_NUMBER} from './questions';
import createTimer from '../timer';


export const WRONG_ANSWERS_THRESHOLD = 3;
export const TIME_LIMIT = 300;
export const FAST_ANSWER_THRESHOLD = 30;


export class GameState {
  constructor(questions, time, answers) {
    this.questions = questions || generateQuestions();
    this.gameTimer = createTimer(time || TIME_LIMIT);
    this.answers = answers || [];
  }

  get currentQuestion() {
    const questionNumber = this.answers.length;
    return questionNumber < this.questions.length ? this.questions[questionNumber] : null;
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
    const questions = this.questions.map((question) => question.dump());
    return {
      'qs': questions,
      't': this.time,
      'as': this.answers
    };
  }

  static load(data) {
    const questions = data.qs.map(
        (questionData) => (questionData.t === `a` ? ArtistQuestion : GenreQuestion).load(questionData));
    return new GameState(questions, data.t, data.as);
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
