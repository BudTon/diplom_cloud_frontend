import { useDispatch, useSelector } from 'react-redux';
import { findValue, clear } from '../redux/slices/fineFilmSlice';
import { fetchFilmsByTitle } from '../fetch/fetchFilmsByTitle ';
import CardFilm from './FileProperty';
import './card-film.css'
import './find-film.css'


export const FineFilm = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.find.value);
  const results = useSelector((state) => state.find.results);
  const loading = useSelector((state) => state.find.loading);
  const error = useSelector((state) => state.find.error);

  const handleFindClick = () => {
    dispatch(fetchFilmsByTitle(value));
  };

  const handleInputChange = (e) => {
    dispatch(findValue(e.target.value));
  };

  const handleClearClick = () => {
    dispatch(clear());
  };

  return (
    <>
      <div className="filter-box" >
        {/* <p className="filter">Filter</p>
        <input
          className="input-filter"
          type="text"
          placeholder="Enter film title..."
          value={value}
          onChange={handleInputChange}
        />
        <button className="find-button" onClick={handleFindClick}>
          Find
        </button>
        <button className="clear-button" onClick={handleClearClick}>
          Clear
        </button> */}
      </div>

      <div className="container-movie-card" >
        {/* {loading && <p>Загружаю...</p>}
        {results.length > 0 &&
          results.map(film => (
            <CardFilm key={film.imdbID} {...film} />
          ))
        }
        {error && <p>{error}</p>} */}
      </div>
    </>
  );
};
