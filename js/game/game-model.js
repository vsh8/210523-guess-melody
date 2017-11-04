import {getGameStatus} from '../data/state';


export default class GameModel {
  constructor(state) {
    this.state = state;
  }

  get currentQuestion() {
    return this.state.currentQuestion;
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
    return getGameStatus(this.state);
  }
}
