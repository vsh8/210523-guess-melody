import {getGameStatus} from '../data/game-state';


export default class GameModel {
  constructor(questions, state) {
    this.questions = questions;
    this.state = state;
  }

  get currentQuestion() {
    return this.questions[this.state.answers.length];
  }

  get questionsNumber() {
    return this.questions.length;
  }

  get wrongAnswersNumber() {
    return this.state.wrongAnswersNumber;
  }

  get fastAnswersNumber() {
    return this.state.fastAnswersNumber;
  }

  get time() {
    return this.state.time;
  }

  tick() {
    return this.state.gameTimer.tick();
  }

  addAnswer(time, isRight) {
    this.state.addAnswer(time, isRight);
  }

  get questionTime() {
    return this.questionStartTime - this.time;
  }

  resetQuestionStartTime() {
    this.questionStartTime = this.time;
  }

  get gameStatus() {
    return getGameStatus(this.state, this.questions.length);
  }
}
