import assert from 'assert';

import ArtistQuestion from './artist-question';


describe(`ArtistQuestion`, () => {
  const artistQuestion = new ArtistQuestion(
      `Кто исполняет эту песню?`,
      `https://freemusicarchive.org/music/listen/e5910026a2dd875ce6b2cb0e7795a80af83293c9`, [
        {
          image: {
            url: `https://freemusicarchive.org/file/images/artists/Gillicuddy_-_20150103121851574.jpg?width=300&height=300`,
            width: 300,
            height: 300
          },
          title: `Gillicuddy`,
          isCorrect: false
        },
        {
          image: {
            url: `https://freemusicarchive.org/file/images/artists/Quantum_Jazz_-_20120509113401114.jpg?width=300&height=300`,
            width: 300,
            height: 300
          },
          title: `Quantum Jazz`,
          isCorrect: true
        },
        {
          image: {
            url: `https://freemusicarchive.org/file/images/artists/Stephan_Siebert_-_20160712113333691.jpg?width=300&height=300`,
            width: 300,
            height: 300
          },
          title: `Stephan Siebert`,
          isCorrect: false
        }
      ]);

  it(`should accept right anser`, () => {
    assert(artistQuestion.checkAnswer(`Quantum Jazz`));
  });

  it(`should not accept wrong answers`, () => {
    assert(!artistQuestion.checkAnswer(`Gillicuddy`));
    assert(!artistQuestion.checkAnswer(`Stephan Siebert`));
  });

  it(`should be loaded correctly`, () => {
    const data = {
      type: `artist`,
      question: `Кто исполняет эту песню?`,
      src: `https://freemusicarchive.org/music/listen/e5910026a2dd875ce6b2cb0e7795a80af83293c9`,
      answers: [
        {
          image: {
            url: `https://freemusicarchive.org/file/images/artists/Gillicuddy_-_20150103121851574.jpg?width=300&height=300`,
            width: 300,
            height: 300
          },
          title: `Gillicuddy`,
          isCorrect: false
        },
        {
          image: {
            url: `https://freemusicarchive.org/file/images/artists/Quantum_Jazz_-_20120509113401114.jpg?width=300&height=300`,
            width: 300,
            height: 300
          },
          title: `Quantum Jazz`,
          isCorrect: true
        },
        {
          image: {
            url: `https://freemusicarchive.org/file/images/artists/Stephan_Siebert_-_20160712113333691.jpg?width=300&height=300`,
            width: 300,
            height: 300
          },
          title: `Stephan Siebert`,
          isCorrect: false
        }
      ]
    };

    const artistQuestion2 = ArtistQuestion.load(data);
    assert(artistQuestion2 instanceof ArtistQuestion);
    assert.equal(artistQuestion2.question, `Кто исполняет эту песню?`);
    assert.equal(
        artistQuestion2.songSrc,
        `https://freemusicarchive.org/music/listen/e5910026a2dd875ce6b2cb0e7795a80af83293c9`);
    assert.equal(artistQuestion2.answers[0].title, `Gillicuddy`);
    assert.equal(artistQuestion2.answers[0].isCorrect, false);
    assert.equal(artistQuestion2.answers[1].title, `Quantum Jazz`);
    assert.equal(artistQuestion2.answers[1].isCorrect, true);
  });
});
