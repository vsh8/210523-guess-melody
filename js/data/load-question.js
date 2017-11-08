import ArtistQuestion from './artist-question';
import GenreQuestion from './genre-question';


const loadQuestion = (data) => {
  return (data.type === `artist` ? ArtistQuestion : GenreQuestion).load(data);
};

export default loadQuestion;
