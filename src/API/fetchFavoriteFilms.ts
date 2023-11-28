import { IFavoriteFilm, urlBase } from "../constants";
import fetchData from "./fetchData";

export async function fetchFavoriteFilmsResponse(accountId: number, page = 1) {
  try {
    const favoriteFilmsResponse = await fetchData({
      url: `${urlBase}/3/account/${accountId}/favorite/movies?page=${page}`,
    });
    return favoriteFilmsResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default async function fetchAllFavoriteFilms(
  accountId: number
): Promise<IFavoriteFilm[]> {
  let pageOfFavoriteFilms = 1;
  let favoriteFilmsResponse;
  let allFavoriteFilms: IFavoriteFilm[] = [];
  do {
    favoriteFilmsResponse = await fetchFavoriteFilmsResponse(accountId);
    pageOfFavoriteFilms++;
    allFavoriteFilms = allFavoriteFilms.concat(
      favoriteFilmsResponse.results as IFavoriteFilm[]
    );
  } while (pageOfFavoriteFilms <= favoriteFilmsResponse.total_pages);
  return allFavoriteFilms;
}
