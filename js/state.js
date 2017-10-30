import songList from './music';
import {chooseRandomItem, chooseRandomItems} from './rand';


const ARTIST_QUESTION_SONGS_NUMBER = 3;
const GENRE_QUESTION_SONGS_NUMBER = 4;
export const QUESTIONS_NUMBER = 10;
export const WRONG_ANSWERS_THRESHOLD = 3;


export const ArtistQuestion = function (songs = null, questionSong = null) {
  songs = songs || chooseRandomItems(songList, ARTIST_QUESTION_SONGS_NUMBER);

  this.questionSong = questionSong || chooseRandomItem(songs);
  this.artists = songs.map((song) => ({name: song.artist, image: song.image}));

  this.checkAnswer = function (artistName) {
    return artistName === this.questionSong.artist;
  };
};

export const GenreQuestion = function (songs = null, questionGenre = null) {
  this.songs = songs || chooseRandomItems(songList, GENRE_QUESTION_SONGS_NUMBER);
  this.questionGenre = questionGenre || chooseRandomItem(this.songs).genre;

  this.checkAnswer = function (songNames) {
    let isRightAnswer = true;

    for (let song of this.songs) {
      if (songNames.includes(song.name)) {
        isRightAnswer = isRightAnswer && this.questionGenre === song.genre;
      } else {
        isRightAnswer = isRightAnswer && this.questionGenre !== song.genre;
      }
    }

    return isRightAnswer;
  };
};


const generateQuestions = () => {
  const questionConstructors = [ArtistQuestion, GenreQuestion];

  const questions = [];
  for (let i = 0; i < QUESTIONS_NUMBER; i++) {
    const QuestionConstructor = chooseRandomItem(questionConstructors);
    questions.push(new QuestionConstructor());
  }

  return questions;
};


export const getInitialGameState = () => {
  return {
    questions: generateQuestions(),
    time: 300,
    answerTimes: [],
    wrongAnswersNumber: 0,

    get currentQuestion() {
      const questionNumber = this.answerTimes.length;
      return questionNumber < this.questions.length ? this.questions[questionNumber] : null;
    }
  };
};
