import {generateQuestions} from './questions';
import createTimer from '../timer';


export const WRONG_ANSWERS_THRESHOLD = 3;
export const TIME_LIMIT = 300;

export const getInitialGameState = () => {
  return {
    questions: generateQuestions(),
    gameTimer: createTimer(TIME_LIMIT),
    answers: [],

    get currentQuestion() {
      const questionNumber = this.answers.length;
      return questionNumber < this.questions.length ? this.questions[questionNumber] : null;
    },

    get wrongAnswersNumber() {
      return this.answers.filter((answer) => !answer.isRight).length;
    },

    addAnswer(time, isRight) {
      this.answers.push({time, isRight});
    }
  };
};
