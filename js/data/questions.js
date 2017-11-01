import songList from './music';
import {chooseRandomItem, chooseRandomItems} from '../rand';


const ARTIST_QUESTION_SONGS_NUMBER = 3;
const GENRE_QUESTION_SONGS_NUMBER = 4;

export const QUESTIONS_NUMBER = 10;

export const ArtistQuestion = function () {
  // Obtain unique artists from the song list.
  const artistsMap = {};
  for (const song of songList) {
    if (!(song.artist in artistsMap)) {
      artistsMap[song.artist] = {name: song.artist, image: song.image};
    }
  }
  const artists = chooseRandomItems(
      Object.keys(artistsMap).map((artist) => artistsMap[artist]), ARTIST_QUESTION_SONGS_NUMBER);

  // Choose an artist for question.
  const questionArtist = chooseRandomItem(artists);

  // Find the song of the chosen artist.
  let questionSong = null;
  for (const song of songList) {
    if (song.artist === questionArtist.name) {
      questionSong = song;
      break;
    }
  }

  this.questionSong = questionSong;
  this.artists = artists;

  this.checkAnswer = function (artistName) {
    return artistName === this.questionSong.artist;
  };
};

export const GenreQuestion = function () {
  this.songs = chooseRandomItems(songList, GENRE_QUESTION_SONGS_NUMBER);
  this.questionGenre = chooseRandomItem(this.songs).genre;

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


export const generateQuestions = () => {
  const questionConstructors = [ArtistQuestion, GenreQuestion];

  const questions = [];
  for (let i = 0; i < QUESTIONS_NUMBER; i++) {
    const QuestionConstructor = chooseRandomItem(questionConstructors);
    questions.push(new QuestionConstructor());
  }

  return questions;
};
