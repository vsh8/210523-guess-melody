import assert from 'assert';

import {ArtistQuestion, GenreQuestion, generateQuestions, QUESTIONS_NUMBER} from './questions';


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
  const genreQuestion = new GenreQuestion();
  genreQuestion.questionGenre = `Rock`;
  genreQuestion.songs = [
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
  ];

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

describe(`genereateQuestions`, () => {
  it(`should generate ${QUESTIONS_NUMBER} questions`, () => {
    const questions = generateQuestions();
    assert.equal(questions.length, QUESTIONS_NUMBER);
  });

  it(`should generate valid questions`, () => {
    const questions = generateQuestions();
    for (const question of questions) {
      assert(question instanceof ArtistQuestion || question instanceof GenreQuestion);
    }
  });
});
