export default class ArtistQuestion {
  constructor(question, songSrc, answers) {
    this.question = question;
    this.songSrc = songSrc;
    this.answers = answers;
  }

  get correctAnswer() {
    const correctAnswer = this.answers.find((answer) => answer.isCorrect);
    return correctAnswer.title;
  }

  checkAnswer(artistName) {
    return artistName === this.correctAnswer;
  }

  static load(data) {
    return new ArtistQuestion(data.question, data.src, data.answers);
  }
}
