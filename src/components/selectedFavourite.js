export default function selectedFavourite(idFavouriteFilm, FavouriteCardList) {
  return FavouriteCardList.some(film => {
    if (idFavouriteFilm === film.imdbID) {
      return true;
    }
  });
}