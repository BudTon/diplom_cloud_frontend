import { useSelector } from 'react-redux';
import CardFilm from './CardFilm';
import './card-film.css'
import './find-film.css'


export const FavouritesFilm = () => {

  const results = useSelector((state) => state.favourites.results);

  return (
    <>
      <div className="container-movie-card" >
        {
          results.map(film => (
            <CardFilm key={film.imdbID} {...film} />
          ))
        }
      </div>
    </>
  );
};