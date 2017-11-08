import assert from 'assert';

import GenreQuestion from './genre-question';


describe(`GenreQuestion`, () => {
  const genreQuestion = new GenreQuestion(
      `Выберите все кантри песни`,
      `folk`, [
        {
          src: `https://freemusicarchive.org/music/listen/4d69a4c1a629f88f509a43820c0491a0d6246b4e`,
          genre: `folk`
        },
        {
          src: `https://freemusicarchive.org/music/listen/61616e12e8cf26e61b2fe642d887b356385623d4`,
          genre: `country`
        },
        {
          src: `https://freemusicarchive.org/music/listen/d9e6e1ceb05e69df31933a3bc9446ab99aed7587`,
          genre: `folk`
        },
        {
          src: `https://freemusicarchive.org/music/listen/8c97beba0b5b66ba3d50afaf31d7f1d829e30d74`,
          genre: `electronic`
        }
      ]);

  it(`should accept right anser`, () => {
    assert(genreQuestion.checkAnswer([
      `https://freemusicarchive.org/music/listen/4d69a4c1a629f88f509a43820c0491a0d6246b4e`,
      `https://freemusicarchive.org/music/listen/d9e6e1ceb05e69df31933a3bc9446ab99aed7587`,
    ]));
  });

  it(`should not accept wrong answers`, () => {
    assert(!genreQuestion.checkAnswer([
      `https://freemusicarchive.org/music/listen/4d69a4c1a629f88f509a43820c0491a0d6246b4e`,
    ]));
    assert(!genreQuestion.checkAnswer([
      `https://freemusicarchive.org/music/listen/4d69a4c1a629f88f509a43820c0491a0d6246b4e`,
      `https://freemusicarchive.org/music/listen/8c97beba0b5b66ba3d50afaf31d7f1d829e30d74`,
    ]));
    assert(!genreQuestion.checkAnswer([
      `https://freemusicarchive.org/music/listen/61616e12e8cf26e61b2fe642d887b356385623d4`,
      `https://freemusicarchive.org/music/listen/8c97beba0b5b66ba3d50afaf31d7f1d829e30d74`,
    ]));
  });

  it(`should be loaded correctly`, () => {
    const data = {
      type: `artist`,
      question: `Выберите все кантри песни`,
      genre: `country`,
      answers: [
        {
          src: `https://freemusicarchive.org/music/listen/4d69a4c1a629f88f509a43820c0491a0d6246b4e`,
          genre: `folk`
        },
        {
          src: `https://freemusicarchive.org/music/listen/61616e12e8cf26e61b2fe642d887b356385623d4`,
          genre: `country`
        },
        {
          src: `https://freemusicarchive.org/music/listen/d9e6e1ceb05e69df31933a3bc9446ab99aed7587`,
          genre: `rock`
        },
        {
          src: `https://freemusicarchive.org/music/listen/8c97beba0b5b66ba3d50afaf31d7f1d829e30d74`,
          genre: `electronic`
        }
      ]
    };

    const genreQuestion2 = GenreQuestion.load(data);
    assert(genreQuestion2 instanceof GenreQuestion);
    assert.equal(genreQuestion2.question, `Выберите все кантри песни`);
    assert.equal(genreQuestion2.genre, `country`);
    assert.equal(
        genreQuestion2.answers[0].src,
        `https://freemusicarchive.org/music/listen/4d69a4c1a629f88f509a43820c0491a0d6246b4e`);
    assert.equal(genreQuestion2.answers[0].genre, `folk`);
  });
});
