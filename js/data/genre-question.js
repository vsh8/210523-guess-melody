export default class GenreQuestion {
  constructor(question, genre, answers) {
    this.question = question;
    this.genre = genre;
    this.answers = answers;
  }

  checkAnswer(userAnswerSongs) {
    for (let song of this.answers) {
      if (userAnswerSongs.includes(song.src) && this.genre !== song.genre
          || !userAnswerSongs.includes(song.src) && this.genre === song.genre) {
        return false;
      }
    }

    return true;
  }

  static load(data) {
    return new GenreQuestion(data.question, data.genre, data.answers);
  }
}
