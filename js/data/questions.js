export class ArtistQuestion {
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

export class GenreQuestion {
  constructor(question, genre, answers) {
    this.question = question;
    this.genre = genre;
    this.answers = answers;
  }

  checkAnswer(songSrcs) {
    let isCorrect = true;

    for (let song of this.answers) {
      if (songSrcs.includes(song.src)) {
        isCorrect = isCorrect && this.genre === song.genre;
      } else {
        isCorrect = isCorrect && this.genre !== song.genre;
      }
    }

    return isCorrect;
  }

  static load(data) {
    return new GenreQuestion(data.question, data.genre, data.answers);
  }
}

export const loadQuestion = (data) => {
  return (data.type === `artist` ? ArtistQuestion : GenreQuestion).load(data);
};
