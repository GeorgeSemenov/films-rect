//Инициирует поле isFavorite у фильмов
import fetchAllFavoriteFilms from "../API/fetchFavoriteFilms";
import { IFavoriteFilm, IFilm } from "../constants";

export default async function handleFavoriteFilms(
  unhandledFilms: IFilm[],
  accountId: number
) {
  const favoriteFilms: IFavoriteFilm[] = [];
  try {
    // favoriteFilms = await fetchAllFavoriteFilms(accountId);
  } catch (err) {
    console.error(`error in fetching favorite films`, err);
    throw err;
  }

  const filmsWithFavorites = unhandledFilms.map((film: IFilm) => {
    return {
      ...film,
      isFavorite: favoriteFilms.some((ff) => ff.id === film.id),
    };
  });

  return filmsWithFavorites;
}
