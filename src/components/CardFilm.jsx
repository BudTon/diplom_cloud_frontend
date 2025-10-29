import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectedIdFilms } from '../fetch/fetchSelectedIdFilms ';
import { useState } from 'react';
import { addToFavourites, removeFromFavourites } from '../redux/slices/favouriteSlice';
import './card-film.css'
import './card-selected-film.css'
import './favourite.css'
import flag from '../assets/flag.png'
import selectedFavourite from './selectedFavourite';

export default function CardFilm(card) {
  const dispatch = useDispatch();
  const { Poster, Title, Type, Year, imdbID } = card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const results = useSelector((state) => state.selected.results);
  const favourites = useSelector((state) => state.favourites.results);
  const { Director, Actors, imdbRating, Genre, Runtime } = results
  const [isFavorite, setIsFavorite] = useState(selectedFavourite(imdbID, favourites));

  const isInFavourites = favourites.some(film => film.imdbID === imdbID);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilmClick = () => {
    setIsModalOpen(true);
    dispatch(fetchSelectedIdFilms(imdbID));
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (isInFavourites) {
      dispatch(removeFromFavourites(imdbID));
    } else {
      dispatch(addToFavourites(card));
    }
  };

  return (
    <>
      <div className="movie-card" >
        <div className="movie-card-box" onClick={handleFilmClick}>
          <img src={Poster} alt={Title} className="movie-poster" />
          <div className="movie-details">
            <h2 className="movie-title">{Title}</h2>
            <p className="movie-type">Type - {Type}</p>
            <p className="movie-year">Year - {Year}</p>
          </div>

        </div>
        <button onClick={handleFavoriteClick} >
          <img className={`favorite-button ${isFavorite ? 'favorite' : ''}`} src={flag} alt={Title} />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>Закрыть</button>
            <img src={Poster} alt={Title} className="movie-poster" />
            <h2>Детали фильма</h2>
            <p>Название фильма: {Title}</p>
            <p>Год выпуска: {Year}</p>
            <p>Жанр: {Genre}</p>
            <p>Продолжительность: {Runtime}</p>
            <p>Режиссер: {Director}</p>
            <p>Актеры: {Actors}</p>
            <p>Рейтинг фильма: {imdbRating}</p>
          </div>
        </div>
      )}
    </>
  )
}