import { urlBase } from "../constants";
import { IFavoriteFilm } from "../slices/favoriteFilms/types";
import fetchData from "./fetchData";
import { IFetchedFilmsResponse } from "./films/types";
import { IUser } from "./user/types";

export async function fetchFavoriteFilmsResponse(accountId: number, page = 1) {
  const favoriteFilmsResponse: IFetchedFilmsResponse = await fetchData({
    url: `${urlBase}/3/account/${accountId}/favorite/movies?page=${page}`,
  });
  return favoriteFilmsResponse;
}

export default async function fetchAllFavoriteFilms(
  user: IUser
): Promise<{ favoriteFilms?: IFavoriteFilm[]; error?: Error }> {
  let pageOfFavoriteFilms = 1;
  let favoriteFilmsResponse;
  let allFavoriteFilms: IFavoriteFilm[] = [];
  do {
    favoriteFilmsResponse = await fetchFavoriteFilmsResponse(
      user.id,
      pageOfFavoriteFilms
    );
    pageOfFavoriteFilms++;
    allFavoriteFilms = allFavoriteFilms.concat(
      favoriteFilmsResponse.results as IFavoriteFilm[]
    );
  } while (pageOfFavoriteFilms <= favoriteFilmsResponse.total_pages);
  return { favoriteFilms: allFavoriteFilms };
}
