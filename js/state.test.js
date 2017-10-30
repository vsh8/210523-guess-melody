import assert from 'assert';

import {ArtistQuestion, GenreQuestion, getInitialGameState} from './state';


describe(`ArtistQuestion`, () => {
  const artistQuestion = new ArtistQuestion();

  it(`should create a valid artist question`, () => {
    assert(artistQuestion instanceof ArtistQuestion);

    assert(`questionSong` in artistQuestion);
    assert(`artists` in artistQuestion);

    assert(`artist` in artistQuestion.questionSong);
    assert(`name` in artistQuestion.questionSong);
    assert(`image` in artistQuestion.questionSong);
    assert(`src` in artistQuestion.questionSong);
    assert(`genre` in artistQuestion.questionSong);

    assert.equal(artistQuestion.artists.length, 3);
    for (const artist of artistQuestion.artists) {
      assert(`name` in artist);
      assert(`image` in artist);
    }
  });

  it(`#checkAnswer() should return true on a right answer`, () => {
    assert(artistQuestion.checkAnswer(artistQuestion.questionSong.artist));
  });
  it(`#checkAnswer() should return false on a wrong answer`, () => {
    for (const artist of artistQuestion.artists) {
      if (artist.name !== artistQuestion.questionSong.artist) {
        assert(!artistQuestion.checkAnswer(artist.name));
      }
    }
  });
});

describe(`GenreQuestion`, () => {
  const genreQuestion = new GenreQuestion([
    {
      artist: `Muse`,
      name: `Knights of Cydonia`,
      genre: `Rock`
    },
    {
      artist: `Pain of Salvation`,
      name: `Nightmist`,
      genre: `Metal`
    },
    {
      artist: `Camel`,
      name: `Curiosity`,
      genre: `Rock`
    },
    {
      artist: `Ayreon`,
      name: `Isis and Osiris`,
      genre: `Metal`
    },
  ], `Rock`);

  it(`should create a valid genre question`, () => {
    const genreQuestion2 = new GenreQuestion();

    assert(genreQuestion2 instanceof GenreQuestion);

    assert(`songs` in genreQuestion2);
    assert(`questionGenre` in genreQuestion2);

    assert.equal(genreQuestion2.songs.length, 4);
    for (const song of genreQuestion2.songs) {
      assert(`artist` in song);
      assert(`name` in song);
      assert(`image` in song);
      assert(`src` in song);
      assert(`genre` in song);
    }
  });

  it(`#checkAnswer() should return true on a right answer`, () => {
    assert(genreQuestion.checkAnswer([`Knights of Cydonia`, `Curiosity`]));
  });
  it(`#checkAnswer() should return false on a wrong answer`, () => {
    assert(!genreQuestion.checkAnswer([]));
    assert(!genreQuestion.checkAnswer([`Knights of Cydonia`]));
    assert(!genreQuestion.checkAnswer([`Knights of Cydonia`, `Nightmist`]));
    assert(!genreQuestion.checkAnswer([`Nightmist`, `Isis and Osiris`]));
    assert(!genreQuestion.checkAnswer([`Knights of Cydonia`, `Nightmist`, `Curiosity`, `Isis and Osiris`]));
  });
});

describe(`getInitialGameState`, () => {
  it(`should return a valid initial state`, () => {
    const gameState = getInitialGameState();

    assert(`questions` in gameState);
    assert(`time` in gameState);
    assert(`answerTimes` in gameState);
    assert(`wrongAnswersNumber` in gameState);

    assert.equal(gameState.questions.length, 10);
    for (const question of gameState.questions) {
      assert(question instanceof ArtistQuestion || question instanceof GenreQuestion);
    }

    assert.equal(gameState.time, 300);
    assert.equal(gameState.answerTimes.length, 0);
    assert.equal(gameState.wrongAnswersNumber, 0);
  });
});
