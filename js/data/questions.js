import songList from './music';
import {chooseRandomItem, chooseRandomItems} from '../rand';


const ARTIST_QUESTION_SONGS_NUMBER = 3;
const GENRE_QUESTION_SONGS_NUMBER = 4;

export const QUESTIONS_NUMBER = 10;

export class ArtistQuestion {
  constructor(questionSong, artists) {
    if (questionSong && artists) {
      this.questionSong = questionSong;
      this.artists = artists;
    } else {
      // Obtain unique artists from the song list.
      const artistsMap = {};
      for (const song of songList) {
        if (!(song.artist in artistsMap)) {
          artistsMap[song.artist] = {name: song.artist, image: song.image};
        }
      }
      artists = chooseRandomItems(
          Object.keys(artistsMap).map((artist) => artistsMap[artist]), ARTIST_QUESTION_SONGS_NUMBER);

      // Choose an artist for question.
      const questionArtist = chooseRandomItem(artists);

      // Find the song of the chosen artist.
      questionSong = null;
      for (const song of songList) {
        if (song.artist === questionArtist.name) {
          questionSong = song;
          break;
        }
      }

      this.questionSong = questionSong;
      this.artists = artists;
    }
  }

  checkAnswer(artistName) {
    return artistName === this.questionSong.artist;
  }

  dump() {
    let questionSongIndex = songList.findIndex((song) => this.questionSong === song);
    let artistIndices = this.artists.map((artist) => songList.findIndex((song) => artist.name === song.artist));

    return {
      t: `a`,
      qs: questionSongIndex,
      as: artistIndices
    };
  }

  static load(data) {
    const questionSong = songList[data.qs];
    const artists = data.as.map((artistIndex) => {
      const song = songList[artistIndex];
      return {name: song.artist, image: song.image};
    });
    return new ArtistQuestion(questionSong, artists);
  }
}

export class GenreQuestion {
  constructor(songs, questionGenre) {
    this.songs = songs || chooseRandomItems(songList, GENRE_QUESTION_SONGS_NUMBER);
    this.questionGenre = questionGenre || chooseRandomItem(this.songs).genre;
  }

  checkAnswer(songNames) {
    let isRightAnswer = true;

    for (let song of this.songs) {
      if (songNames.includes(song.name)) {
        isRightAnswer = isRightAnswer && this.questionGenre === song.genre;
      } else {
        isRightAnswer = isRightAnswer && this.questionGenre !== song.genre;
      }
    }

    return isRightAnswer;
  }

  dump() {
    let songIndices = this.songs.map((song1) => songList.findIndex((song2) => song1 === song2));

    return {
      t: `g`,
      ss: songIndices,
      g: this.questionGenre
    };
  }

  static load(data) {
    let songs = data.ss.map((songIndex) => songList[songIndex]);
    return new GenreQuestion(songs, data.g);
  }
}


export const generateQuestions = () => {
  const questionConstructors = [ArtistQuestion, GenreQuestion];

  const questions = [];
  for (let i = 0; i < QUESTIONS_NUMBER; i++) {
    const QuestionConstructor = chooseRandomItem(questionConstructors);
    questions.push(new QuestionConstructor());
  }

  return questions;
};
